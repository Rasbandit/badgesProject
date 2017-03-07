angular.module('badgeApp').service('userService', function($http){
	
	this.isLoggedIn = function(){
		return $http({
			method: 'GET',
			url: '/loggedIn'
		})
	};
	
});
