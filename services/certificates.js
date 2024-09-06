const fs = require('fs');
const path = require('path');

/************
TODO 
public.pem genera error al ser leido, la codificacion es utf16el, 
revisar espacio entre caracteres o rupturas en la cadena.
Solución momentanea, instanciar una variable con la cadena de caracteres del
archivo .pem
***********/

// const public_key =
// `
// -----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqp3VGR2NC8+RzPxs99MI
// DMFggIoDFu+ItJMjcvRWSKIWPboelphY1hKp2cUTM/A8GGzX2/XLuJZ+X0joxoBB
// JJUneAPA1KVwR0OllqA3L5Z4d6Gx01gBrWE41hoGAQQe2ps9cHVB+rWhQWHlG0/6
// sS9i8r7yM0o6G8DMcrd9iCln7p0W/6OtQUGwIi1G9dsmCdVMRE3gXb9au9perHUI
// XN8tSgj5PEeOPTz4TBd7qWe97klRPGl3utNSbQ8UQAUXIbghEZQk9y0naUhZVJzD
// HjViUmfldyKkUARUD12K1vhycg9jtBmBPmypPaf7NuEJe+SK0E9/mKm3R10fVb1H
// iQIDAQAB
// -----END PUBLIC KEY-----
// `
// const private_key = fs.readFileSync(path.join(__dirname + '/certificates/private.pem'), { encoding: 'utf8' });

const public_key = fs.readFileSync(path.join(__dirname + '/certificates/public.pem'), {encoding: 'utf8'});
const private_key = fs.readFileSync(path.join(__dirname + '/certificates/key.key'), {encoding: 'utf8'});

module.exports = {
    public_key,
    private_key
}