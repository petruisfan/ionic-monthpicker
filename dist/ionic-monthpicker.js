
(function() {
    'use strict';
    angular.module("ionic-monthpicker", ['ionic']);
}());

(function(app) {
    'use strict';

    app.factory("MonthPicker", ["$rootScope", "$ionicPopup", function($rootScope, $ionicPopup) {
        var scope;

        return {
            init: function(options) {
                scope = $rootScope.$new();

                scope.minMonth = options.minMonth;
                scope.maxMonth = options.maxMonth;
                scope.monthLabels = options.monthLabels;
                scope.title = options.title || "Select month";
                scope.cancelText = options.cancelText || "Cancel";

                scope.selection = {};

                scope.selection.year = 2016;

                scope.changeYear = function(index) {
                    scope.selection.year += index;
                };
            },
            show: function(callback) {
                scope.selectMonth = function(index) {
                    scope.selection.month = index;
                    popup.close();
                };

                var popup = $ionicPopup.show({
                    templateUrl: "monthpicker.html",
                    title: scope.title,
                    scope: scope,
                    buttons: [
                        { text: scope.cancelText }
                    ]
                });

                popup.then(function(res) {
                    callback(scope.selection);
                });
            }
        };
    }]);

}(angular.module("ionic-monthpicker")));
angular.module("ionic-monthpicker").run(["$templateCache", function($templateCache) {$templateCache.put("monthpicker.html","<div><div class=\"row\"><div class=\"col col-25\" ng-click=\"changeYear(-1)\"><i class=\"ion ion-chevron-left\"></i></div><div class=\"col col-50 text-center\"><strong>{{ selection.year }}</strong></div><div class=\"col col-25 text-right\" ng-click=\"changeYear(1)\"><i class=\"ion ion-chevron-right\"></i></div></div><div ng-repeat=\"month in monthLabels\"><div class=\"row\" ng-if=\"$index % 3 == 0\"><div class=\"col col-33 text-center\" ng-click=\"selectMonth($index)\">{{ monthLabels[$index] }}</div><div class=\"col col-33 text-center\" ng-click=\"selectMonth($index + 1)\">{{ monthLabels[$index + 1] }}</div><div class=\"col col-33 text-center\" ng-click=\"selectMonth($index + 2)\">{{ monthLabels[$index + 2] }}</div></div></div></div>");}]);