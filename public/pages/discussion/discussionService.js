angular.module('badgeApp').service('discussionService', function($http){
	
	this.getMessages = function() {
		return $http ({
			method: 'GET',
			url: '/getMsg'
		})
	};
	
	
	this.postMessage = (userId, name, message, time) => {
		return $http({
			method: 'POST',
			url: '/postMsg',
			data: {
				userId: userId,
				name: name,
				message: message,
				time: time
			}
		})
	};
	
	
});

