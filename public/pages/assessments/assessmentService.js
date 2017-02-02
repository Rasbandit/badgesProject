angular.module('badgeApp').service('assessmentService', function($http, $q) {
	
	//Stamp html assessment start time and date to db
	this.htmlStartTime = (id, name, time) => {
		return $http({
			method: 'POST',
			url: '/htmlStartTime',
			data: {
				'id' : id,
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp basic JS assessment start time and date to db
	this.basicStartTime = (name, time) => {
		return $http({
			method: 'PUT',
			url: '/basicStartTime',
			data: {
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp Intermediate JS assessment start time and date to db
	this.intStartTime = (name, time) => {
		return $http({
			method: 'PUT',
			url: '/intStartTime',
			data: {
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp angular assessment start time and date to db
	this.angularStartTime = (name, time) => {
		return $http({
			method: 'PUT',
			url: '/angularStartTime',
			data: {
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp node JS assessment start time and date to db
	this.nodeStartTime = (name, time) => {
		return $http({
			method: 'PUT',
			url: '/nodeStartTime',
			data: {
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp SQL assessment start time and date to db
	this.sqlStartTime = (name, time) => {
		return $http({
			method: 'PUT',
			url: '/sqlStartTime',
			data: {
				'name' : name,
				'startTime' : time
			}
		})
	};
	
});