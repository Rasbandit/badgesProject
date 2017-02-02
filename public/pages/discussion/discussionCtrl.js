angular.module('badgeApp').controller('discussionCtrl', function($scope,  userService, $state) {
	
	if(!userService.currentUser){
		$state.go('login')
		return
	}
	
	
	$scope.currentPage = 1;
	$scope.maxPages = 4;
	
	$scope.getUsers = function(pageNum) {
		$scope.users = mainService.getUsers(pageNum).then(function (response){
			$scope.users = response.data;
			$scope.maxPages = response.total_pages;
		});
	};
	
	
	$scope.postMessage = function(message) {
		messageService.postMessage(message)
		.then(function(res) {
			if (res.data === 'success') {
				getMessages()
			}
		})
	};
	
	
	$scope.getUsers();
	
});


