angular.module('badgeApp').service('badgeService', function($http, $q) {
	
	//Api call to get user badge info
	this.getBadges = (id) => {
		return $http({
			method: 'GET',
			url: '/badges/' + id
		})
	};
});