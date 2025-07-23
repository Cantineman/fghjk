const crypto = require('crypto');
const config = require('../config');

const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(config.jwtSecret).digest();

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const [ivStr, encryptedStr] = text.split(':');
  const iv = Buffer.from(ivStr, 'hex');
  const encrypted = Buffer.from(encryptedStr, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString();
}

module.exports = { encrypt, decrypt };