/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

function readHtmlTemplate(path) {
  return fs.readFileSync(path, 'utf8');
}

module.exports = readHtmlTemplate;
