/* ═══════════════════════════════════════════════════
   LabSync Pro — Reports Module
   ═══════════════════════════════════════════════════ */

function generateReport() {
    const patientId = document.getElementById('reportPatientSelect').value;
    const reportType = document.getElementById('reportTypeSelect').value;

    if (!patientId) {
        showToast('Lütfen hasta seçin', 'error');
        return;
    }
    if (!reportType) {
        showToast('Lütfen rapor tipi seçin', 'error');
        return;
    }

    const patient = getPatient(patientId);
    if (!patient) {
        showToast('Hasta bulunamadı', 'error');
        return;
    }

    const age = patient.birthDate ?
        Math.floor((new Date() - new Date(patient.birthDate)) / (365.25 * 86400000)) : '-';

    let reportBody = '';

    switch (reportType) {
        case 'semen':
            reportBody = generateSemenReport(patientId, patient, age);
            break;
        case 'ivf':
            reportBody = generateIVFReport(patientId, patient, age);
            break;
        case 'labtest':
            reportBody = generateLabTestReport(patientId, patient, age);
            break;
        case 'dnatest':
            reportBody = generateDNATestReport(patientId, patient, age);
            break;
    }

    if (!reportBody) return;

    document.getElementById('reportEmptyState').style.display = 'none';
    document.getElementById('reportContent').style.display = 'block';
    document.getElementById('reportContent').innerHTML = reportBody;
}

function generateReportHeader(patient, age, reportTitle) {
    return `
        <div class="report-preview" id="printableReport">
            <div class="report-header-band">
                <div class="report-logo-area">
                    <img src="assets/biyosera_logo_hz.png" alt="Biyosera" style="height: 48px; object-fit: contain; margin-bottom: 4px;">
                    <p style="font-size: 10px; color: #666; font-weight: 600; text-transform: uppercase; margin:0;">Yaşam Bilimleri Laboratuvarı</p>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:14px;font-weight:700;color:#0A2647;">${reportTitle}</div>
                    <div style="font-size:11px;color:#888;">Tarih: ${new Date().toLocaleDateString('tr-TR')}</div>
                </div>
            </div>

            <div class="report-patient-info">
                <div class="info-item"><span class="info-label">Hasta:</span> ${patient.firstName} ${patient.lastName}</div>
                <div class="info-item"><span class="info-label">ID:</span> ${patient.id}</div>
                <div class="info-item"><span class="info-label">TC:</span> ${patient.tc}</div>
                <div class="info-item"><span class="info-label">Yaş:</span> ${age}</div>
                <div class="info-item"><span class="info-label">Cinsiyet:</span> ${patient.gender}</div>
                <div class="info-item"><span class="info-label">Kan Grubu:</span> ${patient.bloodType || '-'}</div>
            </div>
    `;
}

function generateReportFooter() {
    return `
            <div class="report-footer">
                <div style="font-size:10px;color:#999;">
                    Bu rapor LabSync Pro tarafından ${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.
                </div>
                <div class="report-signature">
                    <div class="line"></div>
                    <div class="name">Prof. Dr. Denizhan Özgün</div>
                    <div class="title-text">Embriyolog</div>
                </div>
            </div>
        </div>
    `;
}

function generateSemenReport(patientId, patient, age) {
    const tests = DB.semenTests.filter(t => t.patientId === patientId);
    if (tests.length === 0) {
        showToast('Bu hastaya ait semen analizi bulunamadı', 'warning');
        return '';
    }

    const t = tests[tests.length - 1]; // Son test

    function flagCell(val, refMin, refMax) {
        const v = parseFloat(val);
        if (isNaN(v)) return '';
        if (refMin !== undefined && v < refMin) return ' class="flag-low"';
        if (refMax !== undefined && v > refMax) return ' class="flag-high"';
        return '';
    }

    return generateReportHeader(patient, age, 'SEMEN ANALİZ RAPORU') + `
            <div style="margin-bottom:12px;">
                <span style="font-size:11px;color:#666;">Test ID: ${t.id} | Tarih: ${formatDate(t.date)} | Perhiz: ${t.abstinence || '-'} gün | Yöntem: ${t.collectionMethod || '-'}</span>
            </div>

            <table class="report-table">
                <thead>
                    <tr>
                        <th>Parametre</th>
                        <th>Sonuç</th>
                        <th>Birim</th>
                        <th>WHO Referans (2021)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colspan="4" style="background:#0A2647;color:white;font-weight:700;font-size:11px;">MAKROSKOPİK İNCELEME</td></tr>
                    <tr><td>Hacim</td><td${flagCell(t.volume, 1.5)}><strong>${t.volume}</strong></td><td>ml</td><td>≥ 1.5 ml</td></tr>
                    <tr><td>Renk</td><td>${t.color || '-'}</td><td>-</td><td>Gri-opak</td></tr>
                    <tr><td>Likefaksiyon</td><td>${t.liquefaction || '-'}</td><td>dk</td><td>≤ 60 dk</td></tr>
                    <tr><td>Viskozite</td><td>${t.viscosity || '-'}</td><td>-</td><td>Normal</td></tr>
                    <tr><td>pH</td><td${flagCell(t.pH, 7.2)}>${t.pH || '-'}</td><td>-</td><td>≥ 7.2</td></tr>

                    <tr><td colspan="4" style="background:#0A2647;color:white;font-weight:700;font-size:11px;">MİKROSKOPİK İNCELEME</td></tr>
                    <tr><td>Konsantrasyon</td><td${flagCell(t.concentration, 15)}><strong>${t.concentration}</strong></td><td>milyon/ml</td><td>≥ 15 milyon/ml</td></tr>
                    <tr><td>Toplam Sperm Sayısı</td><td${flagCell(t.totalCount, 39)}><strong>${t.totalCount || '-'}</strong></td><td>milyon</td><td>≥ 39 milyon</td></tr>
                    <tr><td>Progresif Motilite (PR)</td><td${flagCell(t.progressiveMotility, 32)}><strong>${t.progressiveMotility}</strong></td><td>%</td><td>≥ 32%</td></tr>
                    <tr><td>Toplam Motilite (PR + NP)</td><td${flagCell(t.totalMotility, 40)}>${t.totalMotility || '-'}</td><td>%</td><td>≥ 40%</td></tr>
                    <tr><td>İmmotil</td><td>${t.immotile || '-'}</td><td>%</td><td>-</td></tr>
                    <tr><td>Normal Morfoloji (Kruger)</td><td${flagCell(t.morphology, 4)}><strong>${t.morphology}</strong></td><td>%</td><td>≥ 4%</td></tr>
                    <tr><td>Vitalite</td><td${flagCell(t.vitality, 58)}>${t.vitality || '-'}</td><td>%</td><td>≥ 58%</td></tr>
                    <tr><td>Yuvarlak Hücre</td><td>${t.roundCells || '-'}</td><td>milyon/ml</td><td>-</td></tr>
                    <tr><td>Lökosit (WBC)</td><td${flagCell(t.wbc, undefined, 1)}>${t.wbc || '-'}</td><td>milyon/ml</td><td>< 1 milyon/ml</td></tr>
                </tbody>
            </table>

            <div style="padding:12px;background:#f0f7ff;border:2px solid #0A2647;border-radius:8px;margin-bottom:20px;">
                <strong style="color:#0A2647;">SONUÇ: </strong>
                <span style="font-size:14px;font-weight:700;color:${t.result === 'Normozoospermi' ? '#00C853' : '#FF4757'};">${t.result}</span>
            </div>

            ${t.notes ? `<div style="padding:8px;background:#f9f9f9;border-radius:4px;margin-bottom:20px;font-size:11px;"><strong>Notlar:</strong> ${t.notes}</div>` : ''}
    ` + generateReportFooter();
}

function generateIVFReport(patientId, patient, age) {
    const records = DB.ivfRecords.filter(r => r.patientId === patientId);
    if (records.length === 0) {
        showToast('Bu hastaya ait IVF kaydı bulunamadı', 'warning');
        return '';
    }

    const r = records[records.length - 1];

    return generateReportHeader(patient, age, 'IVF / EMBRİYOLOJİ RAPORU') + `
            <div style="margin-bottom:16px;">
                <span style="font-size:11px;color:#666;">Siklus: ${r.id} | Başlangıç: ${formatDate(r.startDate)} | Protokol: ${r.protocol} | Yöntem: ${r.method}</span>
            </div>

            <table class="report-table">
                <thead><tr><th>Parametre</th><th>Değer</th></tr></thead>
                <tbody>
                    <tr><td colspan="2" style="background:#0A2647;color:white;font-weight:700;font-size:11px;">OOSİT & FERTİLİZASYON</td></tr>
                    <tr><td>Toplanan Oosit</td><td><strong>${r.oocyteCount || '-'}</strong></td></tr>
                    <tr><td>Matür (MII) Oosit</td><td><strong>${r.matureOocyte || '-'}</strong></td></tr>
                    <tr><td>Fertilize Olan (2PN)</td><td><strong>${r.fertilized || '-'}</strong></td></tr>
                    <tr><td>Fertilizasyon Oranı</td><td><strong style="color:#0A2647;">${r.fertRate ? r.fertRate + '%' : '-'}</strong></td></tr>

                    <tr><td colspan="2" style="background:#0A2647;color:white;font-weight:700;font-size:11px;">EMBRİYO GELİŞİMİ</td></tr>
                    <tr><td>Day 3 Embriyo Sayısı</td><td>${r.day3Count || '-'}</td></tr>
                    <tr><td>Day 3 Grade (Best)</td><td>${r.day3Grade || '-'}</td></tr>
                    <tr><td>Blastosist Sayısı (D5/6)</td><td><strong>${r.blastCount || '-'}</strong></td></tr>
                    <tr><td>Blastosist Grade (Best)</td><td><strong>${r.blastGrade || '-'}</strong></td></tr>

                    <tr><td colspan="2" style="background:#0A2647;color:white;font-weight:700;font-size:11px;">TRANSFER & SONUÇ</td></tr>
                    <tr><td>Transfer Tarihi</td><td>${formatDate(r.transferDate)}</td></tr>
                    <tr><td>Transfer Günü</td><td>${r.transferDay || '-'}</td></tr>
                    <tr><td>Transfer Edilen Embriyo</td><td><strong>${r.transferCount || '-'}</strong></td></tr>
                    <tr><td>Dondurulmuş Embriyo</td><td>${r.frozenCount || '0'}</td></tr>
                    <tr><td>Durum</td><td><strong style="color:#0A2647;">${r.status}</strong></td></tr>
                </tbody>
            </table>

            ${r.notes ? `<div style="padding:8px;background:#f9f9f9;border-radius:4px;margin-bottom:20px;font-size:11px;"><strong>Notlar:</strong> ${r.notes}</div>` : ''}
    ` + generateReportFooter();
}

function generateLabTestReport(patientId, patient, age) {
    const tests = DB.labTests.filter(t => t.patientId === patientId);
    if (tests.length === 0) {
        showToast('Bu hastaya ait lab testi bulunamadı', 'warning');
        return '';
    }

    const t = tests[tests.length - 1];

    return generateReportHeader(patient, age, `LAB TEST RAPORU — ${t.testType.toUpperCase()}`) + `
            <div style="margin-bottom:16px;">
                <span style="font-size:11px;color:#666;">Test: ${t.id} | Tip: ${t.testType} | Tarih: ${formatDate(t.date)}</span>
            </div>

            <table class="report-table">
                <thead>
                    <tr>
                        <th>Parametre</th>
                        <th>Sonuç</th>
                        <th>Birim</th>
                        <th>Referans Aralığı</th>
                        <th>Durum</th>
                    </tr>
                </thead>
                <tbody>
                    ${(t.parameters || []).map(p => {
        const flagClass = p.flag === 'Yüksek' ? 'flag-high' :
            p.flag === 'Düşük' ? 'flag-low' :
                p.flag === 'Anormal' ? 'flag-high' : '';
        return `<tr>
                            <td>${p.name}</td>
                            <td ${flagClass ? `class="${flagClass}"` : ''}><strong>${p.value || '-'}</strong></td>
                            <td>${p.unit}</td>
                            <td>${p.type === 'qualitative' ? 'Negatif' :
                (p.refMin !== undefined ? p.refMin : '') +
                (p.refMin !== undefined && p.refMax !== undefined ? ' - ' : '') +
                (p.refMax !== undefined ? p.refMax : '') +
                ' ' + p.unit}</td>
                            <td ${flagClass ? `class="${flagClass}"` : ''}>${p.flag === 'Yüksek' ? '↑ Yüksek' : p.flag === 'Düşük' ? '↓ Düşük' : p.flag === 'Anormal' ? '⚠ Anormal' : '✓ Normal'}</td>
                        </tr>`;
    }).join('')}
                </tbody>
            </table>
    ` + generateReportFooter();
}


function printReport() {
    const reportEl = document.getElementById('printableReport');
    if (!reportEl) {
        showToast('Önce rapor oluşturun', 'error');
        return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>LabSync Pro — Rapor</title>
            <style>
                @page { size: A4; margin: 15mm; }
                * { box-sizing: border-box; }
                body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; color: #1a1a1a; }
                .report-preview { max-width: 100%; margin: 0; padding: 0; font-size: 12px; line-height: 1.6; }
                .report-header-band { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #0A2647; padding-bottom: 16px; margin-bottom: 24px; }
                .report-logo-area h1 { color: #0A2647; font-size: 22px; font-weight: 800; margin: 0; }
                .report-logo-area p { color: #555; font-size: 11px; margin: 4px 0 0; }
                .report-patient-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 20px; padding: 12px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e0e0; }
                .info-item { font-size: 11px; }
                .info-label { font-weight: 700; color: #0A2647; }
                .report-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; page-break-inside: auto; }
                .report-table th { background: #0A2647; color: white; padding: 8px 12px; font-size: 11px; text-align: left; }
                .report-table td { padding: 7px 12px; border-bottom: 1px solid #e0e0e0; font-size: 11px; }
                .report-table tr { page-break-inside: avoid; }
                .report-table tr:nth-child(even) td { background: #f8f9fa; }
                .flag-high { color: #FF4757; font-weight: 700; }
                .flag-low { color: #2196F3; font-weight: 700; }
                .report-footer { margin-top: 40px; padding-top: 16px; border-top: 2px solid #0A2647; display: flex; justify-content: space-between; align-items: flex-end; }
                .report-signature { text-align: center; }
                .report-signature .line { width: 180px; border-top: 1px solid #333; margin-bottom: 4px; }
                .report-signature .name { font-weight: 700; color: #0A2647; font-size: 12px; }
                .report-signature .title-text { font-size: 10px; color: #666; }
                @media print {
                    body { padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .report-preview { box-shadow: none; }
                }
            </style>
        </head>
        <body>
            ${reportEl.outerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
}
