var fs = require('fs')

var config = JSON.parse(fs.readFileSync("./server/config.json"))

module.exports = {
    config : config,
}
