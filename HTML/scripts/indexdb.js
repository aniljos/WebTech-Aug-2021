// create/open the database
var db; //handle the indexedDB(ContactsDB)
if(window.indexedDB){

    const indexedDB = window.indexedDB;
    var openRequest = indexedDB.open("ContactsDB", 1);
    openRequest.onsuccess = function(evt){
        console.log("onsuccess");
        db = evt.target.result;
    }
    openRequest.onerror = function(evt){
        console.log("onerror");
    }
    openRequest.onupgradeneeded = function(evt){
        console.log("onupgradeneeded");
        var db = evt.target.result;
        var objectStore = db.createObjectStore("Contacts", {keyPath: "id", autoIncrement: true});
        //objectStore.createIndex("name")
    }
}
else{
    console.log("IndexedDB not supported");
}