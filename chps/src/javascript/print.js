
export function print(order) {

    qz.security.setCertificatePromise(function (resolve, reject) {
        resolve(import.meta.env.VITE_QZ_CERT);
    });

    var privateKey = import.meta.env.VITE_QZ_KEY;

    qz.security.setSignaturePromise(function (toSign) {
        return function (resolve, reject) {
            try {
                var pk = new RSAKey();
                pk.readPrivateKeyFromPEMString(strip(privateKey));
                var hex = pk.signString(toSign, 'sha1');
                console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
                resolve(stob64(hextorstr(hex)));
            } catch (err) {
                console.error(err);
                reject(err);
            }
        };
    });

    function strip(key) {
        if (key.indexOf('-----') !== -1) {
            return key.split('-----')[2].replace(/\r?\n|\r/g, '');
        }
    };



    qz.websocket.connect({ host: "192.168.0.114" }).then(function () {
        return qz.printers.find("HPFDD95B (HP Ink Tank Wireless 410 series)");              // Pass the printer name into the next Promise
    }).then(function (printer) {
        var config = qz.configs.create(printer);       // Create a default config for the found printer
        var data = [
            {
                type: 'pixel',
                format: 'html',
                flavor: 'plain',
                data: `<h1>${order.numero_pedido}</h1>`,
            }
        ];   // Raw ZPL
          return qz.print(config, data); //REMOVER COMENTÁRIO <---
    }).catch(function (e) { console.error(e); }).finally(() => {
        qz.websocket.disconnect();
    });

};

