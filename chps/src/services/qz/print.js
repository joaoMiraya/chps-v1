
export function print() {
    /*     const signCertificate = async () => {
            await qz.security.setCertificatePromise(function (resolve, reject) {
                fetch("http://localhost:5173/src/services/qz/digital-certificate.txt", { cache: 'no-store', headers: { 'Content-Type': 'text/plain' } })
                    .then(function (data) { data.ok ? resolve(data.text()) : reject(data.text()); });
            });
            await qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
            await qz.security.setSignaturePromise(function (toSign) {
                return function (resolve, reject) {
                    fetch("http://localhost:5173/sign-message.php" + toSign, { cache: 'no-store', headers: { 'Content-Type': 'text/plain' } })
                        .then(function (data) { data.ok ? resolve(data.text()) : reject(data.text()); });
                };
            });
        }
        signCertificate(); */
    qz.websocket.connect().then(function () {
        return qz.printers.find("HPFDD95B (HP Ink Tank Wireless 410 series)");              // Pass the printer name into the next Promise
    }).then(function (printer) {
        var config = qz.configs.create(printer);       // Create a default config for the found printer
      /*   var data = [
            { 
                type: 'pixel',
                format: 'html',
                flavor: 'plain',
                data: '<h1>CHARLIN CHUPA PIKA</h1>',
             }
        ];   // Raw ZPL
        return qz.print(config, data); */
    }).catch(function (e) { console.error(e); });

};

