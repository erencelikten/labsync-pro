/* ═══════════════════════════════════════════════════
   LabSync Pro — DNA Tests Module
   Genetik / DNA Testleri
   ═══════════════════════════════════════════════════ */

const DNA_TEST_TYPES = {
    'Karyotip': {
        label: 'Karyotip Analizi',
        parameters: [
            { name: 'Karyotip Sonucu', type: 'text', placeholder: 'örn: 46,XY / 46,XX / 47,XXY' },
            { name: 'Sayısal Anomali', type: 'qualitative', options: ['Yok', 'Var'] },
            { name: 'Yapısal Anomali', type: 'qualitative', options: ['Yok', 'Var'] },
            { name: 'Mozaiklik', type: 'qualitative', options: ['Yok', 'Var'] },
            { name: 'Analiz Edilen Hücre Sayısı', type: 'number', unit: 'hücre' },
            { name: 'Bant Rezolüsyonu', type: 'text', placeholder: 'örn: 400-550 bant' },
        ]
    },
    'Y Mikrodelesyon': {
        label: 'Y Kromozomu Mikrodelesyon',
        parameters: [
            { name: 'AZFa Bölgesi', type: 'qualitative', options: ['Normal', 'Delesyon'] },
            { name: 'AZFb Bölgesi', type: 'qualitative', options: ['Normal', 'Delesyon'] },
            { name: 'AZFc Bölgesi', type: 'qualitative', options: ['Normal', 'Delesyon'] },
            { name: 'AZFd Bölgesi', type: 'qualitative', options: ['Normal', 'Delesyon'] },
            { name: 'SRY Geni', type: 'qualitative', options: ['Pozitif', 'Negatif'] },
            { name: 'Genel Değerlendirme', type: 'qualitative', options: ['Normal', 'Mikrodelesyon Saptandı'] },
        ]
    },
    'CFTR Mutasyon': {
        label: 'Kistik Fibrozis (CFTR) Mutasyon Analizi',
        parameters: [
            { name: 'F508del', type: 'qualitative', options: ['Normal', 'Heterozigot', 'Homozigot'] },
            { name: 'G542X', type: 'qualitative', options: ['Normal', 'Heterozigot', 'Homozigot'] },
            { name: 'G551D', type: 'qualitative', options: ['Normal', 'Heterozigot', 'Homozigot'] },
            { name: 'N1303K', type: 'qualitative', options: ['Normal', 'Heterozigot', 'Homozigot'] },
            { name: 'W1282X', type: 'qualitative', options: ['Normal', 'Heterozigot', 'Homozigot'] },
            { name: 'R117H', type: 'qualitative', options: ['Normal', 'Heterozigot', 'Homozigot'] },
            { name: '5T/7T/9T Polimorfizm', type: 'text', placeholder: 'örn: 7T/9T' },
            { name: 'Taşıyıcılık Durumu', type: 'qualitative', options: ['Taşıyıcı Değil', 'Taşıyıcı', 'Hasta'] },
        ]
    },
    'Sperm DFI': {
        label: 'Sperm DNA Fragmentasyon İndeksi',
        parameters: [
            { name: 'DFI (%)', type: 'number', unit: '%', refMax: 30 },
            { name: 'HDS - Yüksek Boyanan (%)', type: 'number', unit: '%', refMax: 15 },
            { name: 'Test Yöntemi', type: 'qualitative', options: ['TUNEL', 'SCD (Halo)', 'SCSA', 'Comet Assay'] },
            { name: 'Toplam Analiz Edilen Sperm', type: 'number', unit: 'sperm' },
            { name: 'Değerlendirme', type: 'qualitative', options: ['Normal (<15%)', 'Orta (15-30%)', 'Yüksek (>30%)'] },
        ]
    },
    'PGT-A': {
        label: 'PGT-A (Anöploidi Taraması)',
        parameters: [
            { name: 'Embriyo Numarası', type: 'text', placeholder: 'örn: E1, E2, E3...' },
            { name: 'Biyopsi Günü', type: 'qualitative', options: ['Day 3', 'Day 5', 'Day 6'] },
            { name: 'Sonuç', type: 'qualitative', options: ['Öploidi', 'Anöploidi', 'Mozaik', 'Sonuçsuz'] },
            { name: 'Anomali Detayı', type: 'text', placeholder: 'örn: Trizomi 21, Monozomi X' },
            { name: 'Platform', type: 'qualitative', options: ['NGS', 'aCGH', 'SNP Array', 'qPCR'] },
            { name: 'Transfer Uygunluğu', type: 'qualitative', options: ['Uygun', 'Uygun Değil', 'Koşullu Uygun'] },
        ]
    },
    'PGT-M': {
        label: 'PGT-M (Monogenik Hastalık)',
        parameters: [
            { name: 'Hedef Hastalık', type: 'text', placeholder: 'örn: Talasemi, SMA, Kistik Fibrozis' },
            { name: 'Hedef Gen/Mutasyon', type: 'text', placeholder: 'örn: HBB, SMN1, CFTR' },
            { name: 'Embriyo Numarası', type: 'text', placeholder: 'örn: E1, E2, E3...' },
            { name: 'Sonuç', type: 'qualitative', options: ['Etkilenmemiş', 'Taşıyıcı', 'Etkilenmiş', 'Sonuçsuz'] },
            { name: 'HLA Uyumu', type: 'qualitative', options: ['Uyumlu', 'Uyumsuz', 'Test Edilmedi'] },
            { name: 'Transfer Uygunluğu', type: 'qualitative', options: ['Uygun', 'Uygun Değil', 'Koşullu Uygun'] },
        ]
    },
    'PGT-SR': {
        label: 'PGT-SR (Yapısal Yeniden Düzenleme)',
        parameters: [
            { name: 'Ebeveyn Translokasyon Tipi', type: 'text', placeholder: 'örn: t(11;22), Robertsonian' },
            { name: 'Embriyo Numarası', type: 'text', placeholder: 'örn: E1, E2...' },
            { name: 'Sonuç', type: 'qualitative', options: ['Dengeli/Normal', 'Dengesiz', 'Sonuçsuz'] },
            { name: 'Segmental Anomali', type: 'qualitative', options: ['Yok', 'Var'] },
            { name: 'Transfer Uygunluğu', type: 'qualitative', options: ['Uygun', 'Uygun Değil'] },
        ]
    },
    'Babalık Testi': {
        label: 'Babalık (Paternity) Testi',
        parameters: [
            { name: 'STR Locus Sayısı', type: 'number', unit: 'locus' },
            { name: 'Eşleşen Locus', type: 'number', unit: 'locus' },
            { name: 'Eşleşmeyen Locus', type: 'number', unit: 'locus' },
            { name: 'Babalık Olasılığı (%)', type: 'number', unit: '%' },
            { name: 'Sonuç', type: 'qualitative', options: ['Baba Olarak Dışlanamaz (>99.99%)', 'Baba Olarak Dışlanır', 'Belirsiz'] },
            { name: 'Amelogenin', type: 'text', placeholder: 'X/Y veya X/X' },
        ]
    },
    'Trombofili Paneli': {
        label: 'Trombofili Genetik Panel',
        parameters: [
            { name: 'Faktör V Leiden (G1691A)', type: 'qualitative', options: ['Normal (GG)', 'Heterozigot (GA)', 'Homozigot (AA)'] },
            { name: 'Protrombin (G20210A)', type: 'qualitative', options: ['Normal (GG)', 'Heterozigot (GA)', 'Homozigot (AA)'] },
            { name: 'MTHFR C677T', type: 'qualitative', options: ['Normal (CC)', 'Heterozigot (CT)', 'Homozigot (TT)'] },
            { name: 'MTHFR A1298C', type: 'qualitative', options: ['Normal (AA)', 'Heterozigot (AC)', 'Homozigot (CC)'] },
            { name: 'PAI-1 4G/5G', type: 'qualitative', options: ['Normal (5G/5G)', 'Heterozigot (4G/5G)', 'Homozigot (4G/4G)'] },
            { name: 'Faktör XIII (V34L)', type: 'qualitative', options: ['Normal', 'Heterozigot', 'Homozigot'] },
            { name: 'Risk Değerlendirmesi', type: 'qualitative', options: ['Düşük Risk', 'Orta Risk', 'Yüksek Risk'] },
        ]
    },
    'SMA Taşıyıcılık': {
        label: 'SMA Taşıyıcılık Testi',
        parameters: [
            { name: 'SMN1 Kopya Sayısı', type: 'number', unit: 'kopya' },
            { name: 'SMN2 Kopya Sayısı', type: 'number', unit: 'kopya' },
            { name: 'Ekzon 7 Delesyon', type: 'qualitative', options: ['Normal', 'Heterozigot Delesyon', 'Homozigot Delesyon'] },
            { name: 'Taşıyıcılık Durumu', type: 'qualitative', options: ['Taşıyıcı Değil', 'Taşıyıcı (1 kopya)', 'Hasta (0 kopya)'] },
        ]
    },
    'Genetik Check Up': {
        label: 'Genetik Check Up',
        parameters: [
            { name: 'Tıbbi Genetik Konsültasyonu', type: 'qualitative', options: ['Yapıldı', 'Yapılmadı'] },
            { name: 'Tek Gen Hastalıkları Analizi', type: 'qualitative', options: ['Normal', 'Taşıyıcı', 'Riskli Bulgu Saptandı'] },
            { name: 'Poligenik Risk Skorları', type: 'qualitative', options: ['Normal Sınırda', 'Yüksek Risk Saptandı'] },
            { name: 'Köken (Ancestry) Analizi', type: 'text', placeholder: 'örn: %65 Anadolu, %25 Orta Asya...' },
            { name: 'Farmakogenomik (İlaç Uyumu)', type: 'qualitative', options: ['Normal Metabolize Edici', 'Yavaş', 'Hızlı'] },
            { name: 'Spor Performansı ve Beslenme', type: 'text', placeholder: 'örn: Güç/Paten potansiyeli yüksek, Kafeine duyarlı' },
        ]
    },
};

function loadDNATestParameters() {
    const type = document.getElementById('dnaTestType').value;
    const area = document.getElementById('dnaParametersArea');

    if (!type || !DNA_TEST_TYPES[type]) {
        area.innerHTML = `<div class="section-divider"><span>Test Parametreleri</span></div><p style="color:var(--text-muted);font-size:13px;text-align:center;">DNA test tipi seçerek parametreleri yükleyin</p>`;
        return;
    }

    const testDef = DNA_TEST_TYPES[type];
    const params = testDef.parameters;

    area.innerHTML = `
        <div class="section-divider"><span>${testDef.label}</span></div>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Parametre</th>
                        <th>Sonuç</th>
                        ${params.some(p => p.unit) ? '<th>Birim</th>' : ''}
                        ${params.some(p => p.refMax !== undefined) ? '<th>Referans</th>' : ''}
                    </tr>
                </thead>
                <tbody>
                    ${params.map((p, i) => `
                        <tr>
                            <td style="font-weight:600;">${p.name}</td>
                            <td>
                                ${p.type === 'qualitative' ?
            `<select class="form-control" id="dnaParam_${i}" style="padding:6px 10px;font-size:13px;">
                                        ${p.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                                    </select>` :
            p.type === 'text' ?
                `<input type="text" class="form-control" id="dnaParam_${i}" style="padding:6px 10px;font-size:13px;" placeholder="${p.placeholder || ''}">` :
                `<input type="number" class="form-control" id="dnaParam_${i}" step="0.01" style="padding:6px 10px;font-size:13px;" placeholder="Değer">`
        }
                            </td>
                            ${params.some(pp => pp.unit) ? `<td style="color:var(--text-muted);font-size:12px;">${p.unit || ''}</td>` : ''}
                            ${params.some(pp => pp.refMax !== undefined) ? `<td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted);">
                                ${p.refMax !== undefined ? '≤ ' + p.refMax + (p.unit ? ' ' + p.unit : '') : '-'}
                            </td>` : ''}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function openDNATestModal(editId = null) {
    document.getElementById('dnaTestForm').reset();
    document.getElementById('dnaTestEditId').value = '';
    document.getElementById('dnaTestDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('dnaParametersArea').innerHTML = `<div class="section-divider"><span>Test Parametreleri</span></div><p style="color:var(--text-muted);font-size:13px;text-align:center;">DNA test tipi seçerek parametreleri yükleyin</p>`;
    populatePatientSelects();

    if (editId) {
        const t = DB.dnaTests.find(x => x.id === editId);
        if (!t) return;
        document.getElementById('dnaTestEditId').value = t.id;
        document.getElementById('dnaTestPatient').value = t.patientId;
        document.getElementById('dnaTestDate').value = t.date;
        document.getElementById('dnaTestType').value = t.testType;
        document.getElementById('dnaTestLab').value = t.lab || '';
        document.getElementById('dnaTestSampleType').value = t.sampleType || 'Kan (EDTA)';
        document.getElementById('dnaTestNotes').value = t.notes || '';
        loadDNATestParameters();
        // Fill saved values
        if (t.parameters) {
            t.parameters.forEach((p, i) => {
                const el = document.getElementById(`dnaParam_${i}`);
                if (el) el.value = p.value;
            });
        }
    }

    openModal('dnaTestModal');
}

function saveDNATest() {
    const patientId = document.getElementById('dnaTestPatient').value;
    const date = document.getElementById('dnaTestDate').value;
    const testType = document.getElementById('dnaTestType').value;

    if (!patientId || !date || !testType) {
        showToast('Lütfen zorunlu alanları doldurun', 'error');
        return;
    }

    const testDef = DNA_TEST_TYPES[testType];
    if (!testDef) return;

    const parameters = testDef.parameters.map((p, i) => {
        const el = document.getElementById(`dnaParam_${i}`);
        const value = el ? el.value : '';
        let flag = 'Normal';

        if (p.type === 'qualitative') {
            // Flag abnormal results
            const normalValues = ['Normal', 'Yok', 'Taşıyıcı Değil', 'Normal (GG)', 'Normal (CC)', 'Normal (AA)', 'Normal (5G/5G)',
                'Öploidi', 'Etkilenmemiş', 'Dengeli/Normal', 'Uygun', 'Uyumlu', 'Negatif', 'Pozitif',
                'Düşük Risk', 'Normal (<15%)', 'Baba Olarak Dışlanamaz (>99.99%)'];
            if (value && !normalValues.includes(value)) {
                flag = 'Anormal';
            }
        } else if (p.type === 'number' && value) {
            const v = parseFloat(value);
            if (p.refMax !== undefined && v > p.refMax) flag = 'Yüksek';
        }

        return {
            name: p.name,
            value,
            unit: p.unit || '',
            type: p.type,
            flag,
        };
    });

    const abnormalCount = parameters.filter(p => p.flag === 'Anormal' || p.flag === 'Yüksek').length;

    const data = {
        patientId,
        date,
        testType,
        testLabel: testDef.label,
        lab: document.getElementById('dnaTestLab').value.trim(),
        sampleType: document.getElementById('dnaTestSampleType').value,
        notes: document.getElementById('dnaTestNotes').value.trim(),
        parameters,
        abnormalCount,
        parameterCount: parameters.length,
        overallResult: abnormalCount > 0 ? 'Anormal Bulgu' : 'Normal',
    };

    const editId = document.getElementById('dnaTestEditId').value;

    if (editId) {
        const idx = DB.dnaTests.findIndex(x => x.id === editId);
        if (idx >= 0) {
            DB.dnaTests[idx] = { ...DB.dnaTests[idx], ...data, updatedAt: new Date().toISOString() };
            addActivity(`DNA testi güncellendi: ${editId}`, 'fas fa-dna', 'info');
        }
    } else {
        data.id = generateId('DNA');
        data.createdAt = new Date().toISOString();
        DB.dnaTests.push(data);
        addActivity(`Yeni DNA testi: ${getPatientName(patientId)} — ${testDef.label}`, 'fas fa-dna', 'success');
    }

    saveDB();
    closeModal('dnaTestModal');
    refreshDNATestsTable();
    refreshDashboard();
    showToast(`DNA testi kaydedildi — ${data.overallResult}`, abnormalCount > 0 ? 'warning' : 'success');
}

function deleteDNATest(id) {
    if (!confirm('Bu DNA testini silmek istediğinize emin misiniz?')) return;
    DB.dnaTests = DB.dnaTests.filter(x => x.id !== id);
    saveDB();
    if (window.deleteFromSupabase) window.deleteFromSupabase('dna_tests', id);
    refreshDNATestsTable();
    refreshDashboard();
    showToast('DNA testi silindi', 'warning');
}

function refreshDNATestsTable() {
    const tbody = document.getElementById('dnaTestsTableBody');
    const filterPatient = document.getElementById('dnaPatientFilter')?.value || '';
    const filterType = document.getElementById('dnaTypeFilter')?.value || '';

    let tests = DB.dnaTests;
    if (filterPatient) tests = tests.filter(t => t.patientId === filterPatient);
    if (filterType) tests = tests.filter(t => t.testType === filterType);

    if (tests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-dna"></i><h3>Henüz DNA testi yok</h3><p>Yeni test eklemek için butonu kullanın</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = tests.map(t => `<tr>
        <td><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#E040FB;">${t.id}</span></td>
        <td><strong>${getPatientName(t.patientId)}</strong></td>
        <td><span class="badge badge-info" style="background:rgba(224,64,251,0.15);color:#E040FB;">${t.testType}</span></td>
        <td>${formatDate(t.date)}</td>
        <td>${t.parameterCount || '-'}</td>
        <td>${t.abnormalCount > 0 ? `<span class="badge badge-danger">${t.abnormalCount} anormal</span>` : '<span class="badge badge-success">Normal</span>'}</td>
        <td>${t.lab || '-'}</td>
        <td class="action-cell">
            <button class="btn btn-ghost btn-icon" onclick="showDNATestDetail('${t.id}')" title="Detay"><i class="fas fa-eye"></i></button>
            <button class="btn btn-ghost btn-icon" onclick="openDNATestModal('${t.id}')" title="Düzenle"><i class="fas fa-edit"></i></button>
            <button class="btn btn-ghost btn-icon" onclick="deleteDNATest('${t.id}')" title="Sil" style="color:var(--danger)"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>`).join('');
}

function filterDNATests() {
    refreshDNATestsTable();
}

function showDNATestDetail(testId) {
    const t = DB.dnaTests.find(x => x.id === testId);
    if (!t) return;

    const patient = getPatient(t.patientId);

    document.getElementById('detailPatientName').textContent = 'DNA Test Detayı';
    document.getElementById('patientDetailContent').innerHTML = `
        <div style="margin-bottom:24px;">
            <h3 style="color:var(--text-white);margin-bottom:4px;">${patient ? patient.firstName + ' ' + patient.lastName : 'Bilinmeyen Hasta'}</h3>
            <span style="font-size:13px;color:var(--text-muted);">Test: ${t.id} | Tip: ${t.testLabel} | Tarih: ${formatDate(t.date)}${t.lab ? ' | Lab: ' + t.lab : ''}${t.sampleType ? ' | Numune: ' + t.sampleType : ''}</span>
        </div>

        <div style="display:flex;gap:16px;margin-bottom:24px;">
            <div class="stat-card" style="padding:16px;flex:1;">
                <div class="stat-info">
                    <div class="stat-label">Test Tipi</div>
                    <div style="font-size:14px;font-weight:700;color:#E040FB;">${t.testLabel}</div>
                </div>
            </div>
            <div class="stat-card" style="padding:16px;flex:1;">
                <div class="stat-info">
                    <div class="stat-label">Genel Sonuç</div>
                    <div style="font-size:16px;font-weight:800;color:${t.overallResult === 'Normal' ? 'var(--success)' : 'var(--danger)'};">${t.overallResult}</div>
                </div>
            </div>
            <div class="stat-card" style="padding:16px;flex:1;">
                <div class="stat-info">
                    <div class="stat-label">Parametre</div>
                    <div style="font-size:18px;font-weight:700;color:var(--text-white);">${t.abnormalCount} / ${t.parameterCount}</div>
                    <div style="font-size:10px;color:var(--text-muted);">anormal bulgu</div>
                </div>
            </div>
        </div>

        <div class="section-divider"><span>Detaylı Sonuçlar</span></div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Parametre</th>
                        <th style="text-align:center;">Sonuç</th>
                        <th style="text-align:center;">Durum</th>
                    </tr>
                </thead>
                <tbody>
                    ${(t.parameters || []).map(p => {
        const isAbnormal = p.flag === 'Anormal' || p.flag === 'Yüksek';
        return `<tr style="${isAbnormal ? 'background:var(--danger-bg);' : ''}">
                            <td style="font-weight:600;">${p.name}</td>
                            <td style="text-align:center;font-weight:700;color:${isAbnormal ? 'var(--danger)' : 'var(--text-white)'};">${p.value || '-'}${p.unit ? ' ' + p.unit : ''}</td>
                            <td style="text-align:center;">
                                <span style="color:${isAbnormal ? 'var(--danger)' : 'var(--success)'};font-weight:600;font-size:12px;">
                                    ${isAbnormal ? '⚠ ' + p.flag : '✓ Normal'}
                                </span>
                            </td>
                        </tr>`;
    }).join('')}
                </tbody>
            </table>
        </div>

        ${t.notes ? `<div style="padding:12px;background:var(--bg-input);border-radius:8px;margin-top:20px;"><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Notlar:</span><br>${t.notes}</div>` : ''}
    `;

    openModal('patientDetailModal');
}

// Report generation for DNA tests
function generateDNATestReport(patientId, patient, age) {
    const tests = DB.dnaTests.filter(t => t.patientId === patientId);
    if (tests.length === 0) {
        showToast('Bu hastaya ait DNA testi bulunamadı', 'warning');
        return '';
    }

    const t = tests[tests.length - 1];

    return generateReportHeader(patient, age, `DNA TEST RAPORU — ${t.testLabel.toUpperCase()}`) + `
            <div style="margin-bottom:16px;">
                <span style="font-size:11px;color:#666;">Test: ${t.id} | Tip: ${t.testLabel} | Tarih: ${formatDate(t.date)}${t.lab ? ' | Laboratuvar: ' + t.lab : ''} | Numune: ${t.sampleType || '-'}</span>
            </div>

            <table class="report-table">
                <thead>
                    <tr>
                        <th>Parametre</th>
                        <th>Sonuç</th>
                        <th>Değerlendirme</th>
                    </tr>
                </thead>
                <tbody>
                    ${(t.parameters || []).map(p => {
        const isAbnormal = p.flag === 'Anormal' || p.flag === 'Yüksek';
        return `<tr>
                            <td>${p.name}</td>
                            <td ${isAbnormal ? 'class="flag-high"' : ''}><strong>${p.value || '-'}</strong>${p.unit ? ' ' + p.unit : ''}</td>
                            <td ${isAbnormal ? 'class="flag-high"' : ''}>${isAbnormal ? '⚠ ' + p.flag : '✓ Normal'}</td>
                        </tr>`;
    }).join('')}
                </tbody>
            </table>

            <div style="padding:12px;background:${t.overallResult === 'Normal' ? '#f0fff0' : '#fff0f0'};border:2px solid ${t.overallResult === 'Normal' ? '#00C853' : '#FF4757'};border-radius:8px;margin:20px 0;">
                <strong>GENEL SONUÇ: </strong>
                <span style="font-size:14px;font-weight:700;color:${t.overallResult === 'Normal' ? '#00C853' : '#FF4757'};">${t.overallResult}</span>
                ${t.abnormalCount > 0 ? ` (${t.abnormalCount} anormal bulgu)` : ''}
            </div>

            ${t.notes ? `<div style="padding:8px;background:#f9f9f9;border-radius:4px;margin-bottom:20px;font-size:11px;"><strong>Klinik Not:</strong> ${t.notes}</div>` : ''}
    ` + generateReportFooter();
}
