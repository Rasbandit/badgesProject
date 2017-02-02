angular.module('badgeApp').controller('loginCtrl', function($scope, loginService, $state, $stateParams) {
	
	if(!userService.currentUser){
		$state.go('login')
		return
	}
	
	loginService.checkForToken($stateParams.token);
	
	// function getUser() {
	// 	console.log('ctrl getUser function');
	// 	loginService.getUser().then(function(user) {
	// 		if (user) $scope.user = user.username;
	// 		else   $scope.user = 'Please login';
	// 	})
	// }

	
	
	// $scope.loginLocal = function(username, password) {
	// 	console.log('Logging in with', username, password);
	// 	loginService.loginLocal({
	// 		username: username,
	// 		password: password
	// 	})
	// 	.then(function(response) {
	// 		getUser();
	// 	})
	// };
	
	$scope.logout = loginService.logout;
	
});
