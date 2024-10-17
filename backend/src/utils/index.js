const path = require('path');
const fs = require('fs');

const routerMethods = new Map([
  ['GET', 'get'],
  ['POST', 'post'],
  ['DELETE', 'delete'],
  ['PATCH', 'patch'],
  ['PUT', 'put']
]);

const loadJSONFiles = (dirName, app) => {
  const dir = path.resolve(__dirname, '..', dirName)
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    const fileStat = fs.lstatSync(filePath)

    if (fileStat.isDirectory()) {
      loadJSONFiles(filePath, app)
    } else if (filePath.endsWith('.json')) {
      const rawdata = fs.readFileSync(filePath);
      const { url, method, delay, response, status } = JSON.parse(rawdata);
      app[routerMethods.get(method)](url, (_, res) => {
        setTimeout(() => { 
          res.status(status || 200).json(response)
        }, delay)
      })
    }
  })
  return app;
};

exports.loadJSONFiles = loadJSONFiles