
var url = "https://jsonplaceholder.typicode.com/posts";
var xhr;
function loadData(){

    xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = onStateChange;
    xhr.send(null);
}

function onStateChange(){

    if(xhr.readyState === 4 && xhr.status === 200){
       // console.log("response", xhr.responseText);
        const data = JSON.parse(xhr.responseText);
        console.log("response", data);
    }
}

async function loadBlogs(){

    // fetch(url)
    //     .then(function success(resp){

    //         resp.json()
    //                 .then(function(data){
    //                     console.log("data for fetch", data);
    //                 })

    //     }, function error(resp){
    //         console.log("error", resp);
    //     });

    // async-await ==> Promise
    try {
        
        const response = await fetch(url);
        const data = await response.json();
        console.log("data for fetch", data);
        renderPosts(data);

    } catch (resp) {
        console.log("error", resp);
    }
}

function renderPosts(data){

    var blogsPanel = document.getElementById("blogsPanel");

    data.forEach(function(item){

        var divEl = document.createElement("div");

        var titleEl = document.createElement("p");
        var titleTextEl = document.createTextNode(`Title: ${item.title}`);  //"Title: " + item.title
        titleEl.appendChild(titleTextEl);
        divEl.appendChild(titleEl);
        
        var bodyEl = document.createElement("p");
        var bodyTextEl = document.createTextNode(`Body: ${item.body}`);  
        bodyEl.appendChild(bodyTextEl);
        divEl.appendChild(bodyEl);

        blogsPanel.appendChild(divEl);
    })

}