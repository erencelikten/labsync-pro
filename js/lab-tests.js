/* ═══════════════════════════════════════════════════
   LabSync Pro — General Lab Tests Module
   ═══════════════════════════════════════════════════ */

// ─── Lab Test Parameter Templates ───
const LAB_PARAMETERS = {
    Hormon: [
        { name: 'FSH', unit: 'mIU/mL', refMin: 1.5, refMax: 12.4 },
        { name: 'LH', unit: 'mIU/mL', refMin: 1.7, refMax: 8.6 },
        { name: 'Estradiol (E2)', unit: 'pg/mL', refMin: 12, refMax: 166 },
        { name: 'Progesteron', unit: 'ng/mL', refMin: 0.2, refMax: 1.4 },
        { name: 'AMH', unit: 'ng/mL', refMin: 1.0, refMax: 10.0 },
        { name: 'TSH', unit: 'µIU/mL', refMin: 0.27, refMax: 4.2 },
        { name: 'Prolaktin', unit: 'ng/mL', refMin: 4.0, refMax: 23.0 },
        { name: 'Testosteron', unit: 'ng/dL', refMin: 264, refMax: 916 },
        { name: 'DHEA-S', unit: 'µg/dL', refMin: 35, refMax: 430 },
        { name: 'Serbest T4', unit: 'ng/dL', refMin: 0.82, refMax: 1.77 },
    ],
    Hemogram: [
        { name: 'WBC', unit: '10³/µL', refMin: 4.5, refMax: 11.0 },
        { name: 'RBC', unit: '10⁶/µL', refMin: 4.5, refMax: 5.5 },
        { name: 'Hemoglobin', unit: 'g/dL', refMin: 12.0, refMax: 17.5 },
        { name: 'Hematokrit', unit: '%', refMin: 36, refMax: 50 },
        { name: 'MCV', unit: 'fL', refMin: 80, refMax: 100 },
        { name: 'MCH', unit: 'pg', refMin: 27, refMax: 33 },
        { name: 'MCHC', unit: 'g/dL', refMin: 32, refMax: 36 },
        { name: 'Trombosit', unit: '10³/µL', refMin: 150, refMax: 400 },
        { name: 'Nötrofil', unit: '%', refMin: 40, refMax: 70 },
        { name: 'Lenfosit', unit: '%', refMin: 20, refMax: 40 },
    ],
    'Bulaşıcı': [
        { name: 'HBsAg', unit: '', type: 'qualitative', options: ['Negatif', 'Pozitif'] },
        { name: 'Anti-HBs', unit: 'mIU/mL', refMin: 10 },
        { name: 'Anti-HCV', unit: '', type: 'qualitative', options: ['Negatif', 'Pozitif'] },
        { name: 'HIV 1/2', unit: '', type: 'qualitative', options: ['Negatif', 'Pozitif'] },
        { name: 'VDRL/RPR', unit: '', type: 'qualitative', options: ['Non-reaktif', 'Reaktif'] },
        { name: 'CMV IgG', unit: '', type: 'qualitative', options: ['Negatif', 'Pozitif'] },
        { name: 'CMV IgM', unit: '', type: 'qualitative', options: ['Negatif', 'Pozitif'] },
        { name: 'Rubella IgG', unit: '', type: 'qualitative', options: ['Negatif', 'Pozitif'] },
        { name: 'Toxoplasma IgG', unit: '', type: 'qualitative', options: ['Negatif', 'Pozitif'] },
        { name: 'Toxoplasma IgM', unit: '', type: 'qualitative', options: ['Negatif', 'Pozitif'] },
    ],
    Koagülasyon: [
        { name: 'PT (Protrombin)', unit: 'sn', refMin: 11, refMax: 13.5 },
        { name: 'INR', unit: '', refMin: 0.8, refMax: 1.1 },
        { name: 'aPTT', unit: 'sn', refMin: 25, refMax: 35 },
        { name: 'Fibrinojen', unit: 'mg/dL', refMin: 200, refMax: 400 },
        { name: 'D-Dimer', unit: 'µg/mL', refMax: 0.5 },
    ],
    Biyokimya: [
        { name: 'Glukoz (AKŞ)', unit: 'mg/dL', refMin: 70, refMax: 100 },
        { name: 'BUN', unit: 'mg/dL', refMin: 7, refMax: 20 },
        { name: 'Kreatinin', unit: 'mg/dL', refMin: 0.7, refMax: 1.3 },
        { name: 'ALT', unit: 'U/L', refMax: 41 },
        { name: 'AST', unit: 'U/L', refMax: 40 },
        { name: 'Toplam Protein', unit: 'g/dL', refMin: 6.0, refMax: 8.3 },
        { name: 'Albumin', unit: 'g/dL', refMin: 3.5, refMax: 5.2 },
        { name: 'Toplam Bilirübin', unit: 'mg/dL', refMax: 1.2 },
        { name: 'LDH', unit: 'U/L', refMin: 120, refMax: 246 },
        { name: 'CRP', unit: 'mg/L', refMax: 5.0 },
    ],
};

function loadLabTestParameters() {
    const type = document.getElementById('labTestType').value;
    const area = document.getElementById('labParametersArea');

    if (!type || !LAB_PARAMETERS[type]) {
        area.innerHTML = `<div class="section-divider"><span>Test Parametreleri</span></div><p style="color: var(--text-muted); font-size: 13px; text-align: center;">Test tipi seçerek parametreleri yükleyin</p>`;
        return;
    }

    const params = LAB_PARAMETERS[type];
    area.innerHTML = `
        <div class="section-divider"><span>${type} Parametreleri</span></div>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Parametre</th>
                        <th>Sonuç</th>
                        <th>Birim</th>
                        <th>Referans Aralığı</th>
                    </tr>
                </thead>
                <tbody>
                    ${params.map((p, i) => `
                        <tr>
                            <td style="font-weight:600;">${p.name}</td>
                            <td>
                                ${p.type === 'qualitative' ?
            `<select class="form-control" id="labParam_${i}" style="padding:6px 10px;font-size:13px;">
                                        ${p.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                                    </select>` :
            `<input type="number" class="form-control" id="labParam_${i}" step="0.01" style="padding:6px 10px;font-size:13px;" placeholder="Değer">`
        }
                            </td>
                            <td style="color:var(--text-muted);font-size:12px;">${p.unit}</td>
                            <td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted);">
                                ${p.type === 'qualitative' ? 'Negatif' :
            (p.refMin !== undefined ? p.refMin : '') +
            (p.refMin !== undefined && p.refMax !== undefined ? ' - ' : '') +
            (p.refMax !== undefined ? (p.refMin === undefined ? '≤ ' : '') + p.refMax : '') +
            (p.refMin !== undefined && p.refMax === undefined ? '+' : '') +
            ' ' + p.unit
        }
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function openLabTestModal(editId = null) {
    document.getElementById('labTestForm').reset();
    document.getElementById('labTestEditId').value = '';
    document.getElementById('labTestDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('labParametersArea').innerHTML = `<div class="section-divider"><span>Test Parametreleri</span></div><p style="color: var(--text-muted); font-size: 13px; text-align: center;">Test tipi seçerek parametreleri yükleyin</p>`;
    populatePatientSelects();

    if (editId) {
        const t = DB.labTests.find(x => x.id === editId);
        if (!t) return;
        document.getElementById('labTestEditId').value = t.id;
        document.getElementById('labTestPatient').value = t.patientId;
        document.getElementById('labTestDate').value = t.date;
        document.getElementById('labTestType').value = t.testType;
        document.getElementById('labTestStatus').value = t.status || 'Sonuçlandı';
        loadLabTestParameters();
        // Fill in saved values
        if (t.parameters) {
            t.parameters.forEach((p, i) => {
                const el = document.getElementById(`labParam_${i}`);
                if (el) el.value = p.value;
            });
        }
    }

    openModal('labTestModal');
}

function saveLabTest() {
    const patientId = document.getElementById('labTestPatient').value;
    const date = document.getElementById('labTestDate').value;
    const testType = document.getElementById('labTestType').value;

    if (!patientId || !date || !testType) {
        showToast('Lütfen zorunlu alanları doldurun', 'error');
        return;
    }

    const templateParams = LAB_PARAMETERS[testType] || [];
    const parameters = templateParams.map((p, i) => {
        const el = document.getElementById(`labParam_${i}`);
        const value = el ? el.value : '';
        let flag = '';
        if (p.type !== 'qualitative' && value !== '') {
            const v = parseFloat(value);
            if (p.refMin !== undefined && v < p.refMin) flag = 'Düşük';
            if (p.refMax !== undefined && v > p.refMax) flag = 'Yüksek';
            if (!flag) flag = 'Normal';
        } else if (p.type === 'qualitative') {
            flag = value === 'Negatif' || value === 'Non-reaktif' ? 'Normal' : 'Anormal';
        }
        return {
            name: p.name,
            value,
            unit: p.unit,
            refMin: p.refMin,
            refMax: p.refMax,
            flag,
            type: p.type || 'quantitative'
        };
    });

    const flagCount = parameters.filter(p => p.flag === 'Yüksek' || p.flag === 'Düşük' || p.flag === 'Anormal').length;

    const data = {
        patientId,
        date,
        testType,
        status: document.getElementById('labTestStatus').value,
        parameters,
        flagCount,
        parameterCount: parameters.length,
    };

    const editId = document.getElementById('labTestEditId').value;

    if (editId) {
        const idx = DB.labTests.findIndex(x => x.id === editId);
        if (idx >= 0) {
            DB.labTests[idx] = { ...DB.labTests[idx], ...data, updatedAt: new Date().toISOString() };
            addActivity(`Lab testi güncellendi: ${editId}`, 'fas fa-flask', 'info');
        }
    } else {
        data.id = generateId('LT');
        data.createdAt = new Date().toISOString();
        DB.labTests.push(data);
        addActivity(`Yeni lab testi: ${getPatientName(patientId)} — ${testType}`, 'fas fa-flask', 'success');
    }

    saveDB();
    closeModal('labTestModal');
    refreshLabTestsTable();
    refreshDashboard();
    showToast(`Lab testi kaydedildi (${flagCount} bayrak)`, flagCount > 0 ? 'warning' : 'success');
}

function deleteLabTest(id) {
    if (!confirm('Bu lab testini silmek istediğinize emin misiniz?')) return;
    DB.labTests = DB.labTests.filter(x => x.id !== id);
    saveDB();
    if (window.deleteFromSupabase) window.deleteFromSupabase('lab_tests', id);
    refreshLabTestsTable();
    refreshDashboard();
    showToast('Lab testi silindi', 'warning');
}

function refreshLabTestsTable() {
    const tbody = document.getElementById('labTestsTableBody');
    const filterPatient = document.getElementById('labPatientFilter')?.value || '';
    const filterType = document.getElementById('labTypeFilter')?.value || '';

    let tests = DB.labTests;
    if (filterPatient) tests = tests.filter(t => t.patientId === filterPatient);
    if (filterType) tests = tests.filter(t => t.testType === filterType);

    if (tests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-flask"></i><h3>Henüz lab testi yok</h3><p>Yeni test eklemek için butonu kullanın</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = tests.map(t => `<tr>
        <td><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-white);">${t.id}</span></td>
        <td><strong>${getPatientName(t.patientId)}</strong></td>
        <td><span class="badge badge-info">${t.testType}</span></td>
        <td>${formatDate(t.date)}</td>
        <td>${t.parameterCount || '-'}</td>
        <td>${t.flagCount > 0 ? `<span class="badge badge-danger">${t.flagCount} anormal</span>` : '<span class="badge badge-success">Normal</span>'}</td>
        <td><span class="badge ${t.status === 'Sonuçlandı' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
        <td class="action-cell">
            <button class="btn btn-ghost btn-icon" onclick="showLabTestDetail('${t.id}')" title="Detay"><i class="fas fa-eye"></i></button>
            <button class="btn btn-ghost btn-icon" onclick="openLabTestModal('${t.id}')" title="Düzenle"><i class="fas fa-edit"></i></button>
            <button class="btn btn-ghost btn-icon" onclick="deleteLabTest('${t.id}')" title="Sil" style="color:var(--danger)"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>`).join('');
}

function filterLabTests() {
    refreshLabTestsTable();
}

function showLabTestDetail(testId) {
    const t = DB.labTests.find(x => x.id === testId);
    if (!t) return;

    const patient = getPatient(t.patientId);

    document.getElementById('detailPatientName').textContent = 'Lab Test Detayı';
    document.getElementById('patientDetailContent').innerHTML = `
        <div style="margin-bottom:24px;">
            <h3 style="color:var(--text-white);margin-bottom:4px;">${patient ? patient.firstName + ' ' + patient.lastName : 'Bilinmeyen Hasta'}</h3>
            <span style="font-size:13px;color:var(--text-muted);">Test: ${t.id} | Tip: ${t.testType} | Tarih: ${formatDate(t.date)}</span>
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Parametre</th>
                        <th style="text-align:center;">Sonuç</th>
                        <th>Birim</th>
                        <th>Referans</th>
                        <th style="text-align:center;">Durum</th>
                    </tr>
                </thead>
                <tbody>
                    ${(t.parameters || []).map(p => {
        const flagColor = p.flag === 'Yüksek' ? 'var(--danger)' :
            p.flag === 'Düşük' ? 'var(--info)' :
                p.flag === 'Anormal' ? 'var(--danger)' : 'var(--success)';
        return `<tr>
                            <td style="font-weight:600;">${p.name}</td>
                            <td style="text-align:center;font-weight:700;color:${p.flag !== 'Normal' ? flagColor : 'var(--text-white)'};">${p.value || '-'}</td>
                            <td style="color:var(--text-muted);">${p.unit}</td>
                            <td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted);">
                                ${p.type === 'qualitative' ? 'Negatif' :
                (p.refMin !== undefined ? p.refMin : '') +
                (p.refMin !== undefined && p.refMax !== undefined ? ' - ' : '') +
                (p.refMax !== undefined ? p.refMax : '') +
                ' ' + p.unit}
                            </td>
                            <td style="text-align:center;"><span style="color:${flagColor};font-weight:600;font-size:12px;">${p.flag === 'Yüksek' ? '↑ Yüksek' : p.flag === 'Düşük' ? '↓ Düşük' : p.flag === 'Anormal' ? '⚠ Anormal' : '✓ Normal'}</span></td>
                        </tr>`;
    }).join('')}
                </tbody>
            </table>
        </div>
    `;

    openModal('patientDetailModal');
}
