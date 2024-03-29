# Module: MMM-PhilipsHue
The `MMM-PhilipsHue` module is a third party module for MagicMirror. It is a simple way to display the status of groups or lights in your Philips Hue setup.

Module was forked from MMM-Hue by MitchSS and updated to replace XmlHttpRequest with node-fetch.

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

![Example](images/screenshot.png)

## Support
If you like my module you can support my work by giving me a star ir buy me a coffee.

<a href="https://www.buymeacoffee.com/mumblebaj" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Beer" style="height: 45px !important;width: 180px !important;" ></a>

## Installing the Module
Navigate into your MagicMirror's modules folder and execute <br>
`git clone https://github.com/mumblebaj/MMM-PhilipsHue.git`<br>
`cd ~/MagicMirror/modules/MMM-PhilipsHue/`<br> 
`npm install`

## Updates v1.2.3
- Updated the module to exclude an array of lights when either `groups` and `lights` are selected as `lightsOrGroups`

## Dependencies
- node-fetch@2.6.1

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
{
		    module: 'MMM-PhilipsHue',
		    position: 'top_right',
		    config: {
			bridgeip: "192.168.1.1", //Your Bridge IP
			userid: "my user id", //User ID created in the steps below
			colour: false
		    }
}
````
Please visit [Philips Hue API page](https://www.developers.meethue.com/documentation/getting-started) to get an userid.

## Configuration options

The following properties can be configured:

| Option | Description |
| --- | --- |
| `bridgeip` | The ip address of your Philips Hue Bridge. <br>**Type:** `string` |
| `userid` | This is the user id created to access your Philips Hue Bridge. See here for more details - http://www.developers.meethue.com/documentation/getting-started	<br>**Type:** `string` |
| `colour` | This boolean determines whether the icons should be displayed in colour when the lights are on in a given room. <br>**Type:** `boolean` |
| `refreshTime` | How often should the lamp states refreshed  <br>**Type:** `number` <br>**Default:** 60 * 10000 |
| `animationSpeed` | Animation Speed  <br>**Type:** `number` <br>**Default:** 2 * 1000 |
| `lightsOrGroups` | Should the module show groups or lights <br>**Type:** `string` <br>**Default:** "groups"|
| `showOnlyOn` | If set to true the module shows only the lights which are on <br>**Type:** `boolean` | false |
| `hideSpecificGroups` | Ignore some groups by a given string (requires hideGroupsWithString option) <br>**Type:** `boolean` <br>**Default:** false |
| `hideGroupsWithString` | Ignore an array of groups (requires hideSpecificGroups option to be set as true) <br>Sample array: `["Kitchen", "Den"]` <br>**Type:** `string` |
| `showLabel` | Show header label? <br>**Type:** `boolean` <br>**Default:** true |
