console.log("Task started")
const elementCount = 2_000_000_000;
const arrayBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * elementCount);
const arr = new Int32Array(arrayBuffer);
//const arr =[];

console.time("task")
for (let i = 0; i < elementCount; i++) {
    arr[i] = i;
}

console.timeEnd("task");
console.log(arr);

for (let i = 0; i < 3; i++) {
    setTimeout(() => {console.log("Timeout ", i)}, i * 1000);
}