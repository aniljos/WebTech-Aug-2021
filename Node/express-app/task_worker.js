const {workerData, parentPort} = require("worker_threads");

console.log("task_worker", process.pid);
console.log("workerData", workerData);

function longProcess(){
    for (let i = 0; i < 5_000_000_000; i++) {
           
    }
}

longProcess();

parentPort.postMessage({status: "complete"});

