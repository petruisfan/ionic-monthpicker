
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