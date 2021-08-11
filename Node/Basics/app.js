const math = require('./math');
const os = require('os');
const chalk = require("chalk");


console.log("Hello NodeJS");


//scopes
var x = 10; //function scope(local)
console.log("x: ", x);
//console.log("x: ", global.x);
y = 20; // global
console.log("y: ", y);
console.log("y: ", global.y);

//module parameters

console.log("fileName", __filename);
console.log("dirName", __dirname);
console.log("module", module);


//built-in modules


console.log("os arch", os.arch());
console.log("os cpus", os.cpus().length);

console.log("process id", process.pid);
process.on("exit", () => {
    console.log("Application exiting");
});

// project module files

const math1 = require('./math');
console.log("math", math);
console.log("version", math.version);
console.log("compute", math.compute(10, 30));

// Installed library

console.log(chalk.greenBright("Done with my first Nodejs code"));
