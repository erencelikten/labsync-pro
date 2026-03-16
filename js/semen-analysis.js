/* ═══════════════════════════════════════════════════
   LabSync Pro — Semen Analysis Module
   WHO 2021 Reference Values
   ═══════════════════════════════════════════════════ */

const WHO_REFERENCES = {
    volume: { min: 1.5, unit: 'ml', label: 'Hacim' },
    pH: { min: 7.2, unit: '', label: 'pH' },
    concentration: { min: 15, unit: 'milyon/ml', label: 'Konsantrasyon' },
    totalCount: { min: 39, unit: 'milyon', label: 'Toplam Sperm' },
    progressiveMotility: { min: 32, unit: '%', label: 'Progresif Motilite' },
    totalMotility: { min: 40, unit: '%', label: 'Toplam Motilite' },
    morphology: { min: 4, unit: '%', label: 'Normal Morfoloji' },
    vitality: { min: 58, unit: '%', label: 'Vitalite' },
    wbc: { max: 1, unit: 'milyon/ml', label: 'Lökosit' },
};

const SEMEN_DIAGNOSES = {
    normozoospermia: 'Normozoospermi',
    oligozoospermia: 'Oligozoospermi',
    asthenozoospermia: 'Astenozoospermi',
    teratozoospermia: 'Teratozoospermi',
    oligoastheno: 'Oligoastenozoospermi',
    oligoterato: 'Oligoteratozoospermi',
    asthenoterato: 'Astenoteratozoospermi',
    oat: 'Oligoastenoteratozoospermi (OAT)',
    azoospermia: 'Azoospermi',
    cryptozoospermia: 'Kriptozoospermi',
    aspermia: 'Aspermi',
    necrozoospermia: 'Nekrozoospermi',
    leukocytospermia: 'Lökositospermi',
};

function evaluateSemen(data) {
    if (parseFloat(data.volume) === 0) return SEMEN_DIAGNOSES.aspermia;
    if (parseFloat(data.concentration) === 0) return SEMEN_DIAGNOSES.azoospermia;
    if (parseFloat(data.concentration) < 1) return SEMEN_DIAGNOSES.cryptozoospermia;
    if (parseFloat(data.vitality) > 0 && parseFloat(data.vitality) < 5) return SEMEN_DIAGNOSES.necrozoospermia;

    const isOligo = parseFloat(data.concentration) < WHO_REFERENCES.concentration.min;
    const isAstheno = parseFloat(data.progressiveMotility) < WHO_REFERENCES.progressiveMotility.min;
    const isTerato = parseFloat(data.morphology) < WHO_REFERENCES.morphology.min;

    if (isOligo && isAstheno && isTerato) return SEMEN_DIAGNOSES.oat;
    if (isOligo && isAstheno) return SEMEN_DIAGNOSES.oligoastheno;
    if (isOligo && isTerato) return SEMEN_DIAGNOSES.oligoterato;
    if (isAstheno && isTerato) return SEMEN_DIAGNOSES.asthenoterato;
    if (isOligo) return SEMEN_DIAGNOSES.oligozoospermia;
    if (isAstheno) return SEMEN_DIAGNOSES.asthenozoospermia;
    if (isTerato) return SEMEN_DIAGNOSES.teratozoospermia;

    return SEMEN_DIAGNOSES.normozoospermia;
}

function openSemenModal(editId = null) {
    document.getElementById('semenForm').reset();
    document.getElementById('semenEditId').value = '';
    document.getElementById('semenDate').value = new Date().toISOString().split('T')[0];
    populatePatientSelects();

    if (editId) {
        const t = DB.semenTests.find(x => x.id === editId);
        if (!t) return;
        document.getElementById('semenEditId').value = t.id;
        document.getElementById('semenPatient').value = t.patientId;
        document.getElementById('semenDate').value = t.date;
        document.getElementById('semenAbstinence').value = t.abstinence || '';
        document.getElementById('semenCollectionMethod').value = t.collectionMethod || 'Mastürbasyon';
        document.getElementById('semenVolume').value = t.volume;
        document.getElementById('semenColor').value = t.color || 'Gri-opak';
        document.getElementById('semenLiquefaction').value = t.liquefaction || '';
        document.getElementById('semenViscosity').value = t.viscosity || 'Normal';
        document.getElementById('semenPH').value = t.pH || '';
        document.getElementById('semenConcentration').value = t.concentration;
        document.getElementById('semenTotalCount').value = t.totalCount || '';
        document.getElementById('semenProgMotility').value = t.progressiveMotility;
        document.getElementById('semenNonProgMotility').value = t.nonProgressiveMotility || '';
        document.getElementById('semenImmotile').value = t.immotile || '';
        document.getElementById('semenTotalMotility').value = t.totalMotility || '';
        document.getElementById('semenMorphology').value = t.morphology;
        document.getElementById('semenVitality').value = t.vitality || '';
        document.getElementById('semenRoundCells').value = t.roundCells || '';
        document.getElementById('semenWBC').value = t.wbc || '';
        document.getElementById('semenNotes').value = t.notes || '';
    }

    openModal('semenModal');
}

function saveSemenAnalysis() {
    const patientId = document.getElementById('semenPatient').value;
    const date = document.getElementById('semenDate').value;
    const volume = document.getElementById('semenVolume').value;
    const concentration = document.getElementById('semenConcentration').value;
    const progressiveMotility = document.getElementById('semenProgMotility').value;
    const morphology = document.getElementById('semenMorphology').value;

    if (!patientId || !date || !volume || !concentration || !progressiveMotility || !morphology) {
        showToast('Lütfen zorunlu alanları doldurun', 'error');
        return;
    }

    const data = {
        patientId,
        date,
        abstinence: document.getElementById('semenAbstinence').value,
        collectionMethod: document.getElementById('semenCollectionMethod').value,
        volume,
        color: document.getElementById('semenColor').value,
        liquefaction: document.getElementById('semenLiquefaction').value,
        viscosity: document.getElementById('semenViscosity').value,
        pH: document.getElementById('semenPH').value,
        concentration,
        totalCount: document.getElementById('semenTotalCount').value,
        progressiveMotility,
        nonProgressiveMotility: document.getElementById('semenNonProgMotility').value,
        immotile: document.getElementById('semenImmotile').value,
        totalMotility: document.getElementById('semenTotalMotility').value,
        morphology,
        vitality: document.getElementById('semenVitality').value,
        roundCells: document.getElementById('semenRoundCells').value,
        wbc: document.getElementById('semenWBC').value,
        notes: document.getElementById('semenNotes').value,
    };

    // Auto-evaluate
    data.result = evaluateSemen(data);

    const editId = document.getElementById('semenEditId').value;

    if (editId) {
        const idx = DB.semenTests.findIndex(x => x.id === editId);
        if (idx >= 0) {
            DB.semenTests[idx] = { ...DB.semenTests[idx], ...data, updatedAt: new Date().toISOString() };
            addActivity(`Semen analizi güncellendi: ${editId}`, 'fas fa-vial', 'info');
        }
    } else {
        data.id = generateId('SA');
        data.createdAt = new Date().toISOString();
        DB.semenTests.push(data);
        addActivity(`Yeni semen analizi: ${getPatientName(patientId)} — ${data.result}`, 'fas fa-vial', 'success');
    }

    saveDB();
    closeModal('semenModal');
    refreshSemenTable();
    refreshDashboard();
    showToast(`Sonuç: ${data.result}`, data.result === 'Normozoospermi' ? 'success' : 'warning');
}

function deleteSemenTest(id) {
    if (!confirm('Bu semen analizi kaydını silmek istediğinize emin misiniz?')) return;
    DB.semenTests = DB.semenTests.filter(x => x.id !== id);
    saveDB();
    if (window.deleteFromSupabase) window.deleteFromSupabase('semen_tests', id);
    refreshSemenTable();
    refreshDashboard();
    showToast('Semen analizi silindi', 'warning');
}

function refreshSemenTable() {
    const tbody = document.getElementById('semenTableBody');
    const filterPatient = document.getElementById('semenPatientFilter')?.value || '';

    let tests = DB.semenTests;
    if (filterPatient) tests = tests.filter(t => t.patientId === filterPatient);

    if (tests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-vial"></i><h3>Henüz semen analizi yok</h3><p>Yeni analiz eklemek için butonu kullanın</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = tests.map(t => {
        const isNormal = t.result === 'Normozoospermi';
        return `<tr>
            <td><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent);">${t.id}</span></td>
            <td><strong>${getPatientName(t.patientId)}</strong></td>
            <td>${formatDate(t.date)}</td>
            <td>${t.volume} ml</td>
            <td><span class="parameter-value" style="font-size:14px;">${t.concentration}</span><span class="parameter-unit">M/ml</span></td>
            <td>
                <div class="motility-visual">
                    <span class="motility-segment"><span class="motility-dot progressive"></span>${t.progressiveMotility}%</span>
                </div>
            </td>
            <td>${t.morphology}%</td>
            <td><span class="result-indicator ${isNormal ? 'result-normal' : 'result-abnormal'}">${t.result}</span></td>
            <td class="action-cell">
                <button class="btn btn-ghost btn-icon" onclick="showSemenDetail('${t.id}')" title="Detay"><i class="fas fa-eye"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="openSemenModal('${t.id}')" title="Düzenle"><i class="fas fa-edit"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="deleteSemenTest('${t.id}')" title="Sil" style="color:var(--danger)"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>`;
    }).join('');
}

function filterSemenTests() {
    refreshSemenTable();
}

function showSemenDetail(testId) {
    const t = DB.semenTests.find(x => x.id === testId);
    if (!t) return;

    const patient = getPatient(t.patientId);
    const isNormal = t.result === 'Normozoospermi';

    function paramRow(label, value, unit, refMin, refMax) {
        if (!value && value !== 0) return '';
        const v = parseFloat(value);
        let flag = '';
        if (refMin !== undefined && v < refMin) flag = '↓ Düşük';
        if (refMax !== undefined && v > refMax) flag = '↑ Yüksek';
        const flagClass = flag.includes('Düşük') ? 'flag-low' : flag.includes('Yüksek') ? 'flag-high' : '';
        return `<tr>
            <td style="font-weight:600;">${label}</td>
            <td style="text-align:center;"><span class="parameter-value" style="font-size:16px;">${value}</span><span class="parameter-unit">${unit}</span></td>
            <td style="text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted);">${refMin !== undefined ? '≥' + refMin : ''}${refMax !== undefined ? '≤' + refMax : ''} ${unit}</td>
            <td style="text-align:center;" class="${flagClass}"><strong>${flag || '✓ Normal'}</strong></td>
        </tr>`;
    }

    document.getElementById('semenDetailContent').innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
            <div>
                <h3 style="color:var(--text-white);margin-bottom:4px;">${patient ? patient.firstName + ' ' + patient.lastName : 'Bilinmeyen Hasta'}</h3>
                <span style="font-size:13px;color:var(--text-muted);">Test: ${t.id} | Tarih: ${formatDate(t.date)} | Perhiz: ${t.abstinence || '-'} gün</span>
            </div>
            <div class="result-indicator ${isNormal ? 'result-normal' : 'result-abnormal'}" style="font-size:14px;padding:8px 20px;">
                ${t.result}
            </div>
        </div>

        <div class="table-wrapper" style="margin-bottom:20px;">
            <table>
                <thead>
                    <tr>
                        <th>Parametre</th>
                        <th style="text-align:center;">Sonuç</th>
                        <th style="text-align:center;">WHO Referans</th>
                        <th style="text-align:center;">Değerlendirme</th>
                    </tr>
                </thead>
                <tbody>
                    ${paramRow('Hacim', t.volume, 'ml', 1.5)}
                    ${paramRow('pH', t.pH, '', 7.2)}
                    ${paramRow('Konsantrasyon', t.concentration, 'M/ml', 15)}
                    ${paramRow('Toplam Sperm Sayısı', t.totalCount, 'M', 39)}
                    ${paramRow('Progresif Motilite', t.progressiveMotility, '%', 32)}
                    ${paramRow('Toplam Motilite', t.totalMotility, '%', 40)}
                    ${paramRow('Normal Morfoloji (Kruger)', t.morphology, '%', 4)}
                    ${paramRow('Vitalite', t.vitality, '%', 58)}
                    ${paramRow('Lökosit', t.wbc, 'M/ml', undefined, 1)}
                </tbody>
            </table>
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;">
            <div style="background:var(--bg-input);padding:12px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Renk</div>
                <div style="font-size:14px;font-weight:600;">${t.color || '-'}</div>
            </div>
            <div style="background:var(--bg-input);padding:12px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Likefaksiyon</div>
                <div style="font-size:14px;font-weight:600;">${t.liquefaction ? t.liquefaction + ' dk' : '-'}</div>
            </div>
            <div style="background:var(--bg-input);padding:12px;border-radius:8px;text-align:center;">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Viskozite</div>
                <div style="font-size:14px;font-weight:600;">${t.viscosity || '-'}</div>
            </div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:16px;">
            <div style="flex:1;background:rgba(0,200,83,0.1);border:1px solid rgba(0,200,83,0.2);border-radius:8px;padding:12px;text-align:center;">
                <div class="motility-dot progressive" style="display:inline-block;margin-bottom:4px;"></div>
                <div style="font-size:11px;color:var(--success);margin-bottom:2px;">Progresif</div>
                <div style="font-size:18px;font-weight:700;color:var(--success);">${t.progressiveMotility || 0}%</div>
            </div>
            <div style="flex:1;background:rgba(255,179,0,0.1);border:1px solid rgba(255,179,0,0.2);border-radius:8px;padding:12px;text-align:center;">
                <div class="motility-dot non-progressive" style="display:inline-block;margin-bottom:4px;"></div>
                <div style="font-size:11px;color:var(--warning);margin-bottom:2px;">Non-Progresif</div>
                <div style="font-size:18px;font-weight:700;color:var(--warning);">${t.nonProgressiveMotility || 0}%</div>
            </div>
            <div style="flex:1;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.2);border-radius:8px;padding:12px;text-align:center;">
                <div class="motility-dot immotile" style="display:inline-block;margin-bottom:4px;"></div>
                <div style="font-size:11px;color:var(--danger);margin-bottom:2px;">İmmotil</div>
                <div style="font-size:18px;font-weight:700;color:var(--danger);">${t.immotile || 0}%</div>
            </div>
        </div>

        ${t.notes ? `<div style="padding:12px;background:var(--bg-input);border-radius:8px;"><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Notlar:</span><br>${t.notes}</div>` : ''}
    `;

    // Store testId for printing
    document.getElementById('printSemenBtn').setAttribute('data-test-id', testId);
    openModal('semenDetailModal');
}

function printSemenReport() {
    const testId = document.getElementById('printSemenBtn').getAttribute('data-test-id');
    if (testId) {
        closeModal('semenDetailModal');
        document.getElementById('reportPatientSelect').value = '';
        document.getElementById('reportTypeSelect').value = 'semen';
        switchModule('reports');
        // Find the patient for this test
        const test = DB.semenTests.find(t => t.id === testId);
        if (test) {
            document.getElementById('reportPatientSelect').value = test.patientId;
            generateReport();
        }
    }
}
