/* ═══════════════════════════════════════════════════
   LabSync Pro — IVF / Embriyoloji Module
   ═══════════════════════════════════════════════════ */

function openIVFModal(editId = null) {
    document.getElementById('ivfForm').reset();
    document.getElementById('ivfEditId').value = '';
    document.getElementById('ivfStartDate').value = new Date().toISOString().split('T')[0];
    populatePatientSelects();

    if (editId) {
        const r = DB.ivfRecords.find(x => x.id === editId);
        if (!r) return;
        document.getElementById('ivfEditId').value = r.id;
        document.getElementById('ivfPatient').value = r.patientId;
        document.getElementById('ivfStartDate').value = r.startDate;
        document.getElementById('ivfProtocol').value = r.protocol || 'Antagonist';
        document.getElementById('ivfMethod').value = r.method || 'ICSI';
        document.getElementById('ivfOocyteCount').value = r.oocyteCount || '';
        document.getElementById('ivfMatureOocyte').value = r.matureOocyte || '';
        document.getElementById('ivfFertilized').value = r.fertilized || '';
        document.getElementById('ivfFertRate').value = r.fertRate || '';
        document.getElementById('ivfDay3Count').value = r.day3Count || '';
        document.getElementById('ivfDay3Grade').value = r.day3Grade || '';
        document.getElementById('ivfBlastCount').value = r.blastCount || '';
        document.getElementById('ivfBlastGrade').value = r.blastGrade || '';
        document.getElementById('ivfTransferDate').value = r.transferDate || '';
        document.getElementById('ivfTransferDay').value = r.transferDay || '';
        document.getElementById('ivfTransferCount').value = r.transferCount || '';
        document.getElementById('ivfFrozenCount').value = r.frozenCount || '';
        document.getElementById('ivfStatus').value = r.status || 'Devam Ediyor';
        document.getElementById('ivfNotes').value = r.notes || '';
    }

    openModal('ivfModal');
}

function saveIVFRecord() {
    const patientId = document.getElementById('ivfPatient').value;
    const startDate = document.getElementById('ivfStartDate').value;

    if (!patientId || !startDate) {
        showToast('Lütfen hasta ve başlangıç tarihini girin', 'error');
        return;
    }

    const data = {
        patientId,
        startDate,
        protocol: document.getElementById('ivfProtocol').value,
        method: document.getElementById('ivfMethod').value,
        oocyteCount: document.getElementById('ivfOocyteCount').value,
        matureOocyte: document.getElementById('ivfMatureOocyte').value,
        fertilized: document.getElementById('ivfFertilized').value,
        fertRate: document.getElementById('ivfFertRate').value,
        day3Count: document.getElementById('ivfDay3Count').value,
        day3Grade: document.getElementById('ivfDay3Grade').value,
        blastCount: document.getElementById('ivfBlastCount').value,
        blastGrade: document.getElementById('ivfBlastGrade').value,
        transferDate: document.getElementById('ivfTransferDate').value,
        transferDay: document.getElementById('ivfTransferDay').value,
        transferCount: document.getElementById('ivfTransferCount').value,
        frozenCount: document.getElementById('ivfFrozenCount').value,
        status: document.getElementById('ivfStatus').value,
        notes: document.getElementById('ivfNotes').value,
    };

    const editId = document.getElementById('ivfEditId').value;

    if (editId) {
        const idx = DB.ivfRecords.findIndex(x => x.id === editId);
        if (idx >= 0) {
            DB.ivfRecords[idx] = { ...DB.ivfRecords[idx], ...data, updatedAt: new Date().toISOString() };
            addActivity(`IVF kaydı güncellendi: ${editId}`, 'fas fa-baby', 'info');
        }
    } else {
        data.id = generateId('IVF');
        data.createdAt = new Date().toISOString();
        DB.ivfRecords.push(data);
        addActivity(`Yeni IVF siklusu: ${getPatientName(patientId)} — ${data.method}`, 'fas fa-baby', 'success');
    }

    saveDB();
    closeModal('ivfModal');
    refreshIVFTable();
    refreshDashboard();
    showToast('IVF kaydı başarıyla kaydedildi', 'success');
}

function deleteIVFRecord(id) {
    if (!confirm('Bu IVF kaydını silmek istediğinize emin misiniz?')) return;
    DB.ivfRecords = DB.ivfRecords.filter(x => x.id !== id);
    saveDB();
    if (window.deleteFromSupabase) window.deleteFromSupabase('ivf_records', id);
    refreshIVFTable();
    refreshDashboard();
    showToast('IVF kaydı silindi', 'warning');
}

function refreshIVFTable() {
    const tbody = document.getElementById('ivfTableBody');
    const filterPatient = document.getElementById('ivfPatientFilter')?.value || '';

    let records = DB.ivfRecords;
    if (filterPatient) records = records.filter(r => r.patientId === filterPatient);

    if (records.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><i class="fas fa-baby"></i><h3>Henüz IVF kaydı yok</h3><p>Yeni siklus kaydı ekleyin</p></div></td></tr>`;
        return;
    }

    tbody.innerHTML = records.map(r => {
        const statusColors = {
            'Devam Ediyor': 'badge-info',
            'Transfer Yapıldı': 'badge-neutral',
            'β-hCG Pozitif': 'badge-success',
            'β-hCG Negatif': 'badge-danger',
            'Klinik Gebelik': 'badge-success',
            'İptal': 'badge-danger',
            'Freeze All': 'badge-warning',
        };
        return `<tr>
            <td><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-white);">${r.id}</span></td>
            <td><strong>${getPatientName(r.patientId)}</strong></td>
            <td>${formatDate(r.startDate)}</td>
            <td>${r.oocyteCount || '-'}</td>
            <td>${r.fertRate ? r.fertRate + '%' : '-'}</td>
            <td>${r.blastCount || r.day3Count || '-'}</td>
            <td>${r.transferCount ? r.transferCount + ' embriyo' : '-'}</td>
            <td><span class="badge ${statusColors[r.status] || 'badge-neutral'}">${r.status}</span></td>
            <td class="action-cell">
                <button class="btn btn-ghost btn-icon" onclick="showIVFDetail('${r.id}')" title="Detay"><i class="fas fa-eye"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="openIVFModal('${r.id}')" title="Düzenle"><i class="fas fa-edit"></i></button>
                <button class="btn btn-ghost btn-icon" onclick="deleteIVFRecord('${r.id}')" title="Sil" style="color:var(--danger)"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>`;
    }).join('');
}

function filterIVFRecords() {
    refreshIVFTable();
}

function showIVFDetail(recordId) {
    const r = DB.ivfRecords.find(x => x.id === recordId);
    if (!r) return;

    const patient = getPatient(r.patientId);

    const content = `
        <div style="margin-bottom:24px;">
            <h3 style="color:var(--text-white);margin-bottom:4px;">${patient ? patient.firstName + ' ' + patient.lastName : 'Bilinmeyen Hasta'}</h3>
            <span style="font-size:13px;color:var(--text-muted);">Siklus: ${r.id} | Başlangıç: ${formatDate(r.startDate)} | Protokol: ${r.protocol} | Yöntem: ${r.method}</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">
            <div class="stat-card" style="padding:16px;">
                <div class="stat-info">
                    <div class="stat-label">Toplanan Oosit</div>
                    <div class="stat-value" style="font-size:22px;">${r.oocyteCount || '-'}</div>
                </div>
            </div>
            <div class="stat-card" style="padding:16px;">
                <div class="stat-info">
                    <div class="stat-label">Matür (MII)</div>
                    <div class="stat-value" style="font-size:22px;">${r.matureOocyte || '-'}</div>
                </div>
            </div>
            <div class="stat-card" style="padding:16px;">
                <div class="stat-info">
                    <div class="stat-label">Fertilize</div>
                    <div class="stat-value" style="font-size:22px;">${r.fertilized || '-'}</div>
                </div>
            </div>
            <div class="stat-card" style="padding:16px;">
                <div class="stat-info">
                    <div class="stat-label">Fertilizasyon</div>
                    <div class="stat-value" style="font-size:22px;color:var(--accent);">${r.fertRate ? r.fertRate + '%' : '-'}</div>
                </div>
            </div>
        </div>

        <div class="section-divider"><span>Embriyo Gelişimi</span></div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
            <div class="embryo-card">
                <div class="embryo-day">Day 3</div>
                <div class="embryo-grade">${r.day3Count || '-'}</div>
                <div class="embryo-detail">embriyo — ${r.day3Grade || '-'}</div>
            </div>
            <div class="embryo-card">
                <div class="embryo-day">Blastosist (D5/6)</div>
                <div class="embryo-grade">${r.blastCount || '-'}</div>
                <div class="embryo-detail">embriyo — ${r.blastGrade || '-'}</div>
            </div>
            <div class="embryo-card" style="border-color:var(--accent-dark);">
                <div class="embryo-day">Transfer</div>
                <div class="embryo-grade">${r.transferCount || '-'}</div>
                <div class="embryo-detail">${r.transferDay || '-'} | ${formatDate(r.transferDate)}</div>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            <div style="background:var(--bg-input);padding:16px;border-radius:var(--radius-sm);">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">Dondurulmuş Embriyo</div>
                <div style="font-size:20px;font-weight:700;color:var(--info);">${r.frozenCount || '0'}</div>
            </div>
            <div style="background:var(--bg-input);padding:16px;border-radius:var(--radius-sm);">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">Durum</div>
                <div style="font-size:16px;font-weight:700;color:var(--accent);">${r.status}</div>
            </div>
        </div>

        ${r.notes ? `<div style="padding:12px;background:var(--bg-input);border-radius:8px;"><span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Notlar:</span><br>${r.notes}</div>` : ''}
    `;

    // Reuse patientDetailModal for IVF detail
    document.getElementById('detailPatientName').textContent = 'IVF Siklus Detayı';
    document.getElementById('patientDetailContent').innerHTML = content;
    openModal('patientDetailModal');
}
