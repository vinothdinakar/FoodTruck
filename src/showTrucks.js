'use strict';
/***
 * ShowOpenTrucks - The file imports the necessary classes to start the process. Initiates the process of
 * fetching the trucks, finding the trucks based on the criteria and displaying the result in the screen.
 *
 * @type {require} truckFetcher - local package to fetch the trucks from the api
 * @type {require} truckFinder - local package to search the open trucks at current time
 * @type {require} displayFormatter - local package to structure the console output
 *
 */

var truckFetcher = require('./truckFetcher');
var truckFinder = require('./truckFinder');
var displayFormatter = require('./displayFormatter');

var showOpenTrucks = function () {

    var _truckFetcher = new truckFetcher();
    var _truckFinder = new truckFinder();
    var _displayFormatter = new displayFormatter();

    /**
     * ProcessData function TruckFinder's getCurrentOpenTrucks function by passing
     * the list of all trucks received from the API
     *
     * @param dataBody {Array} List of available Trucks
     */
    var processData = function (dataBody) {
        if (!dataBody || dataBody.length == 0) {
            console.log('Data received from API is Empty or invalid');
            return;
        }
        var openTrucks = _truckFinder.getCurrentOpenTrucks(dataBody);
        //console.timeEnd('findTruck');
        _displayFormatter.startDisplay(openTrucks);
    };

    /**
     * StartProcess initiates the service by calling TruckFetcher's fetchData function
     * passing processData function as callback
     */
    this.startProcess = function () {
        _truckFetcher.fetchData(processData);
    };

};

module.exports = new showOpenTrucks();
