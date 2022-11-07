const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;

stdout.write('Привет! Какой текст добавим? \n');

function setText(text) {
    if (text.toString().match('exit')) {
        setExit();
    } else {
        fs.appendFile(path.join(__dirname, 'text.txt'), text, (err) => {
            if (err) throw err;
        });
    }
}

function setExit() {
    stdout.write('Пока!');
    process.exit(0);
}

stdin.on('data', setText);
process.on('SIGINT', (code) => {
    setExit();
});