const { green } = require("chalk");
const chalk = require("chalk");
const yargs = require("yargs");
const tasks = require("./tasks");

console.log(chalk.greenBright.inverse("TODO Application"));

// node todo.js add --task call --desc "call home" 
const argv = process.argv;
console.log(argv);
const command = argv[2];

console.log(yargs.argv);

if(command === "add"){

    const taskName = yargs.argv.task;
    const desc = yargs.argv.desc;
    console.log(chalk.blue.inverse("Add Mode", taskName, desc));
    tasks
        .saveTask(taskName, desc)
        .then((name) => {
            console.log(chalk.greenBright("Saved the task", name))
        }, (err) => {
            console.log(chalk.redBright(err))
        });
}
else if(command === "list"){
    console.log(green.blueBright.inverse("List Mode"));

    //async, await ==> promise
    (async () => {
        try {
            const data = await tasks.fetchAll();
            for (const item of data) {
                console.log(chalk.blackBright(`Name: ${item.taskName}, Desc: ${item.description}`));
            }
    
        } catch (error) {
    
            console.log(error);
        }

    })();
    
    
}
else if(command === "delete"){
    
    const taskName = yargs.argv.taskName;
    console.log(chalk.redBright.inverse("Delete Mode", taskName));
    tasks.taskEmitter.on("deleted", (message) => {
        console.log(chalk.greenBright(message));
    })
    tasks.taskEmitter.on("error", (message) => {
        console.log(chalk.redBright(message));
    })
    tasks.deleteTask(taskName);
}
else{
    console.log(chalk.yellowBright.inverse("Unknown Command"));
}

