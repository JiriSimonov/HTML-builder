let fs = require('fs');
let path = require('path');
fs.mkdir(path.join(__dirname, "copy-folder"), {recursive: true}, err => {
    if(err) throw err;
    fs.readdir(path.join(__dirname, "files"), (err, files) => {
        if (err) throw err;   
        for (const file of files) {
            fs.stat(path.join(__dirname, "files", file), (err, stats) => {
                if (err) throw err;
                if (stats.isFile() === true) {
                    fs.copyFile(path.join(__dirname, "files", file), path.join(__dirname, "copy-folder", file), err => {
                        if (err) throw err;
                    });
                }
            });
        }
    })
});
