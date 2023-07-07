//.load ./Organized-programming-tools.js
////seperate functions and data. tidy code. Explanation on where things are and how it works. Seperate out the samples.
//fix function names

const WebSocketServer = require("ws");

const wss = new WebSocketServer.Server({ port: 8080 });

//Send Messages to Clients:
function sendMessageToClients(message) {
    let formatted = JSON.stringify(message);
    //Send to all clients
    wss.clients.forEach((x) => {
        x.send(formatted);
    });
}

function safeSplice(inputArray, amountToRemove,indexToRemove,replaceWith) {
  let array1 = inputArray.slice(0, indexToRemove )
if (replaceWith!=undefined){
array1.push(replaceWith)}
  let array2 = inputArray.slice(indexToRemove + amountToRemove, inputArray.length)
  return array1.concat(array2)
    }

let clients = [];

let newResponseTimes = []

let commands = [
    {
        action: "hi",
        func: function () {
            console.log("hi");
        },
    },{
        action: "recordResponseTime",
        func: function (info){
            newResponseTimes.push(info.date)
        }
    }
];

//receiveCommand:
function receiveCommands(obj, client) {
    commands.forEach((x) => {
        if (obj.action == x.action) {
            x.func(obj.info);
        }
    });
}

// Creating connection using websocket
wss.on("connection", (ws) => {
    console.log("new client connected");
    addNewClients()
    ws.onmessage = (e) => {
        console.log('data received')
        let data = JSON.parse(e.data)
        if (data != undefined) {
            //console.log("command received",e.target, e.data);
            receiveCommands(data, e.target);
        }
    };
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        removeClient(ws)
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred");
    };
});

/*
//call this changeToJSON:
function createFormat(message, color, size, log) {
    return JSON.stringify({
        message: message,
        size: size,
        color: color,
        log: log,
    });
}
*/

function messageAllClients(message) {
    let formatted = JSON.stringify(message);
    wss.clients.forEach((x) => {
        x.send(formatted);
    });
}

function messageSpecifiedClient (message, target){
    if (typeof message != 'string'){
        message = JSON.stringify(message)
    }
    if (typeof target == 'number'){
        try{
            clients[target].send(message)
        }
        catch{
            console.error('Index in clients array not found. Please provide a valid index')
        }
    }
    else if (typeof target == 'string'){
        try{
            findTargetClientByName(target).send(message)
        }
        catch{
            console.error('Target name not found! \nError from messageAllClients function. The requested target name was', target)
        }
    }
    else{
        console.error('Invalid target selection method. Provide their index in the clients array or the name given to them')
    }
}

function findTargetClientByName (name){
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].name == name){
            return clients[i]
        }
    }
}

async function addNewClients (){
    let newClientArray = [...wss.clients.values()]
    let originalTime = new Date().getTime()
    clients.push(newClientArray[newClientArray.length - 1])
    for (let i = 0; i < 4; i++) {
        messageSpecifiedClient({action: 'getResponseTime'}, clients.length - 1)
    }
    clients[clients.length - 1].index = clients.length - 1
    await new Promise((resolve,reject) => {
       setInterval(() => {
            if (newResponseTimes.length == 4){
                let responseTimeInMilliseconds = newResponseTimes.map(x => {return x - originalTime})
                clients[clients.length - 1].responseTime = responseTimeInMilliseconds.reduce((a, b) => a + b, 0) / 4 
                newResponseTimes = []
                resolve(true)
            }
       },10)
    })
}

//Reduce: https://stackoverflow.com/a/43363105/19515980

function removeClient (clientToRemove){
    wipeClientData(clientToRemove)
    //might want to fix schedule too
}

function wipeClientData (clientToRemove){
    console.log("\x1b[31m", 'Removing Client', clientToRemove.index, 'data')
    console.log('clientToRemove.index', clientToRemove.index)
    clients = safeSplice(clients, 1, clientToRemove.index)
    for (let i = 0; i < clients.length - clientToRemove.index; i++) {
        clients[clientToRemove.index + i].index = clientToRemove.index + i
    }
    return true
}

//Color logging: https://stackoverflow.com/a/41407246/19515980

//messageAllClients({action:'loadSVG',info:filesArray[randomRange(0,filesArray.length-1)]})

//messageAllClients({action:'animate',info:['size',[0,500,100,100]]})

//Differenciate client part of inspiration from my old and this stack overflow link: https://stackoverflow.com/questions/13364243/websocketserver-node-js-how-to-differentiate-clients
