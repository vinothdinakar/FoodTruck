'use strict';

/***
 * TruckFinder class tries to find out all the open truck available when the program gets executed.
 *
 */

var truckFinder = function () {

    /***
     * The function traverse through the list of input trucks and checks the day order and
     * compares the available time with the current time.
     *
     * @param truckList The list of trucks fetched from the api.
     * @returns {Array} The list of open trucks available when the program gets executed.
     */
    this.getCurrentOpenTrucks = function (truckList) {
        //console.log(truckList[0]);
        var openTruckList = [];
        var today = new Date();
        var today_dayOrder = today.getDay();
        //console.log(today_dayOrder);

        truckList.forEach(function (selectedTruckDetail) {
            var isOpen = false;

            if (selectedTruckDetail['dayorder'] == today_dayOrder) {
                //console.log('Open today');

                // If any of these properties are undefined, the function will return
                if (!selectedTruckDetail['start24'] || !selectedTruckDetail['end24']) {
                    return;
                }
                isOpen = isOpenThisTime(selectedTruckDetail['start24'], selectedTruckDetail['end24']);
                if (isOpen) {
                    openTruckList.push(selectedTruckDetail);
                }
            }
        });
        console.log('Total Number of Open Trucks Available Now: ' + openTruckList.length);
        return openTruckList;
    };

    /**
     * The function checks if the truck is available at the current time using the start and end time from api.
     * 24 hour time format is used for convenience.
     *
     * @param start24 starting of the truck's available time form the api.
     * @param end24 end of the truck's available time form the api.
     * @returns {boolean} If the truck is open at the current time or not.
     */
    var isOpenThisTime = function (start24, end24) {
        var currentHour = (new Date()).getHours();
        var currentMinute = (new Date()).getMinutes();

        var start24_timeOffsetInMilliSeconds = timeOffsetInMilliSeconds(start24);
        var end24_timeOffsetInMilliSeconds = timeOffsetInMilliSeconds(end24);
        var currentTime_timeOffsetInMilliSeconds = timeOffsetInMilliSeconds(currentHour + ':' + currentMinute);

        if (currentTime_timeOffsetInMilliSeconds >= start24_timeOffsetInMilliSeconds &&
            currentTime_timeOffsetInMilliSeconds <= end24_timeOffsetInMilliSeconds) {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * This utility function calculate the offset time in milliseconds from the start of the day to the input time.
     *
     * @param hhmm {string} hour and minutes separated by ':'
     * @returns {number} Number of offset milliseconds from start of the day
     */
    var timeOffsetInMilliSeconds = function (hhmm) {
        var hhmmArr = hhmm.split(':');
        var hourInMilliSecond = hhmmArr[0] * 60 * 60 * 1000;
        var minuteInMilliSecond = hhmmArr[1] * 60 * 1000;
        //console.log(hourInMilliSecond + minuteInMilliSecond);
        return hourInMilliSecond + minuteInMilliSecond;
    };

};

module.exports = truckFinder;