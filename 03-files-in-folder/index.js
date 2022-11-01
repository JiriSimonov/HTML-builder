let path = require('path');
let fs = require('fs');

fs.readdir(path.join(__dirname, "secret-folder"), (err, files) => {
    if (err) throw err;   
    for (const file of files) {
        fs.stat(path.join(__dirname, "secret-folder", file), (err, stats) => {
            if (err) throw err;
            console.log(`${path.basename(file).split('.')[0]} - ${path.extname(file).slice(1)} - ${stats.size}`);
        });
    }
})