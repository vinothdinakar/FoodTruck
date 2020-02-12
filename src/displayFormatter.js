'use strict';

/**
 * DisplayFormatter class formats the content and displays to the console screen.
 * The function will also wait for user input for further activity
 *
 * @type {require} console.table - package to draw the console output in tabular format
 * @type {require} readline-sync - package to get user input from console
 * @type {require} chalk - package to format the style and color of the console output
 */

var cTable = require('console.table');
var getUserInput = require('readline-sync');
var chalk = require('chalk');

var displayFormatter = function () {

    var displayStart = 0;
    var numberOfTruckToDisplay = 10;
    var displayEnd = displayStart + numberOfTruckToDisplay;
    var sortedTrucksToDisplay;
    var trucksToDisplayTotalCount;
    var displaySNO = 0;

    /**
     * StartDisplay function initiates the process to display the find result in the console screen.
     *
     * @param truckList List of open trucks available at this time.
     */
    this.startDisplay = function (truckList) {
        trucksToDisplayTotalCount = truckList.length;
        sortedTrucksToDisplay = sortTruckList(truckList);

        // This if check is to handle the scenario when the total number of
        // open truck is less than one screen display.
        if (trucksToDisplayTotalCount < numberOfTruckToDisplay) {
            displayEnd = trucksToDisplayTotalCount;
        }

        printDisplay(sortedTrucksToDisplay.slice(displayStart, displayEnd));
        displayUserActionTextAndWait();
    };

    /**
     * The utility function is used to sort the trucks in the alphabetical order.
     *
     * @param truckList List of open trucks available at this time.
     * @returns {Array} Alphabetically sorted list of open trucks.
     */
    var sortTruckList = function (truckList) {
        truckList.sort(function (a, b) {
            var truckA = a['applicant'].toLowerCase();
            var truckB = b['applicant'].toLowerCase();

            if (truckA < truckB) {
                return -1;
            }
            if (truckA > truckB) {
                return 1;
            }
        });
        return truckList;
    };

    /**
     * PrintDisplay function reads the required properties and displays in the console in a table format.
     *
     * @param truckList List of open trucks available at this time.
     */
    var printDisplay = function (truckList) {
        var _truckList = truckList.map(function (eachItem) {
            return {
                'SNO': ++displaySNO,
                'NAME': eachItem['applicant'],
                'ADDRESS': eachItem['location']
            }
        });
        // This function prints the output in table format to the console
        console.table(_truckList);
    };

    /**
     * DisplayNextLimit function displays the next set of open trucks in the console and wait for user input.
     *
     */
    var displayNextLimit = function () {
        displayStart+=numberOfTruckToDisplay;
        displayEnd = displayStart + numberOfTruckToDisplay;
        if (displayEnd >= trucksToDisplayTotalCount) {
            displayEnd = trucksToDisplayTotalCount;
        }
        printDisplay(sortedTrucksToDisplay.slice(displayStart, displayEnd));
        displayUserActionTextAndWait();
    };

    /**
     * This function displays the information to the user and wait for user input.
     * User can type 'n' for next set of open trucks.
     * User can type 'e' to exit the program.
     *
     */
    var displayUserActionTextAndWait = function () {
        var validUserInput = false;
        var displayString = 'Currently displaying ' + (displayEnd - displayStart) + ' trucks from '
            + (displayStart + 1) + ' to ' + displayEnd + '.';
        var displayInputString = 'Type \'n\' to display more trucks. Type \'e\' to exit.';
        var displayInvalidInputString = 'Invalid entry. Type \'n\' to display more trucks or \'e\' to exit.';

        console.log(chalk.yellow(displayString));
        if (displayEnd != trucksToDisplayTotalCount) {
            console.log(chalk.yellow(displayInputString));
            while (validUserInput == false) {
                var userInput = getUserInput.question('>');
                //console.log('userInput '+userInput);

                if (userInput === 'e') {
                    validUserInput = true;
                }
                else if (userInput === 'n' ) {
                    validUserInput = true;
                    displayNextLimit();
                }
                else {
                    console.log(chalk.yellow(displayInvalidInputString));
                }
            }
        }
    };


};

module.exports = displayFormatter;