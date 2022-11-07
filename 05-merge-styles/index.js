const fs = require("fs");
const path = require("path");
const input = path.join(__dirname, "styles");
const output = path.join(__dirname, "project-dist", "bundle.css");
fs.open(output, "w", (err) => {
  if (err) throw err;
  fs.readdir(input, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.stat(path.join(input, file), (err, stats) => {
        if (err) throw err;
        if (path.extname(file) === ".css" && stats.isFile()) {
          fs.readFile(path.join(input, file), "utf-8", function (err, data) {
            if (err) throw err;
            let content = data + "\n";
            fs.appendFile(output, content, function (err) {
              if (err) throw err;
            });
          });
        }
      });
    }
  });
});
