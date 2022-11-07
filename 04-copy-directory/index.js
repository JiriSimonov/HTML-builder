const fs = require('fs');
const path = require('path');
const output = path.join(__dirname, 'copy-folder');
const input = path.join(__dirname, 'files');

fs.rm(
    output,
    {
        force: true,
        recursive: true
    },
    (err) => {
        if (err) throw err;
        fs.mkdir(output, { recursive: true }, (err) => {
            if (err) throw err;
            fs.readdir(input, (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    fs.stat(path.join(input, file), (err, stats) => {
                        if (err) throw err;
                        if (stats.isFile() === true) {
                            fs.copyFile(
                                path.join(input, file),
                                path.join(output, file),
                                (err) => {
                                    if (err) throw err;
                                }
                            );
                        }
                    });
                }
            });
        });
    }
);