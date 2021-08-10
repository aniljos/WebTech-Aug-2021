self.addEventListener("message", function(message){

    if(message.data === "startTask"){
        var result = executeTask();
        this.self.postMessage(result);
    }
})

function executeTask(){

    for (let i = 0; i < 5000000000; i++) { 
    } ;
    return "Task done";
    //window.alert("")
}