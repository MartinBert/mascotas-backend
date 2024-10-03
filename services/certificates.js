const fs = require('fs')
const path = require('path')

const public_key = fs.readFileSync(path.join(__dirname + '/certificates/public.pem'), {encoding: 'utf8'});
const private_key = fs.readFileSync(path.join(__dirname + '/certificates/private.pem'), { encoding: 'utf8' });


module.exports = {
    public_key,
    private_key
}