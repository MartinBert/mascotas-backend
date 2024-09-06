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
-----BEGIN CERTIFICATE-----
MIIDSDCCAjCgAwIBAgIIX3WOYsNNkuAwDQYJKoZIhvcNAQENBQAwMzEVMBMGA1UE
AwwMQ29tcHV0YWRvcmVzMQ0wCwYDVQQKDARBRklQMQswCQYDVQQGEwJBUjAeFw0y
NDA5MDYwMDI3MjFaFw0yNjA5MDYwMDI3MjFaMDMxFjAUBgNVBAMMDWZhY3R1cmFj
aW9uXzIxGTAXBgNVBAUTEENVSVQgMjczMDYyMTI5NjEwggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQCdj3Zzcdt+Ks428Lf2MDd81X26f4XzSL+nRSYnbgAE
/GMQVXLX8OA3QBRH4CK1BRl5OZ2ABSQmj1G3GvG4yie5xQtspdXRko0bKw4fVkAO
QTes7xAnDimvkuMIBnIHZP5Jq69OEd8hv6xRO4i9pCTPgD77t0X+fljBxVF4Xs9c
U7ltSxsErd/Tyd/9cT4WYcPuuz4WFDDX1GXWcmx69Dj4AtzZjQDo4cCS4h477iZO
XYQDF3E6OsJN0VAQkltMFlNmr5wRI6BtpqC24T+ntyJRiXDdJygR/BT3LmQZe4GY
6i5ifvCBo1EKg+5GMDGZN7tRa6JCbSB+5hCdLQVsf1lvAgMBAAGjYDBeMAwGA1Ud
EwEB/wQCMAAwHwYDVR0jBBgwFoAUKw0vyN9h/QjJThHQNZMEbY5b0G4wHQYDVR0O
BBYEFAum+nZlFVOhkTVGyD7UwiffystBMA4GA1UdDwEB/wQEAwIF4DANBgkqhkiG
9w0BAQ0FAAOCAQEACXpw6m4slR9CfXy+KQjo2tkD2uDT4Vm0VQQGOgj1tHuLLJ7l
wqV4Bv5QqfGyfO3xibG6GA5kgHNktcbo4SJbkRRForHl8OkaQw75aJVktWcU4cPL
p3TlPGRmh3x92veWiawzzRtGSDxajWvtooxEoMtKMOb++zyeM3qcVRbgQ+jM4wHC
nTkZQyjw4JCdf1EN9621gtaSS8C2N7j3GKTZqEyL/S8YgNAcDDtC/i3NwfUsRvxk
4k4HGVJ+9q1xdmFnDuPiQ9t2xqXQYknaXRMpo+tEs5WHl3AeUjIoMqJaDKUm/iOL
REbApRm/6X4/LHDaomOQZ5l/VBYA4jR46whw+Q==
-----END CERTIFICATE-----
`
const private_key = fs.readFileSync(path.join(__dirname + '/certificates/private.pem'), { encoding: 'utf8' });

module.exports = {
    public_key,
    private_key
}