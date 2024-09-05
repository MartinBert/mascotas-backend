const fs = require('fs');
const path = require('path');

/************
TODO 
public.pem genera error al ser leido, la codificacion es utf16el, 
revisar espacio entre caracteres o rupturas en la cadena.
Solución momentanea, instanciar una variable con la cadena de caracteres del
archivo .pem
***********/

const public_key =
`
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqp3VGR2NC8+RzPxs99MI
DMFggIoDFu+ItJMjcvRWSKIWPboelphY1hKp2cUTM/A8GGzX2/XLuJZ+X0joxoBB
JJUneAPA1KVwR0OllqA3L5Z4d6Gx01gBrWE41hoGAQQe2ps9cHVB+rWhQWHlG0/6
sS9i8r7yM0o6G8DMcrd9iCln7p0W/6OtQUGwIi1G9dsmCdVMRE3gXb9au9perHUI
XN8tSgj5PEeOPTz4TBd7qWe97klRPGl3utNSbQ8UQAUXIbghEZQk9y0naUhZVJzD
HjViUmfldyKkUARUD12K1vhycg9jtBmBPmypPaf7NuEJe+SK0E9/mKm3R10fVb1H
iQIDAQAB
-----END PUBLIC KEY-----
`
const private_key = fs.readFileSync(path.join(__dirname + '/certificates/private.pem'), { encoding: 'utf8' });

// const private_key =
// `
// -----BEGIN CERTIFICATE-----
// MIIDSDCCAjCgAwIBAgIILUwNS4h11skwDQYJKoZIhvcNAQENBQAwMzEVMBMGA1UEAwwMQ29tcHV0
// YWRvcmVzMQ0wCwYDVQQKDARBRklQMQswCQYDVQQGEwJBUjAeFw0yNDA5MDQyMDQ2MTJaFw0yNjA5
// MDQyMDQ2MTJaMDMxFjAUBgNVBAMMDWZhY3R1cmFjaW9uXzExGTAXBgNVBAUTEENVSVQgMjczMDYy
// MTI5NjEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCrgggJZssRoL/gl9yYG2FZaNRO
// QpJ5Sb6qkF3sxtKH16R1D5Nht9M5DET6ErIKQiHgUlbYlEtxP5ix2x3tMAfGsLWoaw3lAOwPm5cQ
// fnlUFsvglj4wgSIE3clezdtZ+xx9T2NI8tzjD1xsbRfzvG0cmOfmiyVqvIR7plryDC+pjgaBbruo
// IyjfKyl7jHBUS5E5boUDPVWaPeN9uOPAVVn6MJdUepmifFGDXWDOIyIFmBnpc4YQcF/uI/w1o2SQ
// ZcVe2tMP8bchsJXjmix9aGjtGZ+SKpJwSnI5K0NBlZSrTlayvLUTFn+pJQi124B3EFY9FKTKYSqR
// eZb/rxefpZiRAgMBAAGjYDBeMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUKw0vyN9h/QjJThHQ
// NZMEbY5b0G4wHQYDVR0OBBYEFPHinE5DDCyttXDxnVTVriIp9HZ3MA4GA1UdDwEB/wQEAwIF4DAN
// BgkqhkiG9w0BAQ0FAAOCAQEAACGTLtR+puBl8Gy89RG5GjR8sDsEOS9LPF4TRO16nnuVu0P00//b
// PyU7n8O72unxzOF3AxZOefwoy2NxWzQOQk++j0PRJhgX8HYe/Wl4/wrwIjtcXaj0Ycw5rQnui0H9
// t8CjHczShtcxprfPwLAZPVhVcOyx2q2WrfjOdtuQxF+D+rrJJ93MT4RD+3U2nFXdTYKVk0DyRPw2
// WuyJ/PUeXwOQpOMPqtaaBN0Te9YvRIR9f4Ni5NLllu+nufiaSIPXz9HLG2nYzRBwQvZu9uo8kH9D
// OEPhL2EBGjhX15CZZVeqejYu6+MK1/AvsEFSUHbHsmSC5GHW1RTTWQYEaa7+tg==
// -----END CERTIFICATE-----
// `

module.exports = {
    public_key,
    private_key
}