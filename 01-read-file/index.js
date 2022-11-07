const path = require('path');
const fs = require('fs');

fs.readFile(path.join(__dirname, 'text.txt'), function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString());
})
console.log(path.basename(__filename));