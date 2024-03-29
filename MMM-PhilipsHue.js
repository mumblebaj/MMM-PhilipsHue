Module.register("MMM-PhilipsHue", {
    defaults: {
        bridgeip: "",
        userid: "",
        colour: false,
        refreshTime: 60 * 10000,
        animationSpeed: 2 * 1000,
        lightsOrGroups: "lights",
        showOnlyOn: false,
        showLabel: true,
        hideSpecificGroups: false,
        hideGroupsWithString: "hgrp"
    },

    getStyles: function () {
        return ["font-awesome.css", "MMM-PhilipsHue.css"];
    },

    getTranslations: function () {
        return {
            'en': 'translations/en.json',
            'id': 'translations/id.json',
            'sv': 'translations/sc.json',
            'fr': 'translations/fr.json',
        };
    },

    start: function () {
        this.lightsorgroups = this.config.lightsOrGroups;
        this.updateInterval = this.config.refreshTime;
        this.animationSpeed = this.config.animationSpeed;
        this.initialLoadDelay = 0;

        var result = false;
        suspended = false;

        this.getData();

        setInterval(() => {
            this.getData();
        }, this.updateInterval);
    },

    stop: function () {
        Log.info('Stopping module ' + this.name);
    },

    resume: function () {
        Log.info('Resuming module ' + this.name);
        Log.debug('with config: ' + JSON.stringify(this.config));
        this.suspended = false;
        this.updateDom()
    },

    suspend: function () {
        Log.info('Suspending module ' + this.name);
        this.suspended = true;
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        //alert("http://" + this.config.bridgeip + "/api/" + this.config.userid + "/" + this.config.lightsorgroups);

        if (this.result) {

            var table = document.createElement("table");
            table.classList.add("small", "table", "align-left");

            if (this.config.showLabel)
                table.appendChild(this.createLabelRow());

            var lamps = Object.keys(this.result);

            for (var i = 0; i < lamps.length; i++) {
                var groupName = this.result[lamps[i]].name;
                //console.debug(groupName, groupName.includes('hgrp'));
                if (this.config.lightsOrGroups === "groups") {
                    if (this.config.showOnlyOn) {
                        if (this.config.hideSpecificGroups && !this.config.hideGroupsWithString.includes(groupName)) {
                            if (this.result[lamps[i]].state.all_on || this.result[lamps[i]].state.any_on) {
                                domAction(this.result, lamps[i], this.config);
                            }
                        } else if (!this.config.hideSpecificGroups) {
                            domAction(this.result, lamps[i], this.config);
                        }
                    } else {
                        if (this.config.hideSpecificGroups && !this.config.hideGroupsWithString.includes(groupName)) {
                            domAction(this.result, lamps[i], this.config);
                        } else if (!this.config.hideSpecificGroups) {
                            domAction(this.result, lamps[i], this.config);
                        }
                    }
                } else {
                    if (this.config.showOnlyOn) {
                        if (this.config.hideSpecificGroups && !this.config.hideGroupsWithString.includes(groupName)) {
                            if (this.result[lamps[i]].state.on) {
                                domAction(this.result, lamps[i], this.config)
                            }
                        }
                    } else {
                        if (this.config.hideSpecificGroups && !this.config.hideGroupsWithString.includes(groupName)) {
                            domAction(this.result, lamps[i], this.config);
                        } else if (!this.config.hideSpecificGroups) {
                            domAction(this.result, lamps[i], this.config);
                        }
                    }
                }
            }

            function domAction(result, lamp, config) {
                var row = document.createElement("tr");
                var room = document.createElement("td");
                //console.debug(result[lamp]);
                room.innerHTML = result[lamp].name;
                row.appendChild(room);
                var lightsallLabel = document.createElement("td");
                lightsallLabel.classList.add("centered");

                var lightstatus = document.createElement("i");
                lightstatus.classList.add("fa", result[lamp].state.all_on || result[lamp].state.on ? "fa-lightbulb-o" : (result[lamp].state.any_on || result[lamp].state.on ? "fa-adjust" : "fa-times"));
                if (config.colour) {

                    if (result[lamp].state.all_on || result[lamp].state.on) {
                        lightstatus.classList.add("lights-all-on")
                    }
                    else {
                        if (result[lamp].state.any_on) {
                            lightstatus.classList.add("lights-partial-on")
                        }
                    }
                }
                lightsallLabel.appendChild(lightstatus);
                row.appendChild(lightsallLabel);
                table.appendChild(row);
            }
            wrapper.appendChild(table);
        } else {
            wrapper.innerHTML = this.translate("NO_DATA");
            wrapper.className = "dimmed light small";
        }
        return wrapper;
    },

    createLabelRow: function () {

        var labelRow = document.createElement("tr");

        var roomiconlabel = document.createElement("th");
        var typeIcon = document.createElement("room");
        typeIcon.classList.add("fa", "fa-home");
        roomiconlabel.appendChild(typeIcon);
        labelRow.appendChild(roomiconlabel);

        var lightsonlabel = document.createElement("th");
        lightsonlabel.classList.add("centered");
        var typeIcon = document.createElement("lightson");
        //typeIcon.classList.add("fa", "fa-lightbulb-o");
        typeIcon.innerHTML = this.translate("LIGHTS_ON");
        lightsonlabel.appendChild(typeIcon);
        labelRow.appendChild(lightsonlabel);

        var lightsonlabel = document.createElement("th");
        lightsonlabel.classList.add("centered");

        return labelRow;
    },

    getData: function () {
        //console.log(this.config)
        if (this.config.lightsOrGroups === "lights") {
            this.sendSocketNotification("huelights", this.config)
        } else if (this.config.lightsOrGroups === "groups") {
            this.sendSocketNotification("huegroups", this.config)
        }
    },

    socketNotificationReceived: function (notification, payload) {
        var self = this
        if (notification === "lightsorgroups") {
            this.result = payload
            this.updateDom();
        }
    }

})