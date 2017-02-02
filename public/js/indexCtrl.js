angular.module('badgeApp').controller('indexCtrl', function($scope, userService, $state, $rootScope){

	$scope.out = false;
	$rootScope.$on('$stateChangeSuccess', function(){
		if ($state.current.name === 'login') {
			$scope.out = false;
		}
		else if($state.current.name === 'home'){
			$scope.out = true;
		}
	})
});
