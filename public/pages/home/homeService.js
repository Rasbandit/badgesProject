angular.module('badgeApp')
.service('homeService', function($http) {

	this.getWeather = () => {
		return $http({
			method: 'GET',
			url: 'http://api.wunderground.com/api/22e474a581a15228/geolookup/conditions/forecast/q/84601.json'
		})
	};
	
	//Api call to get user badge info
	this.getBadge = (id) => {
		return $http({
			method: 'GET',
			url: '/badge/' + id
		})
	};

});
