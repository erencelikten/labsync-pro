/* ═══════════════════════════════════════════════════
   LabSync Pro — Core Application Module
   ═══════════════════════════════════════════════════ */

// ─── Data Store ───
const DB = {
    patients: JSON.parse(localStorage.getItem('labsync_patients') || '[]'),
    semenTests: JSON.parse(localStorage.getItem('labsync_semen') || '[]'),
    ivfRecords: JSON.parse(localStorage.getItem('labsync_ivf') || '[]'),
    labTests: JSON.parse(localStorage.getItem('labsync_labtests') || '[]'),
    dnaTests: JSON.parse(localStorage.getItem('labsync_dnatests') || '[]'),
    activities: JSON.parse(localStorage.getItem('labsync_activities') || '[]'),
};

function saveDB() {
    localStorage.setItem('labsync_patients', JSON.stringify(DB.patients));
    localStorage.setItem('labsync_semen', JSON.stringify(DB.semenTests));
    localStorage.setItem('labsync_ivf', JSON.stringify(DB.ivfRecords));
    localStorage.setItem('labsync_labtests', JSON.stringify(DB.labTests));
    localStorage.setItem('labsync_dnatests', JSON.stringify(DB.dnaTests));
    localStorage.setItem('labsync_activities', JSON.stringify(DB.activities));

    // Trigger Supabase Sync
    if (window.syncToSupabase) {
        window.syncToSupabase();
    }
}

function addActivity(text, icon = 'fas fa-circle', type = 'info') {
    DB.activities.unshift({
        text,
        icon,
        type,
        time: new Date().toISOString()
    });
    if (DB.activities.length > 50) DB.activities = DB.activities.slice(0, 50);
    saveDB();
}

// ─── ID Generators ───
function generateId(prefix) {
    const year = new Date().getFullYear();
    const count = (() => {
        switch (prefix) {
            case 'P': return DB.patients.length + 1;
            case 'SA': return DB.semenTests.length + 1;
            case 'IVF': return DB.ivfRecords.length + 1;
            case 'LT': return DB.labTests.length + 1;
            case 'DNA': return DB.dnaTests.length + 1;
            default: return Math.floor(Math.random() * 9999);
        }
    })();
    return `${prefix}-${year}-${String(count).padStart(3, '0')}`;
}

// ─── Module Navigation ───
function switchModule(moduleName) {
    // Hide all sections
    document.querySelectorAll('.module-section').forEach(s => {
        s.classList.remove('active');
    });
    // Show target
    const target = document.getElementById(`module-${moduleName}`);
    if (target) {
        target.classList.add('active');
        // Re-trigger animation
        target.style.animation = 'none';
        target.offsetHeight; // reflow
        target.style.animation = '';
    }

    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll(`.nav-item[data-module="${moduleName}"]`).forEach(n => n.classList.add('active'));

    // Update header
    const titles = {
        dashboard: ['Dashboard', 'Genel Bakış'],
        patients: ['Hastalar', 'Hasta Yönetimi'],
        semen: ['Semen Analizi', 'Sperm Testi'],
        ivf: ['IVF / Embriyoloji', 'Tüp Bebek'],
        labtests: ['Genel Lab Testleri', 'Laboratuvar'],
        dnatests: ['DNA / Genetik Testler', 'Genetik Analiz'],
        reports: ['Raporlar', 'Rapor Oluşturma'],
        qrscanner: ['QR Tarayıcı', 'QR Kod İşlemleri'],
    };

    const t = titles[moduleName] || ['', ''];
    document.getElementById('pageTitle').textContent = t[0];
    document.getElementById('pageBreadcrumb').textContent = t[1];

    // Refresh module data
    if (moduleName === 'dashboard') refreshDashboard();
    if (moduleName === 'patients') refreshPatientsTable();
    if (moduleName === 'semen') { populatePatientSelects(); refreshSemenTable(); }
    if (moduleName === 'ivf') { populatePatientSelects(); refreshIVFTable(); }
    if (moduleName === 'labtests') { populatePatientSelects(); refreshLabTestsTable(); }
    if (moduleName === 'dnatests') { populatePatientSelects(); refreshDNATestsTable(); }
    if (moduleName === 'reports') populatePatientSelects();
    if (moduleName === 'qrscanner') populatePatientSelects();
}

// ─── Modal Helpers ───
function openModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ─── Toast Notifications ───
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="${icons[type] || icons.info}"></i></div>
        <div class="toast-message">${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ─── Populate Patient Selects ───
function populatePatientSelects() {
    const selects = [
        'semenPatient', 'ivfPatient', 'labTestPatient', 'dnaTestPatient',
        'semenPatientFilter', 'ivfPatientFilter', 'labPatientFilter', 'dnaPatientFilter',
        'reportPatientSelect', 'qrPatientSelect'
    ];

    selects.forEach(selectId => {
        const el = document.getElementById(selectId);
        if (!el) return;
        const currentVal = el.value;
        // Keep first option
        const firstOpt = el.options[0];
        el.innerHTML = '';
        el.appendChild(firstOpt);
        // Add patients
        DB.patients.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.firstName} ${p.lastName} (${p.id})`;
            el.appendChild(opt);
        });
        if (currentVal) el.value = currentVal;
    });
}

// ─── Patient Name Helper ───
function getPatientName(patientId) {
    const p = DB.patients.find(x => x.id === patientId);
    return p ? `${p.firstName} ${p.lastName}` : 'Bilinmiyor';
}

function getPatient(patientId) {
    return DB.patients.find(x => x.id === patientId);
}

// ─── Date Formatting ───
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateTime(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// ─── Dashboard ───
function refreshDashboard() {
    const totalPatients = DB.patients.length;
    let totalTests = DB.semenTests.length + DB.ivfRecords.length + DB.labTests.length + (DB.dnaTests ? DB.dnaTests.length : 0);

    document.getElementById('dashTotalPatients').textContent = totalPatients;
    document.getElementById('dashSemenCount').textContent = DB.semenTests.length;
    document.getElementById('dashIVFCount').textContent = DB.ivfRecords.length;
    document.getElementById('dashLabCount').textContent = DB.labTests.length;
    if (document.getElementById('dashDNACount')) {
        document.getElementById('dashDNACount').textContent = DB.dnaTests.length;
    }
    
    // New Hero Stats
    if (document.getElementById('dashHeroPatients')) {
        document.getElementById('dashHeroPatients').textContent = totalPatients;
    }
    if (document.getElementById('dashHeroTests')) {
        document.getElementById('dashHeroTests').textContent = totalTests;
    }
    
    // Status Widget
    if (document.getElementById('statusPending')) {
        document.getElementById('statusPending').textContent = Math.floor(Math.random() * 10) + 2; // Demo Data
    }
    if (document.getElementById('statusApproved')) {
        document.getElementById('statusApproved').textContent = Math.floor(Math.random() * 50) + 10; // Demo Data
    }

    document.getElementById('patientCount').textContent = totalPatients;

    renderRecentActivities();
    renderTestDistChart();
    renderMonthlyTrendChart();
}

function renderRecentActivities() {
    const container = document.getElementById('recentActivities');
    if (DB.activities.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>Henüz aktivite yok</h3>
                <p>Test ve hasta kayıtları burada görünecek</p>
            </div>`;
        return;
    }

    const recent = DB.activities.slice(0, 6); // Limit to 6 for timeline
    container.innerHTML = recent.map(a => {
        return `
        <div class="timeline-item ${a.type}">
            <div class="timeline-content">
                <div class="timeline-time"><i class="far fa-clock"></i> ${formatDateTime(a.time)}</div>
                <div class="timeline-text"><i class="${a.icon}" style="margin-right: 6px; color: var(--${a.type});"></i>${a.text}</div>
            </div>
        </div>
        `;
    }).join('');
}

let testDistChartInstance = null;
let monthlyTrendChartInstance = null;

function renderTestDistChart() {
    const ctx = document.getElementById('testDistChart');
    if (!ctx) return;

    if (testDistChartInstance) testDistChartInstance.destroy();

    testDistChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Semen Analizi', 'IVF', 'Lab Testleri', 'DNA / Genetik'],
            datasets: [{
                data: [
                    DB.semenTests.length || 0,
                    DB.ivfRecords.length || 0,
                    DB.labTests.length || 0,
                    DB.dnaTests.length || 0,
                ],
                backgroundColor: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'],
                borderWidth: 0,
                borderRadius: 4,
                spacing: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94A3B8',
                        usePointStyle: true,
                        padding: 20,
                        font: { family: 'Inter', size: 12 }
                    }
                }
            }
        }
    });
}

function renderMonthlyTrendChart() {
    const ctx = document.getElementById('monthlyTrendChart');
    if (!ctx) return;

    if (monthlyTrendChartInstance) monthlyTrendChartInstance.destroy();

    const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const currentYear = new Date().getFullYear();

    // Count tests per month
    const semenByMonth = new Array(12).fill(0);
    const labByMonth = new Array(12).fill(0);

    DB.semenTests.forEach(t => {
        const d = new Date(t.date);
        if (d.getFullYear() === currentYear) semenByMonth[d.getMonth()]++;
    });
    DB.labTests.forEach(t => {
        const d = new Date(t.date);
        if (d.getFullYear() === currentYear) labByMonth[d.getMonth()]++;
    });

    monthlyTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Semen Analizi',
                    data: semenByMonth,
                    borderColor: 'rgba(255,255,255,0.8)',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(255,255,255,0.8)',
                },
                {
                    label: 'Lab Testleri',
                    data: labByMonth,
                    borderColor: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(255,255,255,0.5)',
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { color: 'rgba(99, 102, 241, 0.08)' },
                    ticks: { color: '#94A3B8', font: { family: 'Inter', size: 11 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(99, 102, 241, 0.08)' },
                    ticks: { color: '#94A3B8', font: { family: 'Inter', size: 11 }, stepSize: 1 }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#94A3B8',
                        usePointStyle: true,
                        font: { family: 'Inter', size: 12 }
                    }
                }
            }
        }
    });
}

// ─── Global Search ───
function globalSearchHandler(event) {
    const query = event.target.value.trim().toLowerCase();
    if (query.length < 2) return;

    const results = DB.patients.filter(p =>
        p.firstName.toLowerCase().includes(query) ||
        p.lastName.toLowerCase().includes(query) ||
        p.tc.includes(query) ||
        p.id.toLowerCase().includes(query)
    );

    if (results.length === 1) {
        switchModule('patients');
        setTimeout(() => showPatientDetail(results[0].id), 300);
    } else if (results.length > 0) {
        switchModule('patients');
        document.getElementById('patientSearchInput').value = query;
        filterPatients();
    }
}

// ─── Sidebar Toggle (Mobile) ───
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ─── Export All Data ───
function exportAllData() {
    const data = {
        patients: DB.patients,
        semenTests: DB.semenTests,
        ivfRecords: DB.ivfRecords,
        labTests: DB.labTests,
        dnaTests: DB.dnaTests,
        exportDate: new Date().toISOString(),
        version: '1.1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `labsync_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Veriler başarıyla dışa aktarıldı', 'success');
}

// ─── Date Display ───
function updateHeaderDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('headerDate').textContent = now.toLocaleDateString('tr-TR', options);
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', async () => {
    // Try to load from Supabase if available
    if (window.loadFromSupabase) {
        document.getElementById('pageTitle').textContent = 'Veriler Senkronize Ediliyor...';
        const cloudDB = await window.loadFromSupabase();
        if (cloudDB) {
            // Auto-migration: if cloud is empty but local has data, upload local to cloud!
            if (cloudDB.patients.length === 0 && DB.patients.length > 0) {
                console.log('Bulut veritabanı boş, yerel veriler buluta aktarılıyor (Migration)...');
                await window.syncToSupabase();
            } else {
                // Otherwise override local memory with cloud truth
                Object.assign(DB, cloudDB);
            }
        }
    }

    updateHeaderDate();
    refreshDashboard();
    populatePatientSelects();

    // Set default date for forms
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(el => {
        if (!el.value) el.value = today;
    });

    // IVF fertilization rate auto-calc
    const ivfMature = document.getElementById('ivfMatureOocyte');
    const ivfFert = document.getElementById('ivfFertilized');
    if (ivfMature && ivfFert) {
        const calcRate = () => {
            const m = parseFloat(ivfMature.value) || 0;
            const f = parseFloat(ivfFert.value) || 0;
            const rateEl = document.getElementById('ivfFertRate');
            if (m > 0) {
                rateEl.value = Math.round((f / m) * 100);
            }
        };
        ivfMature.addEventListener('input', calcRate);
        ivfFert.addEventListener('input', calcRate);
    }

    // Auto-calc total motility
    const progMot = document.getElementById('semenProgMotility');
    const nonProgMot = document.getElementById('semenNonProgMotility');
    if (progMot && nonProgMot) {
        const calcTotalMot = () => {
            const p = parseFloat(progMot.value) || 0;
            const np = parseFloat(nonProgMot.value) || 0;
            document.getElementById('semenTotalMotility').value = p + np;
            document.getElementById('semenImmotile').value = Math.max(0, 100 - p - np);
        };
        progMot.addEventListener('input', calcTotalMot);
        nonProgMot.addEventListener('input', calcTotalMot);
    }

    // Auto-calc total sperm count
    const volEl = document.getElementById('semenVolume');
    const concEl = document.getElementById('semenConcentration');
    if (volEl && concEl) {
        const calcTotal = () => {
            const v = parseFloat(volEl.value) || 0;
            const c = parseFloat(concEl.value) || 0;
            document.getElementById('semenTotalCount').value = (v * c).toFixed(1);
        };
        volEl.addEventListener('input', calcTotal);
        concEl.addEventListener('input', calcTotal);
    }

    // ─── Header Auto-Hide on Scroll ───
    const pageContent = document.querySelector('.page-content');
    const topHeader = document.querySelector('.top-header');
    if (pageContent && topHeader) {
        let lastScrollTop = 0;
        pageContent.addEventListener('scroll', () => {
            const st = pageContent.scrollTop;
            if (st > 60) {
                topHeader.classList.add('header-hidden');
            } else {
                topHeader.classList.remove('header-hidden');
            }
            lastScrollTop = st;
        }, { passive: true });
    }

    console.log('LabSync Pro initialized.');
});
