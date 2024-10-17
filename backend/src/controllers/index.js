const path = require('path');
const fs = require('fs');

let mockFiles = []

const loadMocksFiles = (dirName) => {
  const dir = path.resolve(__dirname, '..', dirName);

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    const fileStat = fs.lstatSync(filePath)

    if (fileStat.isDirectory()) {
     return loadMocksFiles(filePath)
    } else if (filePath.endsWith('.json')) {
      const rawdata = fs.readFileSync(filePath);
      const parsedData = JSON.parse(rawdata);

      const [_, mockPath] = filePath.split('mocks')
      mockFiles.push({
        mockPath: mockPath,
        ...parsedData
      })
    }
  })
  return mockFiles;
};

exports.getMocks = (req, res) => {
  loadMocksFiles('./mocks')
  const mocks = [...mockFiles];
  mockFiles = [];

  res.status(200).json({
    mocks: mocks.reduce((acc, curr) => {
      let currPath = curr.mockPath.split('/')
      currPath.pop()
      currPath = currPath.join('/') || '/'
      const currPathIndex = acc.findIndex(({ group }) => group === currPath);

      if (currPathIndex !== -1) {
        acc[currPathIndex].mocks.push(curr)
      } else {
        acc.push({
          group: currPath,
          mocks: [{ ...curr }],
        })
      }

      return acc
    }, [])
  })
}