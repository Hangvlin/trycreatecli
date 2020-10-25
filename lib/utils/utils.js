const path = require('path');
const fs = require('fs');

const ejs = require('ejs');



const compile = (templateName, data) => {
  const templatePostion = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePostion);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      
      resolve(result);
    })
  })
  
}

const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)){
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))){
      fs.mkdirSync(pathName);
      return true;
    }
  }
}


const writeToFile = (pathName, content) => {
  return fs.promises.writeFile(pathName, content);
}

module.exports = {
  compile,
  createDirSync,
  writeToFile
}