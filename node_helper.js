var NodeHelper = require('node_helper')
var fetch = require('node-fetch')

module.exports = NodeHelper.create ({
    start: function() {
        console.log('Starting node_helper for module: ' + this.name)
    },

    getLights: async function(payload) {
        var url = "http://" + this.payload.bridgeip + "/api/" + this.payload.userid + "/" + this.payload.lightsOrGroups;
        var response = await fetch(url)
        if (!response.status == 200) {
            console.error(`Error retrieving data: ${response.statusCode} ${response.statusText}`)
            return;
        }

        var result = await response.json()
        console.log(result)
        this.sendSocketNotification("lightsorgroups", this.result)
    },

    getGroups: async function(payload) {
        var url = "http://" + this.payload.bridgeip + "/api/" + this.payload.userid + "/" + this.payload.lightsOrGroups;
        var response = await fetch(url)
        if (!response.status == 200) {
            console.error(`Error retrieving data: ${response.statusCode} ${response.statusText}`)
            return;
        }

        var result = await response.json()
        console.log(result)
        this.sendSocketNotification("lightsorgroups", this.result)
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "huelights") {
            console.log("Payload Received: " + payload)
            this.getLights(payload)
        } else if (notification === "huegroups") {
            console.log("Payload Received: " + payload)
            this.getGroups(payload)
        }
    }

})