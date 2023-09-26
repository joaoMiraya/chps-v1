/*
 * JavaScript client-side example using jsrsasign
 */

// #########################################################
// #             WARNING   WARNING   WARNING               #
// #########################################################
// #                                                       #
// # This file is intended for demonstration purposes      #
// # only.                                                 #
// #                                                       #
// # It is the SOLE responsibility of YOU, the programmer  #
// # to prevent against unauthorized access to any signing #
// # functions.                                            #
// #                                                       #
// # Organizations that do not protect against un-         #
// # authorized signing will be black-listed to prevent    #
// # software piracy.                                      #
// #                                                       #
// # -QZ Industries, LLC                                   #
// #                                                       #
// #########################################################

/**
 * Depends:
 *     - jsrsasign-latest-all-min.js
 *     - qz-tray.js
 *
 * Steps:
 *
 *     1. Include jsrsasign 8.0.4 into your web page
 *        <script src="https://cdn.rawgit.com/kjur/jsrsasign/c057d3447b194fa0a3fdcea110579454898e093d/jsrsasign-all-min.js"></script>
 *
 *     2. Update the privateKey below with contents from private-key.pem
 *
 *     3. Include this script into your web page
 *        <script src="path/to/sign-message.js"></script>
 *
 *     4. Remove or comment out any other references to "setSignaturePromise"
 */
var privateKey = "-----BEGIN PRIVATE KEY-----\n" +
"MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2rKzJt3vuOce/\n" +
"EZzMySVqwLFgl1ph4Hk0y0qygD2SSReDIisePCtgUQkPtZZOrBU+wzIUXLirA86F\n" +
"UBFaEVHaXjQfpYVlWbqLC0O7aKATzWPkF4RpP5UmdZO5P3mcMa1OBruaJFPvWFP4\n" +
"ZQjykoSFMlfbOZQNniEn7B5NpUdKXmdNUNT519M1jDJPL1dC9YdozkO1TLq3io9Y\n" +
"mQUPliO971vXjSl8eGDTDzlHsjAmeQ4Zoky+GgbtbM5i4QycgY2s3muDsG1NNDEx\n" +
"PmQo7CdROKXFqin5kMl/a9xvSyy6gRu2dW2Qa07Jx790scEAViI7BKvvfkb2WCJr\n" +
"mJawnx+/AgMBAAECggEBAJntt0viyRNcrOxcMvx9IoJqDQ2PfCGtvXS3OSJg3YE/\n" +
"BgkB6cN4gDSRFEmggh+Y8e4JHVH7L8ErXAMKDRUQMyEG8HUaTOWyTnaL728kIn+N\n" +
"OvcgufrWESBvQyN+UUNEuPxewAaLRg8RJvDQclG1FOYIHfAk/JTdAqNZW8+hzgjj\n" +
"RzKEY5WI/v7TWHxZrJ75+aIQAagKZoju3PWcVgncCGX7qRhZjtbY6EakpfA8GXVu\n" +
"oKGWwGnOYd/pUubuNAaGONQfQ5KHHVR7tI1S5mdLCm5lNHCBHgLad2PHchGO0sBC\n" +
"4HBzn1W9CCftkmrs2lSIGLPf2uV7pUBmsjUIrV8oY0ECgYEA3LVbzK8kgUdpDqzK\n" +
"1dcS4kWiXZLNHObF84Nscxjm23ZCcWwC0zNtONhZgR4o4dCFynjyYfo3ROg526Tc\n" +
"isU1+SHJ+dP/e1e/XjDCEvlOj1SEnwB0nkeyq6GXOTJOHUcJhogPXakjfDuyzYjw\n" +
"hlab8uu6DbBVZgbWfYvssnZIMSsCgYEA0+JoaeQ2ZUoilgtCh+iJHkbECvXUNvZi\n" +
"dCFz3ksnzJdQ38uKv64Qr5o6Y7JCsAxo3ucm86BAmpHGT+++cHaQ+Eq8hCV/sk3A\n" +
"b7g+9fIolN2EItrEXj8yli3wuKG+xiy4JSGMX0v76ygbkoj//YC8m7EVOJIzUvRF\n" +
"qjvaKbCA+b0CgYB89+OGvhS5bqm5uXUQJ7t1i2AoA5tIJhMnkt6xPQRad1efyTzA\n" +
"QXoyma30QhN76QoYXus/NuJcjfFUwMBvgsLQ0aT/ZF5ghIrC1nDNNYSZ+40sSqG9\n" +
"jXNJYzGxHR7FzRdDqX6p1b9V9KeFYWhvaFLc9URfw9xW7MA+TiAz3G18CQKBgQCd\n" +
"IfjBHudgMpx3nZ4XYFHfzCcy4aAhqpLVAMIHBsFbLpRhg3dAM3xYXg4TRW3DVVCo\n" +
"jdALOLrwZk8llOwsRyG3oOUxMwYCWzrtHzxB9PY3gBewKYEbS87eJO+yXPE30o41\n" +
"qy2Itrb6a+IWx9bgTwqQg8DzFSlOyayoVH60EBt2GQKBgBhA+cAtMHhpRlOv4gk3\n" +
"3zSECAGEUdGgaWfyqzTCZYvi6QrGxRqu9aADiKXfeO1ZlcDUuhp5xBJ11YH1JGam\n" +
"TO8O0EV0ooEqBnpMxeZI9ekbtQpMZbiJhoYAEczRlh4hp+rXXwj/BFlFyAx1VhC0\n" +
"sbSEu5ly3vKN+Wz72gkjCzST\n" +
"-----END PRIVATE KEY-----";

qz.security.setSignaturePromise(function(toSign) {
    return function(resolve, reject) {
        try {
            var pk = KEYUTIL.getKey(privateKey);
            var sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
            sig.init(pk); 
            sig.updateString(toSign);
            var hex = sig.sign();
            console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
            resolve(stob64(hextorstr(hex)));
        } catch (err) {
            console.error(err);
            reject(err);
        }
    };
});