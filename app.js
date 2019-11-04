const express = require('express');
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

const app = express();


app.use('/', express.static(path.join(__dirname, 'static')));

app.use('/data', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'resource', 'data.xlsx'));
    const data = xlsx.parse(raw)[0].data.filter(x => x.length).map(item => {
      return {
        'department': item[0],
        'name': item[1],
        'studentID':item[2]
      }
    });
    res.json(data);
  }
  catch (e) {
    res.status = 500;
    res.json([]);
  }
})

app.listen(2333);
console.log('server start at http://localhost:2333')