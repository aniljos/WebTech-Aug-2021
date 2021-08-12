const { Worker, isMainThread, workerData, parentPort } = require("worker_threads");

if (isMainThread) {

    console.log("executing main thread", process.pid);
    const worker = new Worker(__filename, { workerData: { data: "hello" } });
    worker.on("message", (result) => {

        console.log("inMain", result)
    });
}
else {
    console.log("executing worker", process.pid);
    console.log("workerData", workerData);

    function longProcess() {
        for (let i = 0; i < 5_000_000; i++) {

        }
    }
    longProcess();
    parentPort.postMessage({ status: "complete" });

}