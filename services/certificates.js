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
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwhHkfxnSxmDecwyC5Hd3
// en3nP63d3gMLpSBDkL6sNr4m8Q+T6HcOFqgrDt7uKZmlltWmRbYSfljWEvA6mJ2N
// 1y0XZp07M6n5uBm+GvMOU4dwtp1BQ1MZP7SMoqwqLXhzPFQOCKwfTZtrR6MGiNc4
// w+mPLi8Ys93R3dhXiZEOlglsYzMGAUBH87anJd0Sr0/KKXdORVEM5wPLTUIUN1CT
// +3yCXw3J5+BwsEqGu9sWtaHNyMa0JrLovMHOF2Vxnx5lJ2i4cw3l/x8JWhOYo3x2
// e9Qg80jKGQv5RwRjChQogRcKe68SdHMXj2nv6F4/o3I+L6ToSbG9E29FVUTdDMFW
// fwIDAQAB
// -----END PUBLIC KEY-----
// `
const public_key = fs.readFileSync(path.join(__dirname + '/certificates/public.pem'), {encoding: 'utf8'});
const private_key = fs.readFileSync(path.join(__dirname + '/certificates/private.pem'), { encoding: 'utf8' });


module.exports = {
    public_key,
    private_key
}