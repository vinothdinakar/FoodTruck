'use strict';

/**
 * TruckFetcher - The class calls the api and fetches the list of trucks.
 *
 * @type {request} request package to make api calls
 */

var request = require('request');

var truckFetcher = function () {

    var dataUrl = 'https://data.sfgov.org/resource/jjew-r69b.json';

    /***
     * The function uses the request module to call the api and fetch the list of trucks.
     * Passes the list of trucks to the callback function
     *
     * @param processDataFn - callback function
     */
    this.fetchData = function (processDataFn) {
        var options = {
            url: dataUrl, // Socrata url to fetch the trucks
            qs: {
                $$app_token: 'g7JWl1D2PygvTZkFtkYuozir4' // Access token provide by Socrata
            },
            json: true // Automatically parses the JSON string in the response
        };

        request(options, function (error, response, body) {
            //console.time('findTruck');
            if (error) {
                console.log('Unable to fetch data. Error reason: ' + error);
            }
            else if (body) {
                if (!body.length) {
                    if (body.error) {
                        console.log('Unable to fetch data. Error reason: ' + body.code);
                    }
                    else {
                        console.log('Unable to fetch data.');
                    }
                    return;
                }
                console.log('Total Number of Trucks in API data: ' + body.length);
                processDataFn(body);
                //console.timeEnd('findTruck');
            }
            else {
                console.log('Unable to fetch data. Unknown error.');
            }
        });
    };

};

module.exports = truckFetcher;