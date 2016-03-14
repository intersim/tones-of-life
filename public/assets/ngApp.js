'use strict';

var tones = angular.module('tones', []);

'use strict';

tones.controller('tonesCtrl', function($scope, $http, $log) {

  $scope.test = "hello world";

  // load sampler audio
  $http.get('/samples/marimba/ogg/')
  .then(res => res.data)
  .then(samplerData => {
    console.log("sampler data: ", samplerData);
    $scope.samplerData = samplerData;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

});