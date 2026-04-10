/* ═══════════════════════════════════════════════════
   LabSync Pro — QR Code Handler Module
   ═══════════════════════════════════════════════════ */

let qrCodeInstance = null;

function generatePatientQR() {
    const patientId = document.getElementById('qrPatientSelect').value;
    if (!patientId) {
        document.getElementById('qrCodeDisplay').style.display = 'none';
        return;
    }

    const patient = getPatient(patientId);
    if (!patient) return;

    const display = document.getElementById('qrCodeDisplay');
    display.style.display = 'flex';

    const canvas = document.getElementById('qrCodeCanvas');

    // QR data: URL that links directly to the patient on the portal
    const portalObj = new URL('patient-portal.html', window.location.href);
    portalObj.hash = 'patient=' + encodeURIComponent(patient.id);
    const portalURL = portalObj.href;

    if (qrCodeInstance) {
        qrCodeInstance.clear();
        qrCodeInstance.makeCode(portalURL);
    } else {
        qrCodeInstance = new QRCode(canvas, {
            text: portalURL,
            width: 200,
            height: 200,
            colorDark: "#0A2647",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
    }
}

function printQRCode() {
    const patientId = document.getElementById('qrPatientSelect').value;
    const patient = getPatient(patientId);
    if (!patient) return;

    const qrCanvas = document.querySelector('#qrCodeCanvas img') ||
        document.querySelector('#qrCodeCanvas canvas');
    if (!qrCanvas) return;

    let imgSrc = '';
    if (qrCanvas.tagName === 'IMG') {
        imgSrc = qrCanvas.src;
    } else {
        imgSrc = qrCanvas.toDataURL('image/png');
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>QR Kod — ${patient.firstName} ${patient.lastName}</title>
            <style>
                body { font-family: 'Inter', Arial, sans-serif; text-align: center; padding: 40px; background: #f8f9fa; }
                .qr-print-card { display: inline-block; border: 2px solid #0A2647; border-radius: 16px; padding: 36px 32px; max-width: 320px; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
                .logo-area { margin-bottom: 20px; }
                .logo-area h2 { color: #0A2647; font-size: 18px; margin: 0 0 2px; font-weight: 800; }
                .logo-area .sub { color: #00D4AA; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
                .divider { height: 1px; background: #eee; margin: 16px 0; }
                .qr-img { border: 2px solid #f0f0f0; border-radius: 12px; padding: 8px; display: inline-block; background: white; }
                .patient-name { font-size: 20px; font-weight: 800; color: #0A2647; margin-top: 20px; }
                .patient-id { color: #999; font-size: 12px; margin-top: 4px; font-family: 'Courier New', monospace; }
                .scan-text { margin-top: 20px; padding: 12px; background: #f0f7f5; border-radius: 8px; font-size: 11px; color: #555; line-height: 1.6; }
                .scan-text strong { color: #0A2647; }
                .footer-text { margin-top: 16px; font-size: 9px; color: #bbb; }
                @media print { body { padding: 0; background: white; } .qr-print-card { box-shadow: none; } }
            </style>
        </head>
        <body>
            <div class="qr-print-card">
                <div class="logo-area">
                    <h2>LabSync Pro</h2>
                    <div class="sub">Biyosera Medical</div>
                </div>
                <div class="divider"></div>
                <div class="qr-img">
                    <img src="${imgSrc}" width="180" height="180">
                </div>
                <div class="patient-name">${patient.firstName} ${patient.lastName}</div>
                <div class="patient-id">${patient.id}</div>
                <div class="scan-text">
                    <strong>📱 Telefonunuzla bu QR kodu taratın</strong><br>
                    Test sonuçlarınızı anında görüntüleyin.
                </div>
                <div class="footer-text">Prof. Dr. Denizhan Özgün — Laboratuvar</div>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
}


// ─── QR Scanner ───
let html5QrScanner = null;

function startQRScanner() {
    const readerEl = document.getElementById('qr-reader');
    const startBtn = document.getElementById('startScannerBtn');

    // Load html5-qrcode dynamically
    if (typeof Html5Qrcode === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';
        script.onload = () => initScanner();
        document.head.appendChild(script);
    } else {
        initScanner();
    }

    function initScanner() {
        readerEl.style.display = 'block';
        startBtn.style.display = 'none';

        html5QrScanner = new Html5Qrcode('qr-reader');
        html5QrScanner.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
                onQRScanned(decodedText);
            },
            (errorMessage) => {
                // Scanning errors (no QR found) are ignored
            }
        ).catch(err => {
            console.error('QR scanner error:', err);
            showToast('Kamera erişimi sağlanamadı. Lütfen kamera izni verin.', 'error');
            readerEl.style.display = 'none';
            startBtn.style.display = 'block';
        });
    }
}

function stopQRScanner() {
    if (html5QrScanner) {
        html5QrScanner.stop().then(() => {
            document.getElementById('qr-reader').style.display = 'none';
            document.getElementById('startScannerBtn').style.display = 'block';
            html5QrScanner = null;
        }).catch(err => console.error('Stop error:', err));
    }
}

function onQRScanned(decodedText) {
    stopQRScanner();

    try {
        const data = JSON.parse(decodedText);
        if (data.type === 'labsync_patient' && data.id) {
            const patient = getPatient(data.id);
            if (patient) {
                document.getElementById('qrScanResult').style.display = 'block';
                document.getElementById('qrResultText').textContent =
                    `Hasta bulundu: ${patient.firstName} ${patient.lastName} (${patient.id})`;

                showToast(`${patient.firstName} ${patient.lastName} tanındı`, 'success');

                // Show patient detail after a brief delay
                setTimeout(() => showPatientDetail(data.id), 800);
            } else {
                showToast('Bu QR koda ait hasta bulunamadı', 'warning');
            }
        } else {
            showToast('Geçersiz QR kod formatı', 'error');
        }
    } catch (e) {
        showToast('QR kod okunamadı: ' + decodedText.substring(0, 50), 'error');
    }
}
