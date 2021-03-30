
// connexion au VPS : ssh gXXXX@vps662945.ovh.net
// création du projet serveur websocket
// mkdir testws
// cd testws
// npm init
// npm install ws
// nano serveurws.js

var config = require('./config.js').config
var WebSocket = require('ws')


var wss = null	// serveur Websocket
var lst = []	// liste des clients connectés

function startWSS(nbms) {
	if (wss != null) {
		console.log("Lancement WSS impossible (déjà lancé)")
		return
	}

	wss = new WebSocket.Server({ port: config.port_ws })
	console.log("Serveur Websocket démarré port " + config.port_ws)

	console.log("Le serveur ws va s'arrêter automatiquement dans " + config.arret_serveur_ws + " millisecondes")
	setTimeout(() => {
		stopWSS()
	}, nbms)


	wss.on('connection', ws => {
		lst.push(ws) // enregistrement du client qui vient de se connecter
		console.log("WSS reçoit nouvelle connexion")

		ws.on('message', message => {
			console.log(`WSS reçoit message : ${message}`)
			diffusion(message)
		});
	});

	wss.on('close', () => {
		console.log("WSS s'arrête")
		wss = null
		lst = []
	})
}

function stopWSS() {
	wss.close()
}


function diffusion(mess) {
	lst.forEach(ws => {
		ws.send(mess)
	})
}

// startWSS(1) // lancement pour 1 minute

module.exports = {
    startWSS : startWSS,
    stopWSS : stopWSS,
}
