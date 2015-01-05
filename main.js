(function() {
    'use strict';

    var app = angular.module('app', []);


    MainController.$inject = [ '$scope', '$log', '$window' ];
    app.controller('MainController', MainController);

    function MainController($scope, $log, $window) {
        var vm = this;

        $window.navigator.getBattery().then(success, failure);

        function success(batteryManager) {
            var be = [ 'charging', 'chargingtime', 'dischargingtime', 'level' ];
            be.forEach(function(e) {
                batteryManager.addEventListener(e + 'change', update);
            });
            vm.battery = batteryManager;
            update();
        }

        function failure() {
            $log.error('Failed to get battery');
        }

        function update() {
            $scope.$digest();
        }
    }


    percent.$inject = [];
    app.filter('percent', percent);

    function percent() {
        return function(decimal) {
            if (typeof decimal === 'number') {
                return Math.floor(decimal * 100) + '%' ;
            } else {
                return 'N/A';
            }
        };
    }


    time.$inject = [ '$filter' ];
    app.filter('time', time);

    function time($filter) {
        return function(duration) {
            if (isFinite(duration)) {
                return $filter('date')(duration * 1000, 'HH:mm:ss');
            } else {
                return 'N/A';
            }
        };
    }

}());
