angular.module('badgeApp').controller('discussionCtrl', function($scope,  userService, discussionService, $state) {
	
	$scope.user = userService.currentUser;
	const user = userService.currentUser;
	
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
		discussionService.postMessage(user.id, user.display_name, message).then(function(res) {
			getMessages();
		})
	};
	
});


