const { promisify } = require('util');
const path = require('path');

const download = promisify(require('download-git-repo'));
const open = require('open');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, createDirSync, writeToFile } = require('../utils/utils');

const createProjectAction = async (project) => {
  console.log("wyc helps you create your project~");

  await download(vueRepo, project, {clone: true});

  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], {cwd: `./${project}`});

  commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`});
  open("http://localhost:8080/");
}

const addComponentAction = async (name, dest) => {
  const result = await compile("vue-component.ejs", {name, lowerName: name.toLowerCase()});
  
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result);
}

const addPageAndRouterAction = async (name, dest) => {
  const data = {name, lowerName: name.toLowerCase()};

  // 编译ejs模板
  const pageResult = await compile('vue-component.ejs', data);
  const routerResult = await compile('vue-router.ejs', data);

  // 写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRouterPath = path.resolve(targetDest, 'router.js');
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRouterPath, routerResult);
  }
}

const addStoreAction = async (name, dest) => {
  // 编译ejs
  const storeResult = await compile('vue-store.ejs', {});
  const typeResult = await compile('vue-types.ejs', {});

  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)){
    const targetStorePath = path.resolve(targetDest, `${name}.js`);
    const targetTypePath = path.resolve(targetDest, 'type.js');
    writeToFile(targetStorePath, storeResult);
    writeToFile(targetTypePath, typeResult)
  }

}

module.exports = {
    createProjectAction,
    addComponentAction,
    addPageAndRouterAction,
    addStoreAction
}