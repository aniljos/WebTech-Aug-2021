const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster){
    //Main Node
    console.log("In the Master Mode.....");
    const cpus = os.cpus().length;

    for (let i = 0; i < cpus; i++) {
       cluster.fork();   
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork(); 
    });

}
else{

    //Worker Mode: spawn the application
    console.log("In the Worker Mode.....");
    require("./app");
}



