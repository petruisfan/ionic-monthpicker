
(function() {
    'use strict';
    angular.module("ionic-monthpicker", ['ionic']);
}());

(function(app) {
    'use strict';

    app.factory("MonthPicker", ["$rootScope", "$ionicPopup", function($rootScope, $ionicPopup) {

        var _config = {};

        return {
            config: function(options) {
                _config.minMonth = options.minMonth;
                _config.maxMonth = options.maxMonth;
                _config.monthLabels = options.monthLabels;
            },
            show: function(callback) {
                var scope = $rootScope.$new();
                scope.data = {};

                $ionicPopup.show({
                    templateUrl: "monthpicker.html",
                    title: 'Enter Wi-Fi Password',
                    subTitle: 'Please use normal things',
                    scope: scope,
                    buttons: [
                        { text: 'Cancel' },
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                if (!scope.data.wifi) {
                                    e.preventDefault();
                                } else {
                                    return scope.data.wifi;
                                }
                            }
                        }
                    ]
                }).then(function(res) {
                    callback(res)
                });
            }
        };
    }]);

}(angular.module("ionic-monthpicker")));
angular.module("ionic-monthpicker").run(["$templateCache", function($templateCache) {$templateCache.put("monthpicker.html","<div><input ng-model=\"data.wifi\" type=\"text\" placeholder=\"Text\"></div>");}]);