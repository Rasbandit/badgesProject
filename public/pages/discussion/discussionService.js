angular.module('badgeApp').service('discussionService', function($http){
	
	this.getMessages = function() {
		return $http ({
			method: 'GET',
			url: '/getMsg'
		})
	}
	
	
	this.postMessage = (function(id, name, message, time) {
		return $http({
			method: 'POST',
			url: '/postMsg',
			data: {
					id: id,
					name: name,
					message: message,
					time : time
				}
		});
	});
	
	
});

