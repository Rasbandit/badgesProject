angular.module('badgeApp').service('userService', function($http){
	
	this.currentUser = {};
	
	this.isLoggedIn = function(){
		return $http({
			method: 'GET',
			url: '/loggedIn'
		});
	};

});
