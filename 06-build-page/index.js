let fs = require("fs");
let path = require("path");

const copyFolder = async () => {
  fs.readdir(path.join(__dirname, "assets"), (err, folders) => {
    if (err) throw err;
    fs.mkdir(
      path.join(__dirname, "project-dist", "assets"),
      { recursive: true },
      (err) => {
        for (const folder of folders) {
          fs.stat(path.join(__dirname, "assets", folder), (err, stats) => {
            fs.mkdir(
              path.join(__dirname, "project-dist", "assets", folder),
              { recursive: true },
              (err) => {
                if (err) throw err;
                fs.readdir(
                  path.join(__dirname, "assets", folder),
                  { recursive: true },
                  (err, items) => {
                    if (err) throw err;
                    for (const item of items) {
                      fs.copyFile(
                        path.join(__dirname, "assets", folder, item),
                        path.join(
                          __dirname,
                          "project-dist",
                          "assets",
                          folder,
                          item
                        ),
                        (err) => {
                          if (err) throw err;
                        }
                      );
                    }
                  }
                );
              }
            );
          });
        }
      }
    );
  });
};
const bundleCss = () => {
  fs.open(path.join(__dirname, "project-dist", "styles.css"), "w", (err) => {
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
                  path.join(__dirname, "project-dist", "styles.css"),
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

(async () => {
  await fs.promises.rm(path.join(__dirname, "project-dist"), {
    recursive: true,
    force: true,
  });
  await fs.promises.mkdir(path.join(__dirname, "project-dist"), {
    recursive: true,
  });
  await copyFolder();
  await bundleCss();
})();
// fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, err => {
//     if (err) throw err;
//     fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
//         if(err) throw err;
//         fs.readdir(path.join(__dirname, "components"), (err, components) => {
//             if (err) throw err;
//             let articles = components[0];
//             let footer = components[1];
//             let header = components[2];
//             fs.readFile(path.join(__dirname, "components", articles), 'utf-8', function(err, data) {
//                 if (err) throw err;
//                 let content = data;
//                 fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', async function(err, data) {
//                     if (err) {
//                         if (err) throw err;
//                     }
//                    let result = data.replace(`{{${path.basename(articles).split('.')[0]}}}`, content);
//                     fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, 'utf-8', function (err) {
//                         if (err) throw err;
//                     });
//                 });
//             });
//             fs.readFile(path.join(__dirname, "components", articles), 'utf-8', function(err, data) {
//                 if (err) throw err;
//                 let content = data;
//                 fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', function(err, data) {
//                     if (err) {
//                         if (err) throw err;
//                     }
//                    let result = data.replace(`{{${path.basename(articles).split('.')[0]}}}`, content);
//                     fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, 'utf-8', function (err) {
//                         if (err) throw err;
//                     });
//                     fs.readFile(path.join(__dirname, "components", footer), 'utf-8', function(err, data) {
//                         if (err) throw err;
//                         let content = data;
//                         fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', function(err, data) {
//                             if (err) {
//                                 if (err) throw err;
//                             }
//                            let result = data.replace(`{{${path.basename(footer).split('.')[0]}}}`, content);
//                             fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, 'utf-8', function (err) {
//                                 if (err) throw err;
//                             });
//                             fs.readFile(path.join(__dirname, "components", header), 'utf-8', function(err, data) {
//                                 if (err) throw err;
//                                 let content = data;
//                                 fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', function(err, data) {
//                                     if (err) {
//                                         if (err) throw err;
//                                     }
//                                    let result = data.replace(`{{${path.basename(header).split('.')[0]}}}`, content);
//                                     fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, 'utf-8', function (err) {
//                                         if (err) throw err;
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//             fs.readdir(path.join(__dirname, "styles"), (err, files) => {
//                 if (err) throw err;
//                 for (const file of files) {
//                     fs.stat(path.join(__dirname, "styles", file), (err, stats) => {
//                         if (err) throw err;
//                         if (path.extname(file) === '.css') {
//                             fs.readFile(path.join(__dirname, "styles", file), 'utf-8', function(err, data) {
//                                 let content = data + "\n";
//                                 fs.appendFile(path.join(__dirname, "project-dist", 'style.css'), content, function(err) {
//                                     if(err) throw err;
//                                 });
//                             });
//                         }
//                     });
//                 }
//             });
//             fs.readdir(path.join(__dirname, 'assets'), (err, folders) => {
//                 if (err) throw err;
//                 fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, err => {
//                     for (const folder of folders) {
//                         fs.stat(path.join(__dirname, "assets", folder), (err, stats) => {
//                             fs.mkdir(path.join(__dirname, "project-dist", 'assets', folder), {recursive: true}, err => {
//                                 if (err) throw err;
//                                 fs.readdir(path.join(__dirname, "assets", folder), {recursive: true}, (err, items) => {
//                                     if (err) throw err;
//                                     for (const item of items) {
//                                         fs.copyFile(path.join(__dirname, "assets", folder, item), path.join(__dirname, 'project-dist', 'assets', folder, item), err =>{
//                                             if (err) throw err;
//                                         });
//                                     }
//                                 });
//                             });
//                         });
//                     }
//                 })
//             });
//         });
//     });
// });
