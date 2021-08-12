const fs = require('fs');
const chalk = require("chalk");
const {Transform} = require("stream");

// process.stdin.on("data", (data) => {
//     console.log(data.toString());
// });

// process.stdin.on("data", (data) => {
//     process.stdout.write(data);
// });

//pipe
//process.stdin.pipe(process.stdout);

//read stream ==> mode ==> pull(readable) or push(data event)
const rStream = fs.createReadStream("./data.txt", { highWaterMark: 1000});
rStream.on("error", (err) => {
    console.log("error", err);
})


let count = 0;
rStream.on("data", (chunk) => {

    count++;
    console.log(chalk.yellowBright.inverse("******************chunk start**************"));
    console.log( chunk.toString());
    console.log(chalk.yellowBright.inverse("******************chunk end**************"));
});

rStream.on("end", () => {
    console.log("end of stream", count);
})

//transform

const transform = new Transform({
    transform: function(chunk, encoding, callback){

        const output = chunk.toString().toUpperCase();
        callback(null, output);
    }
});

process.stdin.pipe(transform).pipe(process.stdout);



