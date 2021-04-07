
var WebSocket = require('ws')
var config = require('./config.js').config
var message = require("./client/message.js").message

var ws = new WebSocket('ws://'+config.serveur+':' + config.port_ws)

// le client va se deconnecter au bout de 60 secondes
setTimeout(() => {
	ws.close()
}, 1000 * 60)

ws.on('open', function open() {
	console.log("Connexion WS établie")
	//envoi d'un objet Javascript
	var mess = message("robot","ihm","Nouveau client ROBOT WS")
	ws.send(JSON.stringify(mess))
})

ws.on('close', () => {
	console.log("Le client WS s'arrête")
})

// réception de messages
ws.on('message', function incoming(data) {
	console.log("Message du serveur WS " + data)
	console.log(JSON.parse(data))
});