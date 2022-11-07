const path = require("path");
const fs = require("fs");
const src = path.join(__dirname, "secret-folder");

fs.readdir(path.join(__dirname, "secret-folder"), (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.stat(path.join(__dirname, "secret-folder", file), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        console.log(
          `${path.basename(file).replace(path.extname(file), "")} - ${path
            .extname(file)
            .slice(1)} - ${stats.size}`
        );
      }
    });
  }
});
