const {genSaltSync, hashSync, compareSync} = require('bcrypt');

function generatePasswordHash(password) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

function comparePasswordHash(password, passwordHash) {
  return compareSync(password, passwordHash);
}

function toSlug(input) {
  return input.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')
}

function parseRedisData(rawData) {
  let response = [];
  for (let i = 1; i < rawData.length; i += 2) {
    let d = {_id: rawData[i], timestamp: rawData[i].split(':')[1].split('-')[0]};
    for (let j = 0; j < rawData[i + 1].length; j += 2) {
      if (rawData[i + 1][j] === 'password') {
        continue;
      }
      d[rawData[i + 1][j]] = rawData[i + 1][j + 1];
    }
    response.push(d)
  }
  return response;
}

module.exports = {
  generatePasswordHash,
  comparePasswordHash,
  toSlug,
  parseRedisData
}