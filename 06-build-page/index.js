const fs = require("fs");
const path = require("path");
const inputAssets = path.join(__dirname, "assets");
const outputAssets = path.join(__dirname, "project-dist", "assets");
const copyFolder = () => {
  fs.readdir(inputAssets, (err, folders) => {
    if (err) throw err;
    fs.mkdir(outputAssets, { recursive: true }, (err) => {
      if (err) throw err;
      for (const folder of folders) {
        fs.stat(path.join(inputAssets, folder), (err, stats) => {
          if (err) throw err;
          if (stats.isDirectory()) {
            fs.mkdir(
              path.join(outputAssets, folder),
              { recursive: true },
              (err) => {
                if (err) throw err;
                fs.readdir(
                  path.join(inputAssets, folder),
                  { recursive: true },
                  (err, items) => {
                    if (err) throw err;
                    for (const item of items) {
                      fs.copyFile(
                        path.join(inputAssets, folder, item),
                        path.join(outputAssets, folder, item),
                        (err) => {
                          if (err) throw err;
                        }
                      );
                    }
                  }
                );
              }
            );
          } else {
            fs.copyFile(
              path.join(inputAssets, folder),
              path.join(outputAssets, folder),
              (err) => {
                if (err) throw err;
              }
            );
          }
        });
      }
    });
  });
};
const bundleCss = () => {
  fs.open(path.join(__dirname, "project-dist", "style.css"), "w", (err) => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, "styles"), (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.stat(path.join(__dirname, "styles", file), (err, stats) => {
          if (err) throw err;
          if (path.extname(file) === ".css" && stats.isFile()) {
            fs.readFile(
              path.join(__dirname, "styles", file),
              "utf-8",
              function (err, data) {
                if (err) throw err;
                let content = data + "\n";
                fs.appendFile(
                  path.join(__dirname, "project-dist", "style.css"),
                  content,
                  function (err) {
                    if (err) throw err;
                  }
                );
              }
            );
          }
        });
      }
    });
  });
};

const bundleHTML = () => {
    fs.readFile(path.join(__dirname, 'template.html'), 'utf8', function (err, data) {
        if (err) throw err;
        let result = data;
        const namesComponents = [...data.matchAll(/{{(.*)}}/g)].map((el) => el[1]);
        let counter = 0;
        namesComponents.forEach((component) => {
            fs.readFile(path.join(__dirname, 'components', `${component}.html`), 'utf-8', function (err, data) {
                if (err) throw err;
                result = result.replace(`{{${component}}}`, data);
                counter++;
                if(counter === namesComponents.length) {
                    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, function(err) {
                        if (err) throw err;
                    });
                }
            });
        });
    });
}



(async () => {
  await fs.promises.rm(path.join(__dirname, "project-dist"), {
    recursive: true,
    force: true,
  });
  await fs.promises.mkdir(path.join(__dirname, "project-dist"), {
    recursive: true,
  });
  bundleHTML();
  copyFolder();
  bundleCss();
})();
