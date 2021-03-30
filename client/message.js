function message(srce,dest,cmd,arg) {
    if(typeof arg === 'undefined') arg = ""
    var bloc = {
           srce : srce, // émetteur du message (ex: ihm)
           dest : dest, // destinataire du message (ex: robot)
           cmd : cmd,   // commande (ex: avancer)
           arg : arg,
           time : new Date().getTime()
       }
   return bloc;
}

module.exports = {
    message : message
}

