const express = require('express');
const fs = require('fs');
const cp = require("child_process");
const {Worker} = require("worker_threads");



//creates the Node Express Application
const app = express();

const products = [];

function loadProducts() {
    products.push({ id: 1, name: "IPhone 11", description: "Smart Mobile Device", price: 70000 });
    products.push({ id: 2, name: "Dell Inspiron", description: "Enty level Laptop", price: 50000 });
    products.push({ id: 3, name: "Logitech Heapphones", description: "Communicator", price: 5000 });
    products.push({ id: 4, name: "XBox One", description: "Gaming Device", price: 40000 });
}
loadProducts();

//************Middlewares****************/

//json parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//logging
function logging (req, resp, next) {

    console.log("Handling request ", process.pid);
    next();
}
app.use(logging);

// app.use((req, resp, next) => {

//     console.log("Handling request ", process.pid);
//     next();
// });
//cors
app.use((req, resp, next) => {

    resp.append("Access-Control-Allow-Origin", "*");
    resp.append("Access-Control-Allow-Methods", "*");
    resp.append("Access-Control-Allow-Headers", "*");
    next();
});


//************Endpoints****************/

///request method==> GET, POST, PUT, DELETE
/// request path

// http://localhost:9000/
app.get("/", (request, response) => {

    response.writeHead("200", { "content-type": "text/html" });
    response.write("<html>");
    response.write("<head></head>");
    response.write("<body>");
    response.write("<h2>Welcome to the Express Application</h2>");
    response.write("</body>");
    response.write("</html>");
    response.end();
})

// http://localhost:9000/about
app.get("/about", (request, response) => {

    setTimeout(() => {

        response.writeHead("200", { "content-type": "text/html" });
        response.write("<html>");
        response.write("<head></head>");
        response.write("<body>");
        response.write("<h4>This is a sample training application</h4>");
        response.write("</body>");
        response.write("</html>");
        response.end();

    }, 1000);

});

//REST Endpoints
// CRUD operations of a resourse(products)

// Fetch All the products --    /products      GET
// Fetch a product by the id -- /products/:id  GET
// Create a new product         /products      POST
// Update product               /products      PUT/PATCH  POST
// Delete product by id         /products/:id  DELETE

// Data Format : JSON or XML or PLAIN TEXT or HTML
// Content Negotiation : Client requesting for the data in a specific format -- Accept Header: MIME Type


//Protocol: Http
// Status Codes: 100(Information), 200(Success), 300(Redirect), 400(Client Error), 500(Server Error) 


// Fetch All the products --    /products      GET
app.get("/products", (request, response) => {

    response.json(products); // converts the products to json, status = 200 & end the response

});

// Fetch a product by the id -- /products/:id  GET
app.get("/products/:id", (request, response) => {

    const id = request.params.id;
    const index = products.findIndex(item => item.id == id);
    if (index !== -1) {
        const product = products[index];
        response.json(product);
    }
    else {

        response.status(404);
        response.end();
    }
})

// Delete product by id         /products/:id  DELETE
app.delete("/products/:id", (request, response) => {

    const id = request.params.id;
    const index = products.findIndex(item => item.id == id);
    if (index !== -1) {

        products.splice(index, 1);
        response.status(200);
        response.end();
    }
    else {

        response.status(404);
        response.end();
    }
})

//Post 
app.post("/products", (reqeust, response) => {

    try {

        const product = reqeust.body;
        //validation
        const index = products.findIndex(item => item.id == product.id);
        if (index === -1 && product.name && product.price) {

            //success
            products.push(product);
            response.status(200);
            response.end();
        }
        else {
            //validation failed
            response.status(400)//bad request
            response.end();
        }
    } catch (error) {

        console.log("/products post", error);
        response.status(500); //server error
        response.end();
    }
});

app.get("/task", (req, response) => {


    console.log("Executing task ", process.pid);
    const childTask 
            = cp.fork(__dirname + "/task_child_process.js");

    childTask.send({command: "start"});

    childTask.on("message", (result) => {

        console.log("Executing task  result received ", process.pid);
        if(result.status === "complete"){
            response.writeHead("200", { "content-type": "text/html" });
            response.write("<html>");
            response.write("<head></head>");
            response.write("<body>");
            response.write("<h2>Task Completed</h2>");
            response.write("</body>");
            response.write("</html>");
            response.end();
        }
    });
    
    // setImmediate(function(){

    //     for (let i = 0; i < 5_000_000_000; i++) {
           
    //     }
    
    //     response.writeHead("200", { "content-type": "text/html" });
    //     response.write("<html>");
    //     response.write("<head></head>");
    //     response.write("<body>");
    //     response.write("<h2>Task Completed</h2>");
    //     response.write("</body>");
    //     response.write("</html>");
    //     response.end();

    // })


})

app.get("/worker_demo", (req, response) => {

    console.log("executing worker_demo", process.pid);
    const worker = new Worker(__dirname + "/task_worker.js", {workerData: {data: "hello"}});

    worker.on("message", function(result){

        if(result.status === "complete"){
            response.writeHead("200", { "content-type": "text/html" });
            response.write("<html>");
            response.write("<head></head>");
            response.write("<body>");
            response.write("<h2>Worker Task Completed</h2>");
            response.write("</body>");
            response.write("</html>");
            response.end();
        }
    });

    

   


});

app.get("/fetchMedia", (req, resp) => {

    resp.setHeader("content-type","video/mp4");
    var stream = fs.createReadStream("D:\\temp\\video2.mp4");
    stream.pipe(resp);

})



//Open an HTTP Listener
const port = 9000;
app.listen(9000, () => {
    console.log("Node application running at port " + port + " process: ", process.pid);
})
