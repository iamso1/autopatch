const https = require('https');
const fs = require('fs');
const path = require('path');

//get info
async function downloadPatchs() {
  //download info
  const latestVer = await promiseDownload(
    'https://raw.githubusercontent.com/iamso1/patchs-server/master/info.json',
    'info.json'
  );
  //
}

function promiseDownload(src, filename, directory = '') {
  const file = fs.createWriteStream(path.join(directory, filename), {
    flags: 'w',
  });
  return new Promise((resolve, reject) => {
    https.get(src, function(response) {
      let content = '';
      response.pipe(file);
      response.on('data', chunk => {
        content = content + chunk;
      });
      response.on('end', () => {
        resolve(content);
      });
      response.on('error', () => {
        reject('err');
      });
    });
  });
}
downloadPatchs();
//download files

// xcopy D:\testfolder\A D:\testfolder\B /y
