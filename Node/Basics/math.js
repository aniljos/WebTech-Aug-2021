console.log("in the math module");

const version = "1.0";

function compute(a, b){
    return a + b;
}


//export from the module
module.exports = {
    version, compute
}