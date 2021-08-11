const fs = require('fs');
const EventEmitter = require("events")


function readTasks(successCallback, errorCallback) {

    fs.readFile("data.json", (err, data) => {

        if (err) {
            // allTasks = [];
            console.log("Error reading file", err);
            errorCallback(err);
            return;
        }

        let allTasks = JSON.parse(data);
        //console.log(allTasks);
        successCallback(allTasks);
    })
}
//readTasks();

function saveTask(taskName, description) {

    return new Promise((resolve, reject) => {

        const task = { taskName, description }; // javaScript object
        readTasks((allTasks) => {

            const index = allTasks.findIndex((item) => item.taskName === taskName);
            if (index !== -1) {
                reject("Task Name already present");
                return;
            }


            allTasks.push(task);
            const json = JSON.stringify(allTasks); // convert the object to JSON

            fs.writeFile("data.json", json, (err) => {

                if (err) {
                    console.log("Error writing", err);
                    reject("Failed to write")
                    return;
                }
                resolve(taskName);
                //console.log("Task saved");
            });

        }, (err) => {
            console.log("Error reading file", err);
            reject("Failed reading file")
        })


    });


}

function fetchAll() {

    return new Promise((resolve, reject) => {

        readTasks((tasks) => {
            resolve(tasks);
        }, (err) => {
            reject(err);
        })

    });
}

class TasksEmitter extends EventEmitter{}
const taskEmitter = new TasksEmitter();

async function deleteTask(taskName){

    try {
        const tasks = await fetchAll();
        const index = tasks.findIndex(item => item.taskName === taskName);
        if(index !== -1){

            tasks.splice(index, 1);
            fs.writeFile("data.json", JSON.stringify(tasks), (err) => {

                if(err){

                    taskEmitter.emit("error", err);
                    return;
                }
                taskEmitter.emit("deleted", "Deleted Task " + taskName);

            });
        }
        else{
            taskEmitter.emit("error", "Task not found");
        }

    } catch (error) {
        taskEmitter.emit("error", error);
    }

}

module.exports = {
    saveTask, fetchAll, deleteTask, taskEmitter
}