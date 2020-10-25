const program = require('commander');

const { createProjectAction, addComponentAction, addPageAndRouterAction, addStoreAction } = require('./actions');

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction);
  
  program
    .command('addcpn <name>')
    .description('add vue componet')
    .action((name) => {
      addComponentAction(name, process.dest || "src/components");
    })

  program
    .command('addpage <page>')
    .description('add vue page and router config, eg:wyc addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRouterAction(page, process.dest || "src/pages")
    })
  
  program
    .command('addstore <store>')
    .description('add a store')
    .action((store) => {
      addStoreAction(store, process.dest || 'src/store/modules')
    })
}

module.exports = createCommands;