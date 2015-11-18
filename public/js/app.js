var app =  angular.module('realtime', []);





app.factory('socket', function ($rootScope) {
  var socket = io.connect("http://192.168.1.111:5001");
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});




app.controller('indexController',function($scope, $http, socket){
  $scope.products = [];
  $http.get('/api/v1/products').success(function(data){
    if(data.result == "ACK"){
        $scope.products = data.obj;
    }
  });

  socket.on('rt-change',function(data){
    console.log(data);

    if(data.action=="create") {
        $scope.products.push(data.obj);
    }
  })

  $scope.save = function() {
    var data = {
      sku: $scope.product.sku,
      description: $scope.product.description,
      price: $scope.product.price

    }
    $http.post('/api/v1/product/add', data).success(function(data){
      if(data.result== 'NACK'){
        alert(data.message);
      }

    });

  };

});
