const express = require('express');

//creates the Node Express Application
const app = express();

const products = [];

function loadProducts(){
    products.push({id: 1, name: "IPhone 11", description: "Smart Mobile Device", price: 70000});
    products.push({id: 2, name: "Dell Inspiron", description: "Enty level Laptop", price: 50000});
    products.push({id: 3, name: "Logitech Heapphones", description: "Communicator", price: 5000});
    products.push({id: 4, name: "XBox One", description: "Gaming Device", price: 40000});
}
loadProducts();

///request method==> GET, POST, PUT, DELETE
/// request path

// http://localhost:9000/
app.get("/", (request, response) => {

    response.writeHead("200", {"content-type": "text/html"});
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

        response.writeHead("200", {"content-type": "text/html"});
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
app.get("/products/:id", (request, response)=> {

    const id = request.params.id;
    const index = products.findIndex(item => item.id == id);
    if(index !== -1){
        const product = products[index];
        response.json(product);
    }
    else{

        response.status(404);
        response.end();
    }
})

// Delete product by id         /products/:id  DELETE
app.delete("/products/:id", (request, response) => {

    const id = request.params.id;
    const index = products.findIndex(item => item.id == id);
    if(index !== -1){
        
        products.splice(index, 1);
        response.status(200);
        response.end();
    }
    else{

        response.status(404);
        response.end();
    }
})


//Open an HTTP Listener
const port = 9000;
app.listen(9000, () => {
    console.log("Node application running at port " + port);
})
