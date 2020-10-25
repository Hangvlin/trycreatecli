const program = require('commander');

const helpOptions = () => {
  program.option("-s --src", 'test');  
  program.option('-d --dest <dest>', 'a destination folder');
  program.on('--help',function(){
      console.log(" ");
      console.log("other: ahhhhh");
  })
};

module.exports = helpOptions;
