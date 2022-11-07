const fs = require("fs");
const path = require('path');
const { stdout, stdin } = process;

stdout.write("Привет! Какой текст добавим? \n");

function setText(text) {
  fs.appendFile(path.join(__dirname, 'text.txt'), text, err => {
    if (err) throw err;
  });
}

function setExite() {
  stdout.write("Пока!");
}

stdin.on("data", setText);
process.on("SIGINT", code => {
  console.log('До свидания!');
  process.exit(0);
});
