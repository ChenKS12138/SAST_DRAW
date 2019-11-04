const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, 'resource', 'data.xlsx'));

const data = xlsx.parse(raw)[0].data.filter(x => x.length).map(item => {
  return {
    'department': item[0],
    'name': item[1],
    'studentID':item[2]
  }
});

console.log(data);