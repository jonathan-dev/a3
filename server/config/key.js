let fs = require('fs');
let path = require('path');
const key = fs.readFileSync(path.join(__dirname,'./priv_key.pem'), 'utf-8') // read in key
module.exports = key; // export the key for signing the JWT
