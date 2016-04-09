
(function(app) {
    'use strict';

    app.factory("MonthPicker", ["$rootScope", "$ionicPopup", function($rootScope, $ionicPopup) {
        var scope;

        return {
            init: function(options) {
                scope = $rootScope.$new();

                scope.minMonthIndex = options.minMonthIndex || 0;
                scope.minYear = options.minYear || new Date().getFullYear();
                scope.maxMonthIndex = options.maxMonthIndex || new Date().getMonth();
                scope.maxYear = options.maxYear || new Date().getFullYear();

                scope.monthLabels = options.monthLabels;
                scope.title = options.title || "Select month";
                scope.cancelText = options.cancelText || "Cancel";

                scope.selection = {};

                scope.selection.year = scope.maxYear;

                scope.changeYear = function(index) {
                    scope.selection.year += index;
                };

                scope.isValidMonth = function(index) {
                    var result = (index < scope.minMonthIndex && scope.minYear == scope.selection.year) ||
                        ( index > scope.maxMonthIndex && scope.selection.year == scope.maxYear) ||
                        scope.selection.year < scope.minYear ||
                        scope.selection.year > scope.maxYear;
                    return ! result;
                }
            },
            show: function(callback) {
                scope.selectMonth = function(index) {
                    if (scope.isValidMonth(index)) {
                        console.log("valid");
                        scope.selection.month = index;
                        popup.close();
                    }
                };

                var popup = $ionicPopup.show({
                    templateUrl: "monthpicker.html",
                    title: scope.title,
                    scope: scope,
                    buttons: [
                        {
                            text: scope.cancelText,
                            type: 'button-assertive'
                        }
                    ]
                });

                popup.then(function(res) {
                    callback(scope.selection);
                });
            }
        };
    }]);

}(angular.module("ionic-monthpicker")));