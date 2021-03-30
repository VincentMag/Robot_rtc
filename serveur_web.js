
var express = require('express') // serveur Web
var bodyParser = require('body-parser')

var serveur_ws = require("./server/serveur_ws.js")

var config = require('./server/config.js').config


var app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(config.url_static,express.static(config.dossier_static,{index:'./webapp/src/index.html'}))

app.get('/getconfig',function(req,res) {
    res.send(config)
})

app.get('/startwss',function(req,res) {
    // demarrage du serveur ws
    serveur_ws.startWSS(config.arret_serveur_ws);
    // arrêt automatique après "arret_serveur_ws" mn
    res.send({mess : "Envoi demande de lancement serveur ws"})
})

app.get('/stopwss',function(req,res) {
    // arrêt du serveur ws
    serveur_ws.stopWSS();
    res.send({mess : "Envoi demande d'arrêt du serveur ws"})
})

app.post('/info',function(req,res) {
    console.log("robot "+JSON.stringify(req.body))
    console.log("robot "+JSON.stringify(req.query))
    //var o = JSON.parse(req.query.param)
    var m = "Commande info : "
    res.send({mess : m})
})



var serveur_web = app.listen(config.port_web, function() {
    console.log('Lancement serveur Web port ' + config.port_web)
});

console.log("Le serveur web va s'arrêter automatiquement dans " + config.arret_serveur_web + " millisecondes")
setTimeout(() => {
    // arrêt automatique après "arret_serveur_web" minutes
    serveur_web.close()
}, config.arret_serveur_web)