
export function print() {
  
    qz.security.setCertificatePromise(function (resolve, reject) {
        resolve("-----BEGIN CERTIFICATE-----\n" +
            "MIIERTCCAy2gAwIBAgIUW8rcQa4DjaUdU/6GxqTRKFhKfjgwDQYJKoZIhvcNAQEL\n" +
            "BQAwgbAxCzAJBgNVBAYTAkJSMRIwEAYDVQQIDAlTQU8gUEFVTE8xHDAaBgNVBAcM\n" +
            "E1BSRVNJREVOVEUgUFJVREVOVEUxFzAVBgNVBAoMDkNIQVBBUy1MQU5DSEVTMQ0w\n" +
            "CwYDVQQLDARGT09EMSAwHgYDVQQDDBcqLmNoYXBhcy1sYW5jaGVzLmNvbS5icjEl\n" +
            "MCMGCSqGSIb3DQEJARYWam9hb21pcmF5YTAxQGdtYWlsLmNvbTAgFw0yMzA5MjMy\n" +
            "MDMwNTRaGA8yMDU1MDMxODIwMzA1NFowgbAxCzAJBgNVBAYTAkJSMRIwEAYDVQQI\n" +
            "DAlTQU8gUEFVTE8xHDAaBgNVBAcME1BSRVNJREVOVEUgUFJVREVOVEUxFzAVBgNV\n" +
            "BAoMDkNIQVBBUy1MQU5DSEVTMQ0wCwYDVQQLDARGT09EMSAwHgYDVQQDDBcqLmNo\n" +
            "YXBhcy1sYW5jaGVzLmNvbS5icjElMCMGCSqGSIb3DQEJARYWam9hb21pcmF5YTAx\n" +
            "QGdtYWlsLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALasrMm3\n" +
            "e+45x78RnMzJJWrAsWCXWmHgeTTLSrKAPZJJF4MiKx48K2BRCQ+1lk6sFT7DMhRc\n" +
            "uKsDzoVQEVoRUdpeNB+lhWVZuosLQ7tooBPNY+QXhGk/lSZ1k7k/eZwxrU4Gu5ok\n" +
            "U+9YU/hlCPKShIUyV9s5lA2eISfsHk2lR0peZ01Q1PnX0zWMMk8vV0L1h2jOQ7VM\n" +
            "ureKj1iZBQ+WI73vW9eNKXx4YNMPOUeyMCZ5DhmiTL4aBu1szmLhDJyBjazea4Ow\n" +
            "bU00MTE+ZCjsJ1E4pcWqKfmQyX9r3G9LLLqBG7Z1bZBrTsnHv3SxwQBWIjsEq+9+\n" +
            "RvZYImuYlrCfH78CAwEAAaNTMFEwHQYDVR0OBBYEFF6JdNx3Kozkk0eov0PfMlKt\n" +
            "r+W0MB8GA1UdIwQYMBaAFF6JdNx3Kozkk0eov0PfMlKtr+W0MA8GA1UdEwEB/wQF\n" +
            "MAMBAf8wDQYJKoZIhvcNAQELBQADggEBAGtItCqksQs8lO85fSSK2a4J29YVDsb/\n" +
            "Ca7NaOMYarlpof2NN6H6Bhash2cRMkxwu/zzWc+x8lvlFgd3f7yIyNZgTpTMH+49\n" +
            "SkVsrqgzTYDvSxTPGJWVHfrbvYW/5otqEixQeiWxx8oq8oNsmLM0B7kbOmb/mVa/\n" +
            "L4kqsvDC1+04Gal7X73LtsP7O701Lfym3YIAlh9IKdIbggguDi2WALn5uKmGJlJr\n" +
            "xNcY0HXKtB1NRnJeiMAw2Gn6fF+f72PPWxLD8Jmme0/f5noJXppd/1mFJNgSC84s\n" +
            "5OIMb+wOb9azMpXS10RzryO7pYLCzPFZaAtQQR3Q6BgHvKz8HL3Oe18=\n" +
            "-----END CERTIFICATE-----");
    });

    var privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIEpAIBAAKCAQEAtqysybd77jnHvxGczMklasCxYJdaYeB5NMtKsoA9kkkXgyIr\n" +
    "HjwrYFEJD7WWTqwVPsMyFFy4qwPOhVARWhFR2l40H6WFZVm6iwtDu2igE81j5BeE\n" +
    "aT+VJnWTuT95nDGtTga7miRT71hT+GUI8pKEhTJX2zmUDZ4hJ+weTaVHSl5nTVDU\n" +
    "+dfTNYwyTy9XQvWHaM5DtUy6t4qPWJkFD5Yjve9b140pfHhg0w85R7IwJnkOGaJM\n" +
    "vhoG7WzOYuEMnIGNrN5rg7BtTTQxMT5kKOwnUTilxaop+ZDJf2vcb0ssuoEbtnVt\n" +
    "kGtOyce/dLHBAFYiOwSr735G9lgia5iWsJ8fvwIDAQABAoIBAQCZ7bdL4skTXKzs\n" +
    "XDL8fSKCag0Nj3whrb10tzkiYN2BPwYJAenDeIA0kRRJoIIfmPHuCR1R+y/BK1wD\n" +
    "Cg0VEDMhBvB1Gkzlsk52i+9vJCJ/jTr3ILn61hEgb0MjflFDRLj8XsAGi0YPESbw\n" +
    "0HJRtRTmCB3wJPyU3QKjWVvPoc4I40cyhGOViP7+01h8Waye+fmiEAGoCmaI7tz1\n" +
    "nFYJ3Ahl+6kYWY7W2OhGpKXwPBl1bqChlsBpzmHf6VLm7jQGhjjUH0OShx1Ue7SN\n" +
    "UuZnSwpuZTRwgR4C2ndjx3IRjtLAQuBwc59VvQgn7ZJq7NpUiBiz39rle6VAZrI1\n" +
    "CK1fKGNBAoGBANy1W8yvJIFHaQ6sytXXEuJFol2SzRzmxfODbHMY5tt2QnFsAtMz\n" +
    "bTjYWYEeKOHQhcp48mH6N0ToOduk3IrFNfkhyfnT/3tXv14wwhL5To9UhJ8AdJ5H\n" +
    "squhlzkyTh1HCYaID12pI3w7ss2I8IZWm/Lrug2wVWYG1n2L7LJ2SDErAoGBANPi\n" +
    "aGnkNmVKIpYLQofoiR5GxAr11Db2YnQhc95LJ8yXUN/Lir+uEK+aOmOyQrAMaN7n\n" +
    "JvOgQJqRxk/vvnB2kPhKvIQlf7JNwG+4PvXyKJTdhCLaxF4/MpYt8LihvsYsuCUh\n" +
    "jF9L++soG5KI//2AvJuxFTiSM1L0Rao72imwgPm9AoGAfPfjhr4UuW6publ1ECe7\n" +
    "dYtgKAObSCYTJ5LesT0EWndXn8k8wEF6Mpmt9EITe+kKGF7rPzbiXI3xVMDAb4LC\n" +
    "0NGk/2ReYISKwtZwzTWEmfuNLEqhvY1zSWMxsR0exc0XQ6l+qdW/VfSnhWFob2hS\n" +
    "3PVEX8PcVuzAPk4gM9xtfAkCgYEAnSH4wR7nYDKcd52eF2BR38wnMuGgIaqS1QDC\n" +
    "BwbBWy6UYYN3QDN8WF4OE0Vtw1VQqI3QCzi68GZPJZTsLEcht6DlMTMGAls67R88\n" +
    "QfT2N4AXsCmBG0vO3iTvslzxN9KONastiLa2+mviFsfW4E8KkIPA8xUpTsmsqFR+\n" +
    "tBAbdhkCgYAYQPnALTB4aUZTr+IJN980hAgBhFHRoGln8qs0wmWL4ukKxsUarvWg\n" +
    "A4il33jtWZXA1LoaecQSddWB9SRmpkzvDtBFdKKBKgZ6TMXmSPXpG7UKTGW4iYaG\n" +
    "ABHM0ZYeIafq118I/wRZRcgMdVYQtLG0hLuZct7yjfls+9oJIws0kw==\n" +
    "-----END RSA PRIVATE KEY-----";

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

    qz.websocket.connect().then(function () {
        return qz.printers.find("HPFDD95B (HP Ink Tank Wireless 410 series)");              // Pass the printer name into the next Promise
    }).then(function (printer) {
        var config = qz.configs.create(printer);       // Create a default config for the found printer
        var data = [
            {
                type: 'pixel',
                format: 'html',
                flavor: 'plain',
                data: '<h1>HELLO WORLD</h1>',
            }
        ];   // Raw ZPL
        return qz.print(config, data);
    }).catch(function (e) { console.error(e); }).finally({

    });

};

