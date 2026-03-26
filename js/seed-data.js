/* ═══════════════════════════════════════════════════
   LabSync Pro — Seed Data (7 Hasta + Testler)
   Sayfa yüklenince localStorage'a yazar, sonra kendini devre dışı bırakır
   ═══════════════════════════════════════════════════ */

(function seedData() {
    // Zaten seed yapılmışsa tekrar yapma
    if (localStorage.getItem('labsync_seeded') === 'true') return;

    const patients = [
        { id: 'P-240301', firstName: 'Ahmet', lastName: 'Yilmaz', tc: '10234567890', birthDate: '1988-05-14', gender: 'Erkek', phone: '+90 532 111 2233', email: 'ahmet.yilmaz@email.com', bloodType: 'A Rh+', notes: 'Oligozoospermi takibi', createdAt: '2026-03-01T09:00:00Z' },
        { id: 'P-240302', firstName: 'Mehmet', lastName: 'Kaya', tc: '20345678901', birthDate: '1992-11-22', gender: 'Erkek', phone: '+90 535 222 3344', email: 'mehmet.kaya@email.com', bloodType: 'O Rh+', notes: 'IVF adayi', createdAt: '2026-03-02T10:30:00Z' },
        { id: 'P-240303', firstName: 'Fatma', lastName: 'Demir', tc: '30456789012', birthDate: '1995-03-08', gender: 'Kadin', phone: '+90 541 333 4455', email: 'fatma.demir@email.com', bloodType: 'B Rh+', notes: 'IVF siklusu baslatildi, AMH dusuk', createdAt: '2026-03-03T08:15:00Z' },
        { id: 'P-240304', firstName: 'Ali', lastName: 'Ozturk', tc: '40567890123', birthDate: '1985-07-30', gender: 'Erkek', phone: '+90 544 444 5566', email: 'ali.ozturk@email.com', bloodType: 'AB Rh-', notes: 'Azoospermi suphesi, genetik test onerildi', createdAt: '2026-03-05T11:00:00Z' },
        { id: 'P-240305', firstName: 'Zeynep', lastName: 'Arslan', tc: '50678901234', birthDate: '1990-12-17', gender: 'Kadin', phone: '+90 546 555 6677', email: 'zeynep.arslan@email.com', bloodType: 'A Rh-', notes: 'Trombofili paneli sonuclari bekleniyor', createdAt: '2026-03-06T14:20:00Z' },
        { id: 'P-240306', firstName: 'Mustafa', lastName: 'Celik', tc: '60789012345', birthDate: '1983-09-05', gender: 'Erkek', phone: '+90 533 666 7788', email: 'mustafa.celik@email.com', bloodType: 'O Rh-', notes: 'Normozoospermi, kontrol amacli', createdAt: '2026-03-08T09:45:00Z' },
        { id: 'P-240307', firstName: 'Elif', lastName: 'Sahin', tc: '70890123456', birthDate: '1993-01-25', gender: 'Kadin', phone: '+90 542 777 8899', email: 'elif.sahin@email.com', bloodType: 'B Rh-', notes: 'PGT-A planlanan hasta', createdAt: '2026-03-10T13:00:00Z' }
    ];

    const semenTests = [
        { id: 'SA-240301', patientId: 'P-240301', date: '2026-03-05', abstinence: '4', collectionMethod: 'Masturbasyon', volume: '2.8', color: 'Gri-opak', liquefaction: '25', viscosity: 'Normal', pH: '7.4', concentration: '8', totalCount: '22', progressiveMotility: '28', nonProgressiveMotility: '12', immotile: '60', totalMotility: '40', morphology: '3', vitality: '52', roundCells: '0.5', wbc: '0.3', notes: 'Oligozoospermi saptandi', result: 'Oligozoospermi', createdAt: '2026-03-05T10:00:00Z' },
        { id: 'SA-240302', patientId: 'P-240302', date: '2026-03-08', abstinence: '3', collectionMethod: 'Masturbasyon', volume: '3.2', color: 'Gri-opak', liquefaction: '20', viscosity: 'Normal', pH: '7.6', concentration: '45', totalCount: '144', progressiveMotility: '42', nonProgressiveMotility: '15', immotile: '43', totalMotility: '57', morphology: '6', vitality: '68', roundCells: '0.2', wbc: '0.1', notes: 'Normal degerler, IVF oncesi kontrol', result: 'Normozoospermi', createdAt: '2026-03-08T11:00:00Z' },
        { id: 'SA-240303', patientId: 'P-240304', date: '2026-03-10', abstinence: '5', collectionMethod: 'Masturbasyon', volume: '1.2', color: 'Gri-opak', liquefaction: '30', viscosity: 'Artmis', pH: '7.8', concentration: '0', totalCount: '0', progressiveMotility: '0', nonProgressiveMotility: '0', immotile: '0', totalMotility: '0', morphology: '0', vitality: '0', roundCells: '0.8', wbc: '0.5', notes: 'Azoospermi - genetik degerlendirme gerekli', result: 'Azoospermi', createdAt: '2026-03-10T09:30:00Z' },
        { id: 'SA-240304', patientId: 'P-240306', date: '2026-03-12', abstinence: '3', collectionMethod: 'Masturbasyon', volume: '3.5', color: 'Gri-opak', liquefaction: '18', viscosity: 'Normal', pH: '7.5', concentration: '62', totalCount: '217', progressiveMotility: '55', nonProgressiveMotility: '10', immotile: '35', totalMotility: '65', morphology: '8', vitality: '78', roundCells: '0.1', wbc: '0.2', notes: 'Tum parametreler normal sinirlarda', result: 'Normozoospermi', createdAt: '2026-03-12T10:15:00Z' },
        { id: 'SA-240305', patientId: 'P-240301', date: '2026-03-20', abstinence: '4', collectionMethod: 'Masturbasyon', volume: '2.5', color: 'Gri-opak', liquefaction: '22', viscosity: 'Normal', pH: '7.3', concentration: '12', totalCount: '30', progressiveMotility: '25', nonProgressiveMotility: '10', immotile: '65', totalMotility: '35', morphology: '2', vitality: '48', roundCells: '0.6', wbc: '0.4', notes: 'OAT - ICSI onerisi', result: 'Oligoastenoteratozoospermi (OAT)', createdAt: '2026-03-20T10:00:00Z' }
    ];

    const ivfRecords = [
        { id: 'IVF-240301', patientId: 'P-240303', startDate: '2026-03-10', protocol: 'Antagonist', method: 'ICSI', oocyteCount: '12', matureOocyte: '9', fertilized: '7', fertRate: '78', day3Count: '6', day3Grade: 'Grade A/B', blastCount: '4', blastGrade: '4AA, 4AB, 3BB, 3BC', transferDate: '2026-03-15', transferDay: 'Day 5', transferCount: '2', frozenCount: '2', status: 'Transfer Yapildi', notes: 'Iyi kalite embriyo transferi yapildi', createdAt: '2026-03-10T08:00:00Z' },
        { id: 'IVF-240302', patientId: 'P-240307', startDate: '2026-03-15', protocol: 'Agonist (Uzun)', method: 'ICSI', oocyteCount: '18', matureOocyte: '14', fertilized: '11', fertRate: '79', day3Count: '10', day3Grade: 'Grade A', blastCount: '7', blastGrade: '5AA, 4AA, 4AB, 4AB, 3BB, 3BB, 3BC', transferDate: '', transferDay: '', transferCount: '0', frozenCount: '7', status: 'Freeze All', notes: 'PGT-A icin tum blastosistler donduruldu', createdAt: '2026-03-15T08:00:00Z' }
    ];

    const labTests = [
        { id: 'LT-240301', patientId: 'P-240303', date: '2026-03-04', testType: 'Hormon', status: 'Sonuclandi', parameters: [
            { name: 'FSH', value: '9.2', unit: 'mIU/mL', refMin: 1.5, refMax: 12.4, flag: 'Normal', type: 'quantitative' },
            { name: 'LH', value: '6.8', unit: 'mIU/mL', refMin: 1.7, refMax: 8.6, flag: 'Normal', type: 'quantitative' },
            { name: 'Estradiol (E2)', value: '42', unit: 'pg/mL', refMin: 12, refMax: 166, flag: 'Normal', type: 'quantitative' },
            { name: 'Progesteron', value: '0.8', unit: 'ng/mL', refMin: 0.2, refMax: 1.4, flag: 'Normal', type: 'quantitative' },
            { name: 'AMH', value: '0.8', unit: 'ng/mL', refMin: 1.0, refMax: 10.0, flag: 'Dusuk', type: 'quantitative' },
            { name: 'TSH', value: '2.1', unit: 'uIU/mL', refMin: 0.27, refMax: 4.2, flag: 'Normal', type: 'quantitative' },
            { name: 'Prolaktin', value: '14.5', unit: 'ng/mL', refMin: 4.0, refMax: 23.0, flag: 'Normal', type: 'quantitative' },
            { name: 'Testosteron', value: '', unit: 'ng/dL', refMin: 264, refMax: 916, flag: '', type: 'quantitative' },
            { name: 'DHEA-S', value: '220', unit: 'ug/dL', refMin: 35, refMax: 430, flag: 'Normal', type: 'quantitative' },
            { name: 'Serbest T4', value: '1.12', unit: 'ng/dL', refMin: 0.82, refMax: 1.77, flag: 'Normal', type: 'quantitative' }
        ], flagCount: 1, parameterCount: 10, createdAt: '2026-03-04T09:00:00Z' },
        { id: 'LT-240302', patientId: 'P-240302', date: '2026-03-06', testType: 'Bulasici', status: 'Sonuclandi', parameters: [
            { name: 'HBsAg', value: 'Negatif', unit: '', flag: 'Normal', type: 'qualitative' },
            { name: 'Anti-HBs', value: '125', unit: 'mIU/mL', refMin: 10, flag: 'Normal', type: 'quantitative' },
            { name: 'Anti-HCV', value: 'Negatif', unit: '', flag: 'Normal', type: 'qualitative' },
            { name: 'HIV 1/2', value: 'Negatif', unit: '', flag: 'Normal', type: 'qualitative' },
            { name: 'VDRL/RPR', value: 'Non-reaktif', unit: '', flag: 'Normal', type: 'qualitative' },
            { name: 'CMV IgG', value: 'Pozitif', unit: '', flag: 'Normal', type: 'qualitative' },
            { name: 'CMV IgM', value: 'Negatif', unit: '', flag: 'Normal', type: 'qualitative' },
            { name: 'Rubella IgG', value: 'Pozitif', unit: '', flag: 'Normal', type: 'qualitative' },
            { name: 'Toxoplasma IgG', value: 'Negatif', unit: '', flag: 'Normal', type: 'qualitative' },
            { name: 'Toxoplasma IgM', value: 'Negatif', unit: '', flag: 'Normal', type: 'qualitative' }
        ], flagCount: 0, parameterCount: 10, createdAt: '2026-03-06T10:00:00Z' },
        { id: 'LT-240303', patientId: 'P-240305', date: '2026-03-08', testType: 'Hemogram', status: 'Sonuclandi', parameters: [
            { name: 'WBC', value: '7.2', unit: '10^3/uL', refMin: 4.5, refMax: 11.0, flag: 'Normal', type: 'quantitative' },
            { name: 'RBC', value: '4.1', unit: '10^6/uL', refMin: 4.5, refMax: 5.5, flag: 'Dusuk', type: 'quantitative' },
            { name: 'Hemoglobin', value: '11.2', unit: 'g/dL', refMin: 12.0, refMax: 17.5, flag: 'Dusuk', type: 'quantitative' },
            { name: 'Hematokrit', value: '34', unit: '%', refMin: 36, refMax: 50, flag: 'Dusuk', type: 'quantitative' },
            { name: 'MCV', value: '82', unit: 'fL', refMin: 80, refMax: 100, flag: 'Normal', type: 'quantitative' },
            { name: 'MCH', value: '27.3', unit: 'pg', refMin: 27, refMax: 33, flag: 'Normal', type: 'quantitative' },
            { name: 'MCHC', value: '33', unit: 'g/dL', refMin: 32, refMax: 36, flag: 'Normal', type: 'quantitative' },
            { name: 'Trombosit', value: '285', unit: '10^3/uL', refMin: 150, refMax: 400, flag: 'Normal', type: 'quantitative' },
            { name: 'Notrofil', value: '58', unit: '%', refMin: 40, refMax: 70, flag: 'Normal', type: 'quantitative' },
            { name: 'Lenfosit', value: '32', unit: '%', refMin: 20, refMax: 40, flag: 'Normal', type: 'quantitative' }
        ], flagCount: 3, parameterCount: 10, createdAt: '2026-03-08T11:00:00Z' },
        { id: 'LT-240304', patientId: 'P-240301', date: '2026-03-07', testType: 'Hormon', status: 'Sonuclandi', parameters: [
            { name: 'FSH', value: '5.8', unit: 'mIU/mL', refMin: 1.5, refMax: 12.4, flag: 'Normal', type: 'quantitative' },
            { name: 'LH', value: '4.2', unit: 'mIU/mL', refMin: 1.7, refMax: 8.6, flag: 'Normal', type: 'quantitative' },
            { name: 'Estradiol (E2)', value: '', unit: 'pg/mL', refMin: 12, refMax: 166, flag: '', type: 'quantitative' },
            { name: 'Progesteron', value: '', unit: 'ng/mL', refMin: 0.2, refMax: 1.4, flag: '', type: 'quantitative' },
            { name: 'AMH', value: '', unit: 'ng/mL', refMin: 1.0, refMax: 10.0, flag: '', type: 'quantitative' },
            { name: 'TSH', value: '3.1', unit: 'uIU/mL', refMin: 0.27, refMax: 4.2, flag: 'Normal', type: 'quantitative' },
            { name: 'Prolaktin', value: '18.2', unit: 'ng/mL', refMin: 4.0, refMax: 23.0, flag: 'Normal', type: 'quantitative' },
            { name: 'Testosteron', value: '320', unit: 'ng/dL', refMin: 264, refMax: 916, flag: 'Normal', type: 'quantitative' },
            { name: 'DHEA-S', value: '310', unit: 'ug/dL', refMin: 35, refMax: 430, flag: 'Normal', type: 'quantitative' },
            { name: 'Serbest T4', value: '1.05', unit: 'ng/dL', refMin: 0.82, refMax: 1.77, flag: 'Normal', type: 'quantitative' }
        ], flagCount: 0, parameterCount: 10, createdAt: '2026-03-07T09:30:00Z' }
    ];

    const dnaTests = [
        { id: 'DNA-240301', patientId: 'P-240304', date: '2026-03-12', testType: 'Karyotip', testLabel: 'Karyotip Analizi', lab: 'Gentest Laboratuvari', sampleType: 'Kan (EDTA)', parameters: [
            { name: 'Karyotip Sonucu', value: '47,XXY', unit: '', type: 'text', flag: 'Anormal' },
            { name: 'Sayisal Anomali', value: 'Var', unit: '', type: 'qualitative', flag: 'Anormal' },
            { name: 'Yapisal Anomali', value: 'Yok', unit: '', type: 'qualitative', flag: 'Normal' },
            { name: 'Mozaiklik', value: 'Yok', unit: '', type: 'qualitative', flag: 'Normal' },
            { name: 'Analiz Edilen Hucre Sayisi', value: '30', unit: 'hucre', type: 'number', flag: 'Normal' },
            { name: 'Bant Rezolüsyonu', value: '450-550 bant', unit: '', type: 'text', flag: 'Normal' }
        ], abnormalCount: 2, parameterCount: 6, overallResult: 'Anormal Bulgu', notes: 'Klinefelter Sendromu (47,XXY). Mikro-TESE onerisi.', createdAt: '2026-03-12T14:00:00Z' },
        { id: 'DNA-240302', patientId: 'P-240305', date: '2026-03-14', testType: 'Trombofili Paneli', testLabel: 'Trombofili Genetik Panel', lab: 'Gentest Laboratuvari', sampleType: 'Kan (EDTA)', parameters: [
            { name: 'Faktor V Leiden (G1691A)', value: 'Heterozigot (GA)', unit: '', type: 'qualitative', flag: 'Anormal' },
            { name: 'Protrombin (G20210A)', value: 'Normal (GG)', unit: '', type: 'qualitative', flag: 'Normal' },
            { name: 'MTHFR C677T', value: 'Homozigot (TT)', unit: '', type: 'qualitative', flag: 'Anormal' },
            { name: 'MTHFR A1298C', value: 'Normal (AA)', unit: '', type: 'qualitative', flag: 'Normal' },
            { name: 'PAI-1 4G/5G', value: 'Heterozigot (4G/5G)', unit: '', type: 'qualitative', flag: 'Anormal' },
            { name: 'Faktor XIII (V34L)', value: 'Normal', unit: '', type: 'qualitative', flag: 'Normal' },
            { name: 'Risk Degerlendirmesi', value: 'Yuksek Risk', unit: '', type: 'qualitative', flag: 'Anormal' }
        ], abnormalCount: 4, parameterCount: 7, overallResult: 'Anormal Bulgu', notes: 'Yuksek trombofili riski. Antikoagulan tedavi gerekli.', createdAt: '2026-03-14T15:00:00Z' },
        { id: 'DNA-240303', patientId: 'P-240307', date: '2026-03-20', testType: 'PGT-A', testLabel: 'PGT-A (Anöploidi Taramasi)', lab: 'Igenomix', sampleType: 'Embriyo Biyopsisi', parameters: [
            { name: 'Embriyo Numarasi', value: 'E1-E7', unit: '', type: 'text', flag: 'Normal' },
            { name: 'Biyopsi Gunu', value: 'Day 5', unit: '', type: 'qualitative', flag: 'Normal' },
            { name: 'Sonuc', value: 'Mozaik', unit: '', type: 'qualitative', flag: 'Anormal' },
            { name: 'Anomali Detayi', value: 'E3: Trizomi 16, E5: Monozomi 22, E7: Mozaik Trizomi 8', unit: '', type: 'text', flag: 'Anormal' },
            { name: 'Platform', value: 'NGS', unit: '', type: 'qualitative', flag: 'Normal' },
            { name: 'Transfer Uygunlugu', value: 'Kosullu Uygun', unit: '', type: 'qualitative', flag: 'Anormal' }
        ], abnormalCount: 3, parameterCount: 6, overallResult: 'Anormal Bulgu', notes: '4/7 oploidi, 2 anoploidi, 1 mozaik. Transfer icin E1 ve E2 onerilir.', createdAt: '2026-03-20T16:00:00Z' }
    ];

    const activities = [
        { text: 'Yeni hasta: Ahmet Yilmaz (P-240301)', icon: 'fas fa-user-plus', type: 'success', time: '2026-03-01T09:00:00Z' },
        { text: 'Yeni hasta: Mehmet Kaya (P-240302)', icon: 'fas fa-user-plus', type: 'success', time: '2026-03-02T10:30:00Z' },
        { text: 'Yeni hasta: Fatma Demir (P-240303)', icon: 'fas fa-user-plus', type: 'success', time: '2026-03-03T08:15:00Z' },
        { text: 'Semen analizi: Ahmet Yilmaz - Oligozoospermi', icon: 'fas fa-vial', type: 'warning', time: '2026-03-05T10:00:00Z' },
        { text: 'Yeni hasta: Ali Ozturk (P-240304)', icon: 'fas fa-user-plus', type: 'success', time: '2026-03-05T11:00:00Z' },
        { text: 'Yeni hasta: Zeynep Arslan (P-240305)', icon: 'fas fa-user-plus', type: 'success', time: '2026-03-06T14:20:00Z' },
        { text: 'Lab testi: Mehmet Kaya - Bulasici (Normal)', icon: 'fas fa-flask', type: 'success', time: '2026-03-06T10:00:00Z' },
        { text: 'Hormon paneli: Ahmet Yilmaz - Normal', icon: 'fas fa-flask', type: 'success', time: '2026-03-07T09:30:00Z' },
        { text: 'Semen analizi: Mehmet Kaya - Normozoospermi', icon: 'fas fa-vial', type: 'success', time: '2026-03-08T11:00:00Z' },
        { text: 'Yeni hasta: Mustafa Celik (P-240306)', icon: 'fas fa-user-plus', type: 'success', time: '2026-03-08T09:45:00Z' },
        { text: 'Hemogram: Zeynep Arslan - 3 anormal', icon: 'fas fa-flask', type: 'warning', time: '2026-03-08T11:00:00Z' },
        { text: 'IVF: Fatma Demir - ICSI basladi', icon: 'fas fa-baby', type: 'success', time: '2026-03-10T08:00:00Z' },
        { text: 'Semen: Ali Ozturk - Azoospermi', icon: 'fas fa-vial', type: 'warning', time: '2026-03-10T09:30:00Z' },
        { text: 'Yeni hasta: Elif Sahin (P-240307)', icon: 'fas fa-user-plus', type: 'success', time: '2026-03-10T13:00:00Z' },
        { text: 'DNA: Ali Ozturk - Klinefelter (47,XXY)', icon: 'fas fa-dna', type: 'warning', time: '2026-03-12T14:00:00Z' },
        { text: 'Semen: Mustafa Celik - Normozoospermi', icon: 'fas fa-vial', type: 'success', time: '2026-03-12T10:15:00Z' },
        { text: 'DNA: Zeynep Arslan - Trombofili Yuksek Risk', icon: 'fas fa-dna', type: 'warning', time: '2026-03-14T15:00:00Z' },
        { text: 'IVF: Fatma Demir - Transfer (2 embriyo)', icon: 'fas fa-baby', type: 'success', time: '2026-03-15T08:00:00Z' },
        { text: 'IVF: Elif Sahin - Freeze All (7 blastosist)', icon: 'fas fa-baby', type: 'info', time: '2026-03-15T08:00:00Z' },
        { text: 'Semen: Ahmet Yilmaz - OAT, ICSI onerisi', icon: 'fas fa-vial', type: 'warning', time: '2026-03-20T10:00:00Z' },
        { text: 'PGT-A: Elif Sahin - 4/7 oploidi', icon: 'fas fa-dna', type: 'info', time: '2026-03-20T16:00:00Z' }
    ];

    // Write to localStorage with correct keys
    localStorage.setItem('labsync_patients', JSON.stringify(patients));
    localStorage.setItem('labsync_semen', JSON.stringify(semenTests));
    localStorage.setItem('labsync_ivf', JSON.stringify(ivfRecords));
    localStorage.setItem('labsync_labtests', JSON.stringify(labTests));
    localStorage.setItem('labsync_dnatests', JSON.stringify(dnaTests));
    localStorage.setItem('labsync_activities', JSON.stringify(activities));
    localStorage.setItem('labsync_seeded', 'true');

    console.log('[SEED] 7 hasta, 5 semen, 2 IVF, 4 lab, 3 DNA testi yuklendi!');

    // Reload to pick up data
    window.location.reload();
})();
