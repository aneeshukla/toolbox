const fs = require("fs");

const readFile = (file) => {
    return fs.readFileSync(file, 'utf8');
}

module.exports = {
    readFile
}