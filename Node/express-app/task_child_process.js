
console.log("In task_child_process.js", process.pid);

function longProcess(){
    for (let i = 0; i < 5_000_000_000; i++) {
           
    }
}
process.on("message", (data) => {

    if(data.command === "start"){
        longProcess();
        process.send({status: "complete"});
    }

})


