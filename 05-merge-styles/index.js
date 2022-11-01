let fs = require('fs');
let path = require('path');

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {
    if(err) throw err;
    fs.readdir(path.join(__dirname, "styles"), (err, files) => {
        if (err) throw err;   
        for (const file of files) {
            fs.stat(path.join(__dirname, "styles", file), (err, stats) => {
                if (err) throw err;
                if (path.extname(file) === '.css') {
                    fs.readFile(path.join(__dirname, "styles", file), 'utf-8', function(err, data) {
                        let content = data + "\n";
                        fs.appendFile(path.join(__dirname, "project-dist", 'bundle.css'), content, function(err) {
                            if(err) throw err;  
                        }); 
                    });
                }
            });
        }
    });
});