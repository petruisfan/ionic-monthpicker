
(function(app) {
    'use strict';

    app.factory("MonthPicker", ["$rootScope", "$ionicPopup", function($rootScope, $ionicPopup) {
        var scope;

        return {
            /**
             * Call for initialization
             * @param options
             */
            init: function(options) {
                scope = $rootScope.$new();
                //
                // Options and defaults
                //
                scope.minMonthIndex = options.minMonthIndex || 0;
                scope.minYear = options.minYear || new Date().getFullYear();

                scope.maxMonthIndex = options.maxMonthIndex === undefined?new Date().getMonth():options.maxMonthIndex;

                scope.maxYear = options.maxYear || new Date().getFullYear();

                scope.monthLabels = options.monthLabels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                scope.title = options.title || "Select month";
                scope.cancelText = options.cancelText || "Cancel";
                scope.cancelClass = options.cancelClass || 'button-assertive';
                //
                // What user selects
                //
                scope.selection = {
                    year : options.startingYear || scope.maxYear,
                    month : null // no month selected
                };

                /**
                 * Arrow buttons
                 * @param index
                 */
                scope.changeYear = function(index) {
                    scope.selection.year += index;
                };
                /**
                 * verify month index is in required interval
                 * @param index
                 * @returns {boolean}
                 */
                scope.isValidMonth = function(index) {
                    var invalid = (index < scope.minMonthIndex && scope.selection.year == scope.minYear) ||
                        ( index > scope.maxMonthIndex && scope.selection.year == scope.maxYear) ||
                        scope.selection.year < scope.minYear ||
                        scope.selection.year > scope.maxYear;
                    return ! invalid;
                }
            },
            /**
             * Show the month picker
             * @param callback
             */
            show: function(callback) {
                /**
                 * Tap on month
                 * @param index
                 */
                scope.selectMonth = function(index) {
                    if (scope.isValidMonth(index)) {
                        scope.selection.month = index;
                        popup.close();
                    }
                };
                //
                // Actual popup
                //
                var popup = $ionicPopup.show({
                    templateUrl: "monthpicker.html",
                    title: scope.title,
                    scope: scope,
                    buttons: [
                        {
                            text: scope.cancelText,
                            type: scope.cancelClass
                        }
                    ]
                });

                popup.then(function(res) {
                    //return clone obj not internal private obj
                    callback({
                        year : scope.selection.year,
                        month : scope.selection.month
                    });
                });
            }
        };
    }]);

}(angular.module("ionic-monthpicker")));
