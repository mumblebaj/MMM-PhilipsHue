var NodeHelper = require('node_helper')
var fetch = require('node-fetch')

module.exports = NodeHelper.create ({
    requiresVersion: '2.22.0',
    
    start: function() {
        console.log('Starting node_helper for module: ' + this.name)
    },

    getLights: async function(payload) {
        var url = "http://" + payload.bridgeip + "/api/" + payload.userid + "/" + payload.lightsOrGroups;
        
        var response = await fetch(url)
        if (!response.status == 200) {
            console.error(`Error retrieving data: ${response.statusCode} ${response.statusText}`)
            return;
        }

        var result = await response.json()
        
        this.sendSocketNotification("lightsorgroups", result)
    },

    getGroups: async function(payload) {
        var url = "http://" + payload.bridgeip + "/api/" + payload.userid + "/" + payload.lightsOrGroups;
        
        var response = await fetch(url)
        if (!response.status == 200) {
            console.error(`Error retrieving data: ${response.statusCode} ${response.statusText}`)
            return;
        }

        var result = await response.json()
        
        this.sendSocketNotification("lightsorgroups", result)
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "huelights") {
            
            this.getLights(payload)
        } else if (notification === "huegroups") {
            
            this.getGroups(payload)
        }
    }

})