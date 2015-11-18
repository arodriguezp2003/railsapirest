angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,socket) {

  $scope.products = [];
  $http.get(API + 'products').success(function(data){
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
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
