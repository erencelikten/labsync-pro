/* ═══════════════════════════════════════════════════
   LabSync Pro v2.0 — Core Application Module
   Sci-Fi Edition with Particles & Gauge Rendering
   ═══════════════════════════════════════════════════ */

// ─── SEED DATA (runs once) ───
if (!localStorage.getItem('labsync_seeded')) {
    const _p = [
        { id:'P-240301', firstName:'Ahmet', lastName:'Yilmaz', tc:'10234567890', birthDate:'1988-05-14', gender:'Erkek', phone:'+90 532 111 2233', email:'ahmet.yilmaz@email.com', bloodType:'A Rh+', notes:'Oligozoospermi takibi', createdAt:'2026-03-01T09:00:00Z' },
        { id:'P-240302', firstName:'Mehmet', lastName:'Kaya', tc:'20345678901', birthDate:'1992-11-22', gender:'Erkek', phone:'+90 535 222 3344', email:'mehmet.kaya@email.com', bloodType:'O Rh+', notes:'IVF adayi', createdAt:'2026-03-02T10:30:00Z' },
        { id:'P-240303', firstName:'Fatma', lastName:'Demir', tc:'30456789012', birthDate:'1995-03-08', gender:'Kadin', phone:'+90 541 333 4455', email:'fatma.demir@email.com', bloodType:'B Rh+', notes:'IVF siklusu, AMH dusuk', createdAt:'2026-03-03T08:15:00Z' },
        { id:'P-240304', firstName:'Ali', lastName:'Ozturk', tc:'40567890123', birthDate:'1985-07-30', gender:'Erkek', phone:'+90 544 444 5566', email:'ali.ozturk@email.com', bloodType:'AB Rh-', notes:'Azoospermi suphesi', createdAt:'2026-03-05T11:00:00Z' },
        { id:'P-240305', firstName:'Zeynep', lastName:'Arslan', tc:'50678901234', birthDate:'1990-12-17', gender:'Kadin', phone:'+90 546 555 6677', email:'zeynep.arslan@email.com', bloodType:'A Rh-', notes:'Trombofili paneli', createdAt:'2026-03-06T14:20:00Z' },
        { id:'P-240306', firstName:'Mustafa', lastName:'Celik', tc:'60789012345', birthDate:'1983-09-05', gender:'Erkek', phone:'+90 533 666 7788', email:'mustafa.celik@email.com', bloodType:'O Rh-', notes:'Normozoospermi kontrol', createdAt:'2026-03-08T09:45:00Z' },
        { id:'P-240307', firstName:'Elif', lastName:'Sahin', tc:'70890123456', birthDate:'1993-01-25', gender:'Kadin', phone:'+90 542 777 8899', email:'elif.sahin@email.com', bloodType:'B Rh-', notes:'PGT-A planlaniyor', createdAt:'2026-03-10T13:00:00Z' }
    ];
    const _s = [
        { id:'SA-240301', patientId:'P-240301', date:'2026-03-05', abstinence:'4', collectionMethod:'Masturbasyon', volume:'2.8', color:'Gri-opak', liquefaction:'25', viscosity:'Normal', pH:'7.4', concentration:'8', totalCount:'22', progressiveMotility:'28', nonProgressiveMotility:'12', immotile:'60', totalMotility:'40', morphology:'3', vitality:'52', roundCells:'0.5', wbc:'0.3', notes:'Oligozoospermi', result:'Oligozoospermi', createdAt:'2026-03-05T10:00:00Z' },
        { id:'SA-240302', patientId:'P-240302', date:'2026-03-08', abstinence:'3', collectionMethod:'Masturbasyon', volume:'3.2', color:'Gri-opak', liquefaction:'20', viscosity:'Normal', pH:'7.6', concentration:'45', totalCount:'144', progressiveMotility:'42', nonProgressiveMotility:'15', immotile:'43', totalMotility:'57', morphology:'6', vitality:'68', roundCells:'0.2', wbc:'0.1', notes:'Normal degerler', result:'Normozoospermi', createdAt:'2026-03-08T11:00:00Z' },
        { id:'SA-240303', patientId:'P-240304', date:'2026-03-10', abstinence:'5', collectionMethod:'Masturbasyon', volume:'1.2', color:'Gri-opak', liquefaction:'30', viscosity:'Artmis', pH:'7.8', concentration:'0', totalCount:'0', progressiveMotility:'0', nonProgressiveMotility:'0', immotile:'0', totalMotility:'0', morphology:'0', vitality:'0', roundCells:'0.8', wbc:'0.5', notes:'Azoospermi', result:'Azoospermi', createdAt:'2026-03-10T09:30:00Z' },
        { id:'SA-240304', patientId:'P-240306', date:'2026-03-12', abstinence:'3', collectionMethod:'Masturbasyon', volume:'3.5', color:'Gri-opak', liquefaction:'18', viscosity:'Normal', pH:'7.5', concentration:'62', totalCount:'217', progressiveMotility:'55', nonProgressiveMotility:'10', immotile:'35', totalMotility:'65', morphology:'8', vitality:'78', roundCells:'0.1', wbc:'0.2', notes:'Tum parametreler normal', result:'Normozoospermi', createdAt:'2026-03-12T10:15:00Z' },
        { id:'SA-240305', patientId:'P-240301', date:'2026-03-20', abstinence:'4', collectionMethod:'Masturbasyon', volume:'2.5', color:'Gri-opak', liquefaction:'22', viscosity:'Normal', pH:'7.3', concentration:'12', totalCount:'30', progressiveMotility:'25', nonProgressiveMotility:'10', immotile:'65', totalMotility:'35', morphology:'2', vitality:'48', roundCells:'0.6', wbc:'0.4', notes:'OAT - ICSI onerisi', result:'OAT', createdAt:'2026-03-20T10:00:00Z' }
    ];
    const _i = [
        { id:'IVF-240301', patientId:'P-240303', startDate:'2026-03-10', protocol:'Antagonist', method:'ICSI', oocyteCount:'12', matureOocyte:'9', fertilized:'7', fertRate:'78', day3Count:'6', day3Grade:'Grade A/B', blastCount:'4', blastGrade:'4AA, 4AB, 3BB, 3BC', transferDate:'2026-03-15', transferDay:'Day 5', transferCount:'2', frozenCount:'2', status:'Transfer Yapildi', notes:'Iyi kalite embriyo', createdAt:'2026-03-10T08:00:00Z' },
        { id:'IVF-240302', patientId:'P-240307', startDate:'2026-03-15', protocol:'Agonist (Uzun)', method:'ICSI', oocyteCount:'18', matureOocyte:'14', fertilized:'11', fertRate:'79', day3Count:'10', day3Grade:'Grade A', blastCount:'7', blastGrade:'5AA, 4AA, 4AB, 4AB, 3BB, 3BB, 3BC', transferDate:'', transferDay:'', transferCount:'0', frozenCount:'7', status:'Freeze All', notes:'PGT-A icin donduruldu', createdAt:'2026-03-15T08:00:00Z' }
    ];
    const _l = [
        { id:'LT-240301', patientId:'P-240303', date:'2026-03-04', testType:'Hormon', status:'Sonuclandi', parameters:[
            {name:'FSH',value:'9.2',unit:'mIU/mL',refMin:1.5,refMax:12.4,flag:'Normal',type:'quantitative'},
            {name:'LH',value:'6.8',unit:'mIU/mL',refMin:1.7,refMax:8.6,flag:'Normal',type:'quantitative'},
            {name:'Estradiol',value:'42',unit:'pg/mL',refMin:12,refMax:166,flag:'Normal',type:'quantitative'},
            {name:'AMH',value:'0.8',unit:'ng/mL',refMin:1.0,refMax:10.0,flag:'Dusuk',type:'quantitative'},
            {name:'TSH',value:'2.1',unit:'uIU/mL',refMin:0.27,refMax:4.2,flag:'Normal',type:'quantitative'},
            {name:'Prolaktin',value:'14.5',unit:'ng/mL',refMin:4.0,refMax:23.0,flag:'Normal',type:'quantitative'}
        ], flagCount:1, parameterCount:6, createdAt:'2026-03-04T09:00:00Z' },
        { id:'LT-240302', patientId:'P-240302', date:'2026-03-06', testType:'Bulasici', status:'Sonuclandi', parameters:[
            {name:'HBsAg',value:'Negatif',unit:'',flag:'Normal',type:'qualitative'},
            {name:'Anti-HBs',value:'125',unit:'mIU/mL',refMin:10,flag:'Normal',type:'quantitative'},
            {name:'Anti-HCV',value:'Negatif',unit:'',flag:'Normal',type:'qualitative'},
            {name:'HIV 1/2',value:'Negatif',unit:'',flag:'Normal',type:'qualitative'},
            {name:'VDRL',value:'Non-reaktif',unit:'',flag:'Normal',type:'qualitative'},
            {name:'CMV IgG',value:'Pozitif',unit:'',flag:'Normal',type:'qualitative'},
            {name:'CMV IgM',value:'Negatif',unit:'',flag:'Normal',type:'qualitative'},
            {name:'Rubella IgG',value:'Pozitif',unit:'',flag:'Normal',type:'qualitative'},
            {name:'Toxo IgG',value:'Negatif',unit:'',flag:'Normal',type:'qualitative'},
            {name:'Toxo IgM',value:'Negatif',unit:'',flag:'Normal',type:'qualitative'}
        ], flagCount:0, parameterCount:10, createdAt:'2026-03-06T10:00:00Z' },
        { id:'LT-240303', patientId:'P-240305', date:'2026-03-08', testType:'Hemogram', status:'Sonuclandi', parameters:[
            {name:'WBC',value:'7.2',unit:'10^3/uL',refMin:4.5,refMax:11.0,flag:'Normal',type:'quantitative'},
            {name:'RBC',value:'4.1',unit:'10^6/uL',refMin:4.5,refMax:5.5,flag:'Dusuk',type:'quantitative'},
            {name:'Hemoglobin',value:'11.2',unit:'g/dL',refMin:12.0,refMax:17.5,flag:'Dusuk',type:'quantitative'},
            {name:'Hematokrit',value:'34',unit:'%',refMin:36,refMax:50,flag:'Dusuk',type:'quantitative'},
            {name:'MCV',value:'82',unit:'fL',refMin:80,refMax:100,flag:'Normal',type:'quantitative'},
            {name:'Trombosit',value:'285',unit:'10^3/uL',refMin:150,refMax:400,flag:'Normal',type:'quantitative'}
        ], flagCount:3, parameterCount:6, createdAt:'2026-03-08T11:00:00Z' },
        { id:'LT-240304', patientId:'P-240301', date:'2026-03-07', testType:'Hormon', status:'Sonuclandi', parameters:[
            {name:'FSH',value:'5.8',unit:'mIU/mL',refMin:1.5,refMax:12.4,flag:'Normal',type:'quantitative'},
            {name:'LH',value:'4.2',unit:'mIU/mL',refMin:1.7,refMax:8.6,flag:'Normal',type:'quantitative'},
            {name:'TSH',value:'3.1',unit:'uIU/mL',refMin:0.27,refMax:4.2,flag:'Normal',type:'quantitative'},
            {name:'Testosteron',value:'320',unit:'ng/dL',refMin:264,refMax:916,flag:'Normal',type:'quantitative'},
            {name:'Prolaktin',value:'18.2',unit:'ng/mL',refMin:4.0,refMax:23.0,flag:'Normal',type:'quantitative'}
        ], flagCount:0, parameterCount:5, createdAt:'2026-03-07T09:30:00Z' }
    ];
    const _d = [
        { id:'DNA-240301', patientId:'P-240304', date:'2026-03-12', testType:'Karyotip', testLabel:'Karyotip Analizi', lab:'Gentest Lab', sampleType:'Kan (EDTA)', parameters:[
            {name:'Karyotip',value:'47,XXY',unit:'',type:'text',flag:'Anormal'},
            {name:'Sayisal Anomali',value:'Var',unit:'',type:'qualitative',flag:'Anormal'},
            {name:'Yapisal Anomali',value:'Yok',unit:'',type:'qualitative',flag:'Normal'},
            {name:'Mozaiklik',value:'Yok',unit:'',type:'qualitative',flag:'Normal'},
            {name:'Hucre Sayisi',value:'30',unit:'hucre',type:'number',flag:'Normal'}
        ], abnormalCount:2, parameterCount:5, overallResult:'Anormal Bulgu', notes:'Klinefelter Sendromu (47,XXY)', createdAt:'2026-03-12T14:00:00Z' },
        { id:'DNA-240302', patientId:'P-240305', date:'2026-03-14', testType:'Trombofili Paneli', testLabel:'Trombofili Genetik Panel', lab:'Gentest Lab', sampleType:'Kan (EDTA)', parameters:[
            {name:'Faktor V Leiden',value:'Heterozigot (GA)',unit:'',type:'qualitative',flag:'Anormal'},
            {name:'Protrombin G20210A',value:'Normal (GG)',unit:'',type:'qualitative',flag:'Normal'},
            {name:'MTHFR C677T',value:'Homozigot (TT)',unit:'',type:'qualitative',flag:'Anormal'},
            {name:'MTHFR A1298C',value:'Normal (AA)',unit:'',type:'qualitative',flag:'Normal'},
            {name:'PAI-1 4G/5G',value:'Heterozigot (4G/5G)',unit:'',type:'qualitative',flag:'Anormal'},
            {name:'Risk',value:'Yuksek Risk',unit:'',type:'qualitative',flag:'Anormal'}
        ], abnormalCount:4, parameterCount:6, overallResult:'Anormal Bulgu', notes:'Yuksek trombofili riski', createdAt:'2026-03-14T15:00:00Z' },
        { id:'DNA-240303', patientId:'P-240307', date:'2026-03-20', testType:'PGT-A', testLabel:'PGT-A Tarama', lab:'Igenomix', sampleType:'Embriyo Biyopsisi', parameters:[
            {name:'Embriyo',value:'E1-E7',unit:'',type:'text',flag:'Normal'},
            {name:'Biyopsi Gunu',value:'Day 5',unit:'',type:'qualitative',flag:'Normal'},
            {name:'Sonuc',value:'4 oploidi, 2 anoploidi, 1 mozaik',unit:'',type:'text',flag:'Anormal'},
            {name:'Platform',value:'NGS',unit:'',type:'qualitative',flag:'Normal'}
        ], abnormalCount:1, parameterCount:4, overallResult:'Anormal Bulgu', notes:'4/7 oploidi. E1(5AA) ve E2(4AA) transfer icin uygun.', createdAt:'2026-03-20T16:00:00Z' }
    ];
    const _a = [
        {text:'Yeni hasta: Ahmet Yilmaz',icon:'fas fa-user-plus',type:'success',time:'2026-03-01T09:00:00Z'},
        {text:'Yeni hasta: Mehmet Kaya',icon:'fas fa-user-plus',type:'success',time:'2026-03-02T10:30:00Z'},
        {text:'Yeni hasta: Fatma Demir',icon:'fas fa-user-plus',type:'success',time:'2026-03-03T08:15:00Z'},
        {text:'Hormon paneli: Fatma Demir - AMH dusuk',icon:'fas fa-flask',type:'warning',time:'2026-03-04T09:00:00Z'},
        {text:'Semen: Ahmet Yilmaz - Oligozoospermi',icon:'fas fa-vial',type:'warning',time:'2026-03-05T10:00:00Z'},
        {text:'Yeni hasta: Ali Ozturk',icon:'fas fa-user-plus',type:'success',time:'2026-03-05T11:00:00Z'},
        {text:'Lab: Mehmet Kaya - Bulasici (Normal)',icon:'fas fa-flask',type:'success',time:'2026-03-06T10:00:00Z'},
        {text:'Yeni hasta: Zeynep Arslan',icon:'fas fa-user-plus',type:'success',time:'2026-03-06T14:20:00Z'},
        {text:'Hormon: Ahmet Yilmaz - Normal',icon:'fas fa-flask',type:'success',time:'2026-03-07T09:30:00Z'},
        {text:'Semen: Mehmet Kaya - Normozoospermi',icon:'fas fa-vial',type:'success',time:'2026-03-08T11:00:00Z'},
        {text:'Yeni hasta: Mustafa Celik',icon:'fas fa-user-plus',type:'success',time:'2026-03-08T09:45:00Z'},
        {text:'Hemogram: Zeynep Arslan - 3 anormal',icon:'fas fa-flask',type:'warning',time:'2026-03-08T11:00:00Z'},
        {text:'IVF: Fatma Demir - ICSI basladi',icon:'fas fa-baby',type:'success',time:'2026-03-10T08:00:00Z'},
        {text:'Semen: Ali Ozturk - Azoospermi',icon:'fas fa-vial',type:'warning',time:'2026-03-10T09:30:00Z'},
        {text:'Yeni hasta: Elif Sahin',icon:'fas fa-user-plus',type:'success',time:'2026-03-10T13:00:00Z'},
        {text:'DNA: Ali Ozturk - Klinefelter (47,XXY)',icon:'fas fa-dna',type:'warning',time:'2026-03-12T14:00:00Z'},
        {text:'Semen: Mustafa Celik - Normozoospermi',icon:'fas fa-vial',type:'success',time:'2026-03-12T10:15:00Z'},
        {text:'DNA: Zeynep Arslan - Trombofili Yuksek Risk',icon:'fas fa-dna',type:'warning',time:'2026-03-14T15:00:00Z'},
        {text:'IVF: Fatma Demir - Transfer (2 embriyo)',icon:'fas fa-baby',type:'success',time:'2026-03-15T08:00:00Z'},
        {text:'IVF: Elif Sahin - Freeze All (7 blastosist)',icon:'fas fa-baby',type:'info',time:'2026-03-15T08:00:00Z'},
        {text:'Semen: Ahmet Yilmaz - OAT, ICSI onerisi',icon:'fas fa-vial',type:'warning',time:'2026-03-20T10:00:00Z'},
        {text:'PGT-A: Elif Sahin - 4/7 oploidi',icon:'fas fa-dna',type:'info',time:'2026-03-20T16:00:00Z'}
    ];
    localStorage.setItem('labsync_patients', JSON.stringify(_p));
    localStorage.setItem('labsync_semen', JSON.stringify(_s));
    localStorage.setItem('labsync_ivf', JSON.stringify(_i));
    localStorage.setItem('labsync_labtests', JSON.stringify(_l));
    localStorage.setItem('labsync_dnatests', JSON.stringify(_d));
    localStorage.setItem('labsync_activities', JSON.stringify(_a));
    localStorage.setItem('labsync_seeded', 'true');
    console.log('[SEED] 7 hasta + testler yuklendi');
}


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
    if (window.syncToSupabase) window.syncToSupabase();
}

function addActivity(text, icon = 'fas fa-circle', type = 'info') {
    DB.activities.unshift({ text, icon, type, time: new Date().toISOString() });
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
    document.querySelectorAll('.module-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`module-${moduleName}`);
    if (target) {
        target.classList.add('active');
        target.style.animation = 'none';
        target.offsetHeight;
        target.style.animation = '';
    }
    // Scroll to top on page switch
    const pc = document.querySelector('.page-content');
    if (pc) pc.scrollTop = 0;
    window.scrollTo(0, 0);
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll(`.nav-item[data-module="${moduleName}"]`).forEach(n => n.classList.add('active'));

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

    if (moduleName === 'dashboard') refreshDashboard();
    if (moduleName === 'patients') refreshPatientsTable();
    if (moduleName === 'semen') { populatePatientSelects(); refreshSemenTable(); }
    if (moduleName === 'ivf') { populatePatientSelects(); refreshIVFTable(); }
    if (moduleName === 'labtests') { populatePatientSelects(); refreshLabTestsTable(); }
    if (moduleName === 'dnatests') { populatePatientSelects(); refreshDNATestsTable(); }
    if (moduleName === 'reports') populatePatientSelects();
    if (moduleName === 'qrscanner') populatePatientSelects();

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
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
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ─── Toast Notifications ───
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
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
        const firstOpt = el.options[0];
        el.innerHTML = '';
        el.appendChild(firstOpt);
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
    return new Date(dateStr).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function formatDateTime(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('tr-TR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// ═══════════════════════════════════════════════════
// PARTICLE SYSTEM + FLOATING SPERM CELLS
// ═══════════════════════════════════════════════════
function initParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    // Regular particles
    const count = window.innerWidth < 768 ? 10 : 25;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (8 + Math.random() * 16) + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.width = (1 + Math.random() * 2) + 'px';
        p.style.height = p.style.width;
        const colors = ['var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-green)', 'var(--neon-cyan)'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.boxShadow = `0 0 ${4 + Math.random() * 6}px ${p.style.background}`;
        container.appendChild(p);
    }
}

// ═══════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════
function animateCounter(element, targetVal, duration = 1200) {
    if (!element) return;
    const startVal = parseInt(element.textContent) || 0;
    if (startVal === targetVal) return;
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(startVal + (targetVal - startVal) * eased);
        element.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ═══════════════════════════════════════════════════
// SVG GAUGE RENDERERS
// ═══════════════════════════════════════════════════
function createRingGauge(containerId, value, max, color, label, unit = '') {
    const container = document.getElementById(containerId);
    if (!container) return;
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const percent = Math.min(value / max, 1);
    const dashOffset = circumference * (1 - percent);

    let status = 'normal';
    let statusText = 'Normal';
    if (percent < 0.3) { status = 'danger'; statusText = 'Düşük'; }
    else if (percent < 0.6) { status = 'warning'; statusText = 'Sınırda'; }

    container.innerHTML = `
        <div class="gauge-card">
            <div class="gauge-ring">
                <svg viewBox="0 0 100 100">
                    <circle class="gauge-bg" cx="50" cy="50" r="${radius}"/>
                    <circle class="gauge-fill" cx="50" cy="50" r="${radius}"
                        stroke="${color}"
                        stroke-dasharray="${circumference}"
                        stroke-dashoffset="${circumference}"
                        data-target="${dashOffset}"/>
                </svg>
                <div class="gauge-value">
                    <span class="value">${value}</span>
                    <span class="unit">${unit}</span>
                </div>
            </div>
            <div class="gauge-label">${label}</div>
            <div class="gauge-status ${status}">${statusText}</div>
        </div>
    `;

    // Animate fill
    setTimeout(() => {
        const fill = container.querySelector('.gauge-fill');
        if (fill) fill.style.strokeDashoffset = dashOffset;
    }, 100);
}

function createArcGauge(containerId, value, min, max, unit = '') {
    const container = document.getElementById(containerId);
    if (!container) return;
    const percent = Math.max(0, Math.min((value - min) / (max - min), 1));
    const angle = -90 + (percent * 180);
    
    // Color based on position
    let color;
    if (percent < 0.3) color = 'var(--neon-green)';
    else if (percent < 0.6) color = 'var(--neon-yellow)';
    else if (percent < 0.8) color = 'var(--neon-orange)';
    else color = 'var(--neon-pink)';

    container.innerHTML = `
        <div class="arc-gauge">
            <svg viewBox="0 0 200 110">
                <defs>
                    <linearGradient id="arcGrad-${containerId}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color: var(--neon-green)"/>
                        <stop offset="40%" style="stop-color: var(--neon-yellow)"/>
                        <stop offset="70%" style="stop-color: var(--neon-orange)"/>
                        <stop offset="100%" style="stop-color: var(--neon-pink)"/>
                    </linearGradient>
                </defs>
                <!-- Background arc -->
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12" stroke-linecap="round"/>
                <!-- Colored arc -->
                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#arcGrad-${containerId})" stroke-width="12" stroke-linecap="round"
                    stroke-dasharray="${Math.PI * 80}" stroke-dashoffset="${Math.PI * 80 * (1 - percent)}"
                    style="transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);"/>
                <!-- Needle -->
                <line x1="100" y1="100" x2="100" y2="30" stroke="${color}" stroke-width="2" stroke-linecap="round"
                    transform="rotate(${angle}, 100, 100)"
                    style="transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);filter: drop-shadow(0 0 4px ${color});"/>
                <circle cx="100" cy="100" r="5" fill="${color}" style="filter: drop-shadow(0 0 6px ${color});"/>
                <!-- Scale labels -->
                <text x="15" y="108" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)">${min}</text>
                <text x="90" y="22" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)" text-anchor="middle">${Math.round((max + min) / 2)}</text>
                <text x="175" y="108" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)" text-anchor="end">${max}</text>
            </svg>
            <div class="arc-gauge-value">
                <div class="value" style="color:${color}">${value}</div>
                <div class="unit">${unit}</div>
            </div>
        </div>
    `;
}

// ═══════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════
function refreshDashboard() {
    const totalPatients = DB.patients.length;
    let totalTests = DB.semenTests.length + DB.ivfRecords.length + DB.labTests.length + DB.dnaTests.length;

    animateCounter(document.getElementById('dashTotalPatients'), totalPatients);
    animateCounter(document.getElementById('dashSemenCount'), DB.semenTests.length);
    animateCounter(document.getElementById('dashIVFCount'), DB.ivfRecords.length);
    animateCounter(document.getElementById('dashLabCount'), DB.labTests.length);
    animateCounter(document.getElementById('dashDNACount'), DB.dnaTests.length);
    
    document.getElementById('patientCount').textContent = totalPatients;

    if (document.getElementById('statusPending')) {
        animateCounter(document.getElementById('statusPending'), Math.floor(Math.random() * 10) + 2);
    }
    if (document.getElementById('statusApproved')) {
        animateCounter(document.getElementById('statusApproved'), Math.floor(Math.random() * 50) + 10);
    }

    renderRecentActivities();
    renderTestDistChart();
    renderMonthlyTrendChart();
}

function renderRecentActivities() {
    const container = document.getElementById('recentActivities');
    if (!container) return;
    if (DB.activities.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>Henüz aktivite yok</h3>
                <p>Test ve hasta kayıtları burada görünecek</p>
            </div>`;
        return;
    }
    container.innerHTML = DB.activities.slice(0, 6).map(a => `
        <div class="timeline-item ${a.type}">
            <div class="timeline-content">
                <div class="timeline-time"><i class="far fa-clock"></i> ${formatDateTime(a.time)}</div>
                <div class="timeline-text"><i class="${a.icon}" style="margin-right: 6px; color: var(--${a.type});"></i>${a.text}</div>
            </div>
        </div>
    `).join('');
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
                data: [DB.semenTests.length, DB.ivfRecords.length, DB.labTests.length, DB.dnaTests.length],
                backgroundColor: ['#00d4ff', 'rgba(255,255,255,0.8)', '#00ff88', '#ff3366'],
                borderWidth: 0,
                borderRadius: 4,
                spacing: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#7a8ba8',
                        usePointStyle: true,
                        padding: 16,
                        font: { family: 'Inter', size: 11 }
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
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.08)',
                    fill: true, tension: 0.4, pointRadius: 4,
                    pointBackgroundColor: '#00d4ff',
                    borderWidth: 2,
                },
                {
                    label: 'Lab Testleri',
                    data: labByMonth,
                    borderColor: 'rgba(255,255,255,0.8)',
                    backgroundColor: 'rgba(168, 85, 247, 0.08)',
                    fill: true, tension: 0.4, pointRadius: 4,
                    pointBackgroundColor: 'rgba(255,255,255,0.8)',
                    borderWidth: 2,
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { color: 'rgba(0, 212, 255, 0.04)' },
                    ticks: { color: '#4a5568', font: { family: 'Inter', size: 11 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 212, 255, 0.04)' },
                    ticks: { color: '#4a5568', font: { family: 'Inter', size: 11 }, stepSize: 1 }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#7a8ba8',
                        usePointStyle: true,
                        font: { family: 'Inter', size: 11 }
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
        version: '2.0.0'
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
    const el = document.getElementById('headerDate');
    if (el) {
        el.textContent = new Date().toLocaleDateString('tr-TR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize particles
    initParticles();

    // Try Supabase
    if (window.loadFromSupabase) {
        document.getElementById('pageTitle').textContent = 'Senkronize Ediliyor...';
        const cloudDB = await window.loadFromSupabase();
        if (cloudDB) {
            if (cloudDB.patients.length === 0 && DB.patients.length > 0) {
                await window.syncToSupabase();
            } else {
                Object.assign(DB, cloudDB);
            }
        }
    }

    updateHeaderDate();
    refreshDashboard();
    populatePatientSelects();

    // Default dates
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
            if (m > 0) rateEl.value = Math.round((f / m) * 100);
            else rateEl.value = '';
        };
        ivfMature.addEventListener('input', calcRate);
        ivfFert.addEventListener('input', calcRate);
    }

    // Semen motility auto-calc
    const progMot = document.getElementById('semenProgMotility');
    const nonProgMot = document.getElementById('semenNonProgMotility');
    if (progMot && nonProgMot) {
        const calcTotalMot = () => {
            const p = parseFloat(progMot.value) || 0;
            const np = parseFloat(nonProgMot.value) || 0;
            const totalEl = document.getElementById('semenTotalMotility');
            const immEl = document.getElementById('semenImmotile');
            if (progMot.value === '' && nonProgMot.value === '') {
                if (totalEl) totalEl.value = '';
                if (immEl) immEl.value = '';
                return;
            }
            if (totalEl) totalEl.value = p + np;
            if (immEl) immEl.value = Math.max(0, 100 - p - np);
        };
        progMot.addEventListener('input', calcTotalMot);
        nonProgMot.addEventListener('input', calcTotalMot);
    }

    // Semen total sperm count auto-calc
    const volEl = document.getElementById('semenVolume');
    const concEl = document.getElementById('semenConcentration');
    if (volEl && concEl) {
        const calcTotal = () => {
            const v = parseFloat(volEl.value) || 0;
            const c = parseFloat(concEl.value) || 0;
            const totalEl = document.getElementById('semenTotalCount');
            if (volEl.value === '' || concEl.value === '') {
                if (totalEl) totalEl.value = '';
                return;
            }
            if (totalEl) totalEl.value = (v * c).toFixed(1);
        };
        volEl.addEventListener('input', calcTotal);
        concEl.addEventListener('input', calcTotal);
    }

    console.log('⚡ LabSync Pro v2.0 initialized.');
});

// ═══════════════════════════════════════════════════
// MOBILE NAVIGATION SYSTEM
// ═══════════════════════════════════════════════════

function mobileNavSwitch(moduleName) {
    // Switch the actual module
    switchModule(moduleName);

    // Update bottom nav active state
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.module === moduleName) {
            item.classList.add('active');
        }
    });

    // For test modules (semen, labtests, dnatests), activate "Testler" tab
    const testModules = ['semen', 'labtests', 'dnatests'];
    if (testModules.includes(moduleName)) {
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.module === 'semen') item.classList.add('active');
        });
    }

    // For ivf, reports, qrscanner — activate "Diğer" tab
    const moreModules = ['ivf', 'reports', 'qrscanner'];
    if (moreModules.includes(moduleName)) {
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.module === 'more') item.classList.add('active');
        });
    }
}

// ─── Quick Action Sheet ───
function openMobileQuickAction() {
    const sheet = document.getElementById('mobileActionSheet');
    if (sheet) {
        sheet.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileActionSheet() {
    const sheet = document.getElementById('mobileActionSheet');
    if (sheet) {
        sheet.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// ─── More Menu ───
function toggleMobileMore() {
    const menu = document.getElementById('mobileMoreMenu');
    if (menu) {
        menu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMore() {
    const menu = document.getElementById('mobileMoreMenu');
    if (menu) {
        menu.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// ─── Mobile Header Hamburger Menu ───
function toggleMobileHeaderMenu() {
    const dropdown = document.getElementById('mobileHeaderDropdown');
    if (dropdown) {
        dropdown.classList.toggle('open');
        // Sync mobile date
        const dateEl = document.getElementById('headerDate');
        const mobileDateEl = document.getElementById('headerDateMobile');
        if (dateEl && mobileDateEl) mobileDateEl.textContent = dateEl.textContent;
    }
}

function closeMobileHeaderMenu() {
    const dropdown = document.getElementById('mobileHeaderDropdown');
    if (dropdown) dropdown.classList.remove('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('mobileHeaderDropdown');
    const btn = document.getElementById('mobileHamburgerBtn');
    if (dropdown && dropdown.classList.contains('open') &&
        !dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// ─── Mobile Search ───
function mobileSearchHandler(event) {
    const query = event.target.value.trim().toLowerCase();
    const container = document.getElementById('mobileSearchResults');
    if (!container) return;
    if (query.length < 2) { container.innerHTML = ''; return; }

    const results = DB.patients.filter(p =>
        p.firstName.toLowerCase().includes(query) ||
        p.lastName.toLowerCase().includes(query) ||
        p.tc.includes(query) ||
        p.id.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--text-muted);"><i class="fas fa-search" style="font-size:24px;margin-bottom:8px;display:block;"></i>Sonuç bulunamadı</div>';
        return;
    }

    container.innerHTML = results.map(p => `
        <div class="mhd-item" onclick="document.getElementById('mobileSearchOverlay').classList.remove('open'); switchModule('patients'); setTimeout(() => showPatientDetail('${p.id}'), 300);" style="padding:14px;">
            <i class="fas fa-user" style="color:var(--neon-blue);"></i>
            <div>
                <div style="color:var(--text-white);font-weight:600;font-size:14px;">${p.firstName} ${p.lastName}</div>
                <div style="color:var(--text-muted);font-size:11px;">${p.id} · ${p.tc || ''}</div>
            </div>
        </div>
    `).join('');
}
