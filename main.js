const https = require('https');
const fs = require('fs');
const path = require('path');

//get info
async function downloadPatchs() {
  //download info
  const patchInfo = JSON.parse(
    await promiseDownload(
      'https://raw.githubusercontent.com/iamso1/patchs-server/master/info.json',
      'sys/info.json'
    )
  );
  //get current patch version
  const latestVer = patchInfo.version;

  //get target service version
  const target_version = JSON.parse(fs.readFileSync('', 'utf8')).version;

  //if target version is older than latestVer, download all patchs to patchs folder
  if (latestVer > target_version) {
    for (let i = 0; i < patchInfo.urls.length; i++) {
      promiseDownload(patchInfo.urls[i], `patches/ ${patchInfo.filenames[i]}`);
    }
  }
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
