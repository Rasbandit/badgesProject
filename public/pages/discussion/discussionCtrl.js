angular.module('badgeApp').controller('discussionCtrl', function($scope,  userService, discussionService, $state) {
	
	$scope.user = userService.currentUser;

	
	if(!userService.currentUser){
		$state.go('login');
		return
	}
	
	
	let getMessages = () => {
		discussionService.getMessages().then(function(r){
			$scope.messages = r.data;
		});
	};
	getMessages();
	
	
	
	$scope.postMessage = (message) => {
		let date = new Date();
		console.log($scope.user);
		discussionService.postMessage($scope.user.id, $scope.user.display_name, message, date).then(function(res) {
			getMessages();
		})
	};
	
});


