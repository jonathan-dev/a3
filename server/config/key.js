import fs from 'fs';
import path from'path';
const key = fs.readFileSync(path.join(__dirname,'./priv_key.pem'), 'utf-8')
export default key
