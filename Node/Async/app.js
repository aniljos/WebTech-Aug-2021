console.log("App started");

process.on("exit", () => {
    console.log("Process Exiting");
});

setTimeout(() => {
    console.log("Timeout after 3secs");
}, 3000);


//file io
setTimeout(() => {
    console.log("Timeout after 0secs");
}, 0);

setImmediate(() => {
    console.log("setImmediate");
});

process.nextTick(() => {
    console.log("nextTick");
})



console.log("App Completed");