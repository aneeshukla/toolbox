const convert = require('xml-js');
const fs =  require('fs');

// paste the stringified json here
var sJson = fs.readFileSync('./FROM.txt', 'utf8');

fs.writeFileSync('./TO.json', JSON.parse(sJson), 'utf8');

console.log("Output JSON stored in TO.json");