function generateQRCode() {
    var inputText = document.getElementById("text-input").value;
    var qrcodeContainer = document.getElementById("qrcode");
    var notification = document.querySelector('.notification');
    var downloadBtn = document.getElementById("download-btn");

    // Clear any existing QR code
    qrcodeContainer.innerHTML = "";
    downloadBtn.style.display = "none"; // Hide download button when regenerating

    if (inputText.trim()) {
        // Generate new QR code
        var qrCode = new QRCode(qrcodeContainer, {
            text: inputText,
            width: 128,
            height: 128
        });

        // Show QR code with fade-in and grow effect
        qrcodeContainer.classList.remove('qrcode-container'); // reset animation
        void qrcodeContainer.offsetWidth; // reflow to restart animation
        qrcodeContainer.classList.add('qrcode-container'); // apply animation

        // Show notification like an iPhone alert
        notification.style.display = 'flex';
        notification.style.animation = 'slideDown 0.5s ease forwards';

        // Hide the notification after 3 seconds
        setTimeout(function() {
            notification.style.display = 'none';
        }, 3000);

        // Show download button after QR code is generated
        setTimeout(function() {
            downloadBtn.style.display = "block";
        }, 500);
    } else {
        alert("Please enter some text to generate a QR code.");
    }
}

// function downloadQRCode() {
//     var qrCodeCanvas = document.querySelector('#qrcode canvas');
//     if (qrCodeCanvas) {
//         var image = qrCodeCanvas.toDataURL("image/png");
//         var downloadLink = document.createElement('a');
//         downloadLink.href = image;
//         downloadLink.download = 'qr-code.png';
//         downloadLink.click();
//     } else {
//         alert("QR code is not available to download.");
//     }
// }


function downloadQRCode() {
    var qrCodeCanvas = document.querySelector('#qrcode canvas');
    if (qrCodeCanvas) {
        // Create a new canvas for the QR code with a white border
        var borderSize = 10; // Set the border size
        var borderedCanvas = document.createElement('canvas');
        borderedCanvas.width = qrCodeCanvas.width + borderSize * 2; // Add border to width
        borderedCanvas.height = qrCodeCanvas.height + borderSize * 2; // Add border to height

        var ctx = borderedCanvas.getContext('2d');

        // Fill the background with white
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, borderedCanvas.width, borderedCanvas.height);

        // Draw the QR code on top of the white background
        ctx.drawImage(qrCodeCanvas, borderSize, borderSize); // Draw QR code with border

        // Convert the bordered canvas to a data URL and create a download link
        var image = borderedCanvas.toDataURL("image/png");
        var downloadLink = document.createElement('a');
        downloadLink.href = image;
        downloadLink.download = 'QR-code.png'; // Change the file name
        downloadLink.click();
    } else {
        alert("QR code is not available to download.");
    }
}