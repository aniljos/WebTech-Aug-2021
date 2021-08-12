const { Worker, isMainThread, workerData, parentPort } = require('worker_threads');

if (isMainThread) {
    console.log("Main Task started")
    const elementCount = 2_000_000_000;
    const arrayBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * elementCount);
    const arr = new Int32Array(arrayBuffer);

    //split the task to multiple unit(chunks);
    const chunkSize = 8; //No of core(cpu) os.cpus().length
    const numberofElementsPerChunk = elementCount / chunkSize;
    const chunks = [];

    console.time("tasks")
    for (let i = 0; i < chunkSize; i++) {

        const start = chunks.length * numberofElementsPerChunk;
        const end = start + numberofElementsPerChunk;
        chunks.push({ index: i, start, end });
    }
    console.log(chunks);

    let resultCount = 0;
    for (const chunk of chunks) {
        
        const worker = new Worker(__filename, {workerData: {chunk, arr}});
        worker.on("message", (rs)=> {
            console.log("Completed: ", rs)
            resultCount++;
           // console.log("resultCount", resultCount);
            if(resultCount == chunkSize){
                console.timeEnd("tasks");
                console.log("Completed", arr);
            }
        });

    }

    for (let i = 0; i < 3; i++) {
        setTimeout(() => { console.log("Timeout ", i) }, i * 1000);
    }
}
else{

    console.log("Worker...", workerData.chunk.index);
    for (let i = workerData.chunk.start; i < workerData.chunk.end; i++) {
        workerData.arr[i] = i;
    }
    parentPort.postMessage({index: workerData.chunk.index, status: 1})
}