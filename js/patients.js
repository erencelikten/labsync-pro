/* ═══════════════════════════════════════════════════
   LabSync Pro — Patient Management Module
   ═══════════════════════════════════════════════════ */

function openPatientModal(editId = null) {
    document.getElementById('patientForm').reset();
    document.getElementById('patientEditId').value = '';

    if (editId) {
        const p = DB.patients.find(x => x.id === editId);
        if (!p) return;
        document.getElementById('patientModalTitle').textContent = 'Hasta Düzenle';
        document.getElementById('patientEditId').value = p.id;
        document.getElementById('patientFirstName').value = p.firstName;
        document.getElementById('patientLastName').value = p.lastName;
        document.getElementById('patientTC').value = p.tc;
        document.getElementById('patientBirthDate').value = p.birthDate || '';
        document.getElementById('patientGender').value = p.gender;
        document.getElementById('patientPhone').value = p.phone || '';
        document.getElementById('patientEmail').value = p.email || '';
        document.getElementById('patientBloodType').value = p.bloodType || '';
        document.getElementById('patientNotes').value = p.notes || '';
    } else {
        document.getElementById('patientModalTitle').textContent = 'Yeni Hasta';
    }

    openModal('patientModal');
}

function savePatient() {
    const firstName = document.getElementById('patientFirstName').value.trim();
    const lastName = document.getElementById('patientLastName').value.trim();
    const tc = document.getElementById('patientTC').value.trim();
    const gender = document.getElementById('patientGender').value;

    if (!firstName || !lastName || !tc || !gender) {
        showToast('Lütfen zorunlu alanları doldurun', 'error');
        return;
    }

    if (tc.length !== 11 || isNaN(tc)) {
        showToast('TC Kimlik No 11 haneli olmalıdır', 'error');
        return;
    }

    const editId = document.getElementById('patientEditId').value;

    if (editId) {
        // Update existing
        const idx = DB.patients.findIndex(x => x.id === editId);
        if (idx >= 0) {
            DB.patients[idx] = {
                ...DB.patients[idx],
                firstName,
                lastName,
                tc,
                birthDate: document.getElementById('patientBirthDate').value,
                gender,
                phone: document.getElementById('patientPhone').value.trim(),
                email: document.getElementById('patientEmail').value.trim(),
                bloodType: document.getElementById('patientBloodType').value,
                notes: document.getElementById('patientNotes').value.trim(),
                updatedAt: new Date().toISOString(),
            };
            addActivity(`${firstName} ${lastName} bilgileri güncellendi`, 'fas fa-user-edit', 'info');
            showToast('Hasta bilgileri güncellendi', 'success');
        }
    } else {
        // Check TC duplicate
        if (DB.patients.some(p => p.tc === tc)) {
            showToast('Bu TC Kimlik No ile zaten kayıtlı hasta var', 'error');
            return;
        }

        const newPatient = {
            id: generateId('P'),
            firstName,
            lastName,
            tc,
            birthDate: document.getElementById('patientBirthDate').value,
            gender,
            phone: document.getElementById('patientPhone').value.trim(),
            email: document.getElementById('patientEmail').value.trim(),
            bloodType: document.getElementById('patientBloodType').value,
            notes: document.getElementById('patientNotes').value.trim(),
            createdAt: new Date().toISOString(),
        };

        DB.patients.push(newPatient);
        addActivity(`Yeni hasta: ${firstName} ${lastName} (${newPatient.id})`, 'fas fa-user-plus', 'success');
        showToast(`${firstName} ${lastName} başarıyla kaydedildi`, 'success');
    }

    saveDB();
    closeModal('patientModal');
    refreshPatientsTable();
    populatePatientSelects();
    refreshDashboard();
}

function deletePatient(id) {
    const p = DB.patients.find(x => x.id === id);
    if (!p) return;
    if (!confirm(`${p.firstName} ${p.lastName} hastasını silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz.`)) return;

    DB.patients = DB.patients.filter(x => x.id !== id);
    // Also remove related tests
    DB.semenTests = DB.semenTests.filter(x => x.patientId !== id);
    DB.ivfRecords = DB.ivfRecords.filter(x => x.patientId !== id);
    DB.labTests = DB.labTests.filter(x => x.patientId !== id);
    DB.dnaTests = DB.dnaTests.filter(x => x.patientId !== id);

    addActivity(`Hasta silindi: ${p.firstName} ${p.lastName}`, 'fas fa-user-minus', 'warning');
    saveDB();
    if (window.deleteFromSupabase) window.deleteFromSupabase('patients', id);

    refreshPatientsTable();
    populatePatientSelects();
    refreshDashboard();
    showToast('Hasta kaydı silindi', 'warning');
}

function refreshPatientsTable() {
    const tbody = document.getElementById('patientsTableBody');
    if (DB.patients.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-user-slash"></i><h3>Henüz hasta kaydı yok</h3><p>Yeni hasta eklemek için "Yeni Hasta" butonunu kullanın</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = DB.patients.map(p => {
        const testCount = getPatientTestCount(p.id);
        return `<tr>
            <td><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent);">${p.id}</span></td>
            <td><strong>${p.firstName} ${p.lastName}</strong></td>
            <td style="font-family:'JetBrains Mono',monospace;font-size:12px;">${p.tc}</td>
            <td>${formatDate(p.birthDate)}</td>
            <td><span class="badge ${p.gender === 'Erkek' ? 'badge-info' : 'badge-neutral'}">${p.gender}</span></td>
            <td>${p.phone || '-'}</td>
            <td>${formatDate(p.createdAt)}</td>
            <td><span class="badge badge-neutral">${testCount} test</span></td>
            <td class="action-cell">
                <button class="btn btn-ghost btn-icon" onclick="showPatientDetail('${p.id}')" title="Detay"><i class="fas fa-eye"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="generatePatientQRById('${p.id}')" title="QR Kod"><i class="fas fa-qrcode"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="openPatientModal('${p.id}')" title="Düzenle"><i class="fas fa-edit"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="deletePatient('${p.id}')" title="Sil" style="color:var(--danger)"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>`;
    }).join('');
}

function getPatientTestCount(patientId) {
    let count = 0;
    count += DB.semenTests.filter(t => t.patientId === patientId).length;
    count += DB.ivfRecords.filter(t => t.patientId === patientId).length;
    count += DB.labTests.filter(t => t.patientId === patientId).length;
    count += DB.dnaTests.filter(t => t.patientId === patientId).length;
    return count;
}

function filterPatients() {
    const query = (document.getElementById('patientSearchInput').value || '').trim().toLowerCase();
    const gender = document.getElementById('patientGenderFilter').value;

    const filtered = DB.patients.filter(p => {
        const matchSearch = !query ||
            p.firstName.toLowerCase().includes(query) ||
            p.lastName.toLowerCase().includes(query) ||
            p.tc.includes(query) ||
            p.id.toLowerCase().includes(query);
        const matchGender = !gender || p.gender === gender;
        return matchSearch && matchGender;
    });

    const tbody = document.getElementById('patientsTableBody');
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-search"></i><h3>Sonuç bulunamadı</h3></div></td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => {
        const testCount = getPatientTestCount(p.id);
        return `<tr>
            <td><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent);">${p.id}</span></td>
            <td><strong>${p.firstName} ${p.lastName}</strong></td>
            <td style="font-family:'JetBrains Mono',monospace;font-size:12px;">${p.tc}</td>
            <td>${formatDate(p.birthDate)}</td>
            <td><span class="badge ${p.gender === 'Erkek' ? 'badge-info' : 'badge-neutral'}">${p.gender}</span></td>
            <td>${p.phone || '-'}</td>
            <td>${formatDate(p.createdAt)}</td>
            <td><span class="badge badge-neutral">${testCount} test</span></td>
            <td class="action-cell">
                <button class="btn btn-ghost btn-icon" onclick="showPatientDetail('${p.id}')" title="Detay"><i class="fas fa-eye"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="generatePatientQRById('${p.id}')" title="QR Kod"><i class="fas fa-qrcode"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="openPatientModal('${p.id}')" title="Düzenle"><i class="fas fa-edit"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="deletePatient('${p.id}')" title="Sil" style="color:var(--danger)"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>`;
    }).join('');
}

function showPatientDetail(patientId) {
    const p = DB.patients.find(x => x.id === patientId);
    if (!p) return;

    document.getElementById('detailPatientName').textContent = `${p.firstName} ${p.lastName}`;

    const semenTests = DB.semenTests.filter(t => t.patientId === patientId);
    const ivfRecords = DB.ivfRecords.filter(t => t.patientId === patientId);
    const labTests = DB.labTests.filter(t => t.patientId === patientId);
    const dnaTests = DB.dnaTests.filter(t => t.patientId === patientId);

    const age = p.birthDate ? (Math.floor((new Date() - new Date(p.birthDate)) / (365.25 * 86400000))) : '-';

    document.getElementById('patientDetailContent').innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
            <div class="stat-card" style="padding:16px;">
                <div class="stat-info">
                    <div class="stat-label">Hasta ID</div>
                    <div style="font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--accent);font-weight:700;">${p.id}</div>
                </div>
            </div>
            <div class="stat-card" style="padding:16px;">
                <div class="stat-info">
                    <div class="stat-label">Yaş</div>
                    <div style="font-size:18px;font-weight:700;color:var(--text-white);">${age}</div>
                </div>
            </div>
            <div class="stat-card" style="padding:16px;">
                <div class="stat-info">
                    <div class="stat-label">Toplam Test</div>
                    <div style="font-size:18px;font-weight:700;color:var(--text-white);">${semenTests.length + ivfRecords.length + labTests.length + dnaTests.length}</div>
                </div>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
            <div><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">TC Kimlik</span><br><span style="font-family:'JetBrains Mono',monospace;">${p.tc}</span></div>
            <div><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">Cinsiyet</span><br>${p.gender}</div>
            <div><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">Doğum Tarihi</span><br>${formatDate(p.birthDate)}</div>
            <div><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">Kan Grubu</span><br>${p.bloodType || '-'}</div>
            <div><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">Telefon</span><br>${p.phone || '-'}</div>
            <div><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;">E-posta</span><br>${p.email || '-'}</div>
        </div>

        ${p.notes ? `<div style="padding:12px;background:var(--bg-input);border-radius:var(--radius-sm);margin-bottom:24px;"><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Notlar:</span><br><span style="font-size:13px;">${p.notes}</span></div>` : ''}

        <div class="section-divider"><span>Test Geçmişi</span></div>

        ${semenTests.length > 0 ? `
            <h4 style="color:var(--accent);margin:12px 0 8px;font-size:13px;"><i class="fas fa-vial"></i> Semen Analizleri (${semenTests.length})</h4>
            ${semenTests.map(t => `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-input);border-radius:6px;margin-bottom:6px;font-size:13px;">
                <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);font-size:11px;">${t.id}</span>
                <span>${formatDate(t.date)}</span>
                <span class="result-indicator ${t.result === 'Normozoospermi' ? 'result-normal' : 'result-abnormal'}" style="font-size:10px;padding:3px 8px;">${t.result}</span>
                <button class="btn btn-ghost btn-sm" onclick="closeModal('patientDetailModal');showSemenDetail('${t.id}')"><i class="fas fa-eye"></i></button>
            </div>`).join('')}
        ` : ''}

        ${ivfRecords.length > 0 ? `
            <h4 style="color:#AB47BC;margin:12px 0 8px;font-size:13px;"><i class="fas fa-baby"></i> IVF Siklusları (${ivfRecords.length})</h4>
            ${ivfRecords.map(t => `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-input);border-radius:6px;margin-bottom:6px;font-size:13px;">
                <span style="font-family:'JetBrains Mono',monospace;color:#AB47BC;font-size:11px;">${t.id}</span>
                <span>${formatDate(t.startDate)}</span>
                <span class="badge badge-info">${t.status}</span>
            </div>`).join('')}
        ` : ''}

        ${labTests.length > 0 ? `
            <h4 style="color:#2196F3;margin:12px 0 8px;font-size:13px;"><i class="fas fa-flask"></i> Lab Testleri (${labTests.length})</h4>
            ${labTests.map(t => `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-input);border-radius:6px;margin-bottom:6px;font-size:13px;">
                <span style="font-family:'JetBrains Mono',monospace;color:#2196F3;font-size:11px;">${t.id}</span>
                <span>${t.testType}</span>
                <span>${formatDate(t.date)}</span>
            </div>`).join('')}
        ` : ''}

        ${(semenTests.length + ivfRecords.length + labTests.length + dnaTests.length) === 0 ?
            '<div class="empty-state" style="padding:30px;"><i class="fas fa-clipboard-list"></i><h3>Henüz test kaydı yok</h3></div>' : ''}
    `;

    openModal('patientDetailModal');
}

function generatePatientQRById(patientId) {
    switchModule('qrscanner');
    setTimeout(() => {
        document.getElementById('qrPatientSelect').value = patientId;
        generatePatientQR();
    }, 300);
}
