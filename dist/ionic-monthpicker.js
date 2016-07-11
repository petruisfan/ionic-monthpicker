
(function() {
    'use strict';
    angular.module("ionic-monthpicker", ['ionic']);
}());

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
                scope.maxMonthIndex = options.maxMonthIndex || new Date().getMonth();
                scope.maxYear = options.maxYear || new Date().getFullYear();

                scope.monthLabels = options.monthLabels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                scope.title = options.title || "Select month";
                scope.cancelText = options.cancelText || "Cancel";
                scope.cancelClass = options.cancelClass || 'button-assertive';
                //
                // What user selects
                //
                scope.selection = {};

                scope.selection.year = options.startingYear || scope.maxYear;
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
                    callback(scope.selection);
                });
            }
        };
    }]);

}(angular.module("ionic-monthpicker")));

angular.module("ionic-monthpicker").run(["$templateCache", function($templateCache) {$templateCache.put("monthpicker.html","<div><style>.month-cell {\n            border: 1px solid #ccc;\n            text-align: center;\n            padding: 10px;\n        }\n        .month-cell.dark {\n            background: #ddd;\n        }\n        .year {\n            font-size:30px;\n        }</style><div class=\"row year\"><div class=\"col col-25\" ng-click=\"changeYear(-1)\"><i class=\"ion ion-chevron-left\"></i></div><div class=\"col col-50 text-center\"><strong>{{ selection.year }}</strong></div><div class=\"col col-25 text-right\" ng-click=\"changeYear(1)\"><i class=\"ion ion-chevron-right\"></i></div></div><div ng-repeat=\"month in monthLabels\"><div class=\"row\" ng-if=\"$index % 3 == 0\" style=\"padding:0\"><div class=\"col col-33 month-cell\" ng-class=\"{dark: ! isValidMonth($index)}\" ng-click=\"selectMonth($index)\">{{ monthLabels[$index] }}</div><div class=\"col col-33 month-cell\" ng-class=\"{dark: ! isValidMonth($index + 1)}\" ng-click=\"selectMonth($index + 1)\">{{ monthLabels[$index + 1] }}</div><div class=\"col col-33 month-cell\" ng-class=\"{dark: ! isValidMonth($index + 2)}\" ng-click=\"selectMonth($index + 2)\">{{ monthLabels[$index + 2] }}</div></div></div></div>");}]);