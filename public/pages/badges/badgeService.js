angular.module('badgeApp').service('badgeService', function($http, $q) {
	
	//Api call to get user badge info
	this.getBadges = (id) => {
		return $http({
			method: 'GET',
			url: '/badges/' + id
		})
	};


	this.htmlPass = (id, answer) => {
		return $http({
			method: 'PUT',
			url: '/htmlPass',
			data: {
				id : id,
				answer : answer
			}
		})
	};
	
	this.bjsPass = (id, answer) => {
		return $http({
			method: 'PUT',
			url: '/bjsPass',
			data: {
				id : id,
				answer : answer
			}
		})
	};
	
	this.ijsPass = (id, answer) => {
		return $http({
			method: 'PUT',
			url: '/ijsPass',
			data: {
				id : id,
				answer : answer
			}
		})
	};
	
	this.angPass = (id, answer) => {
		return $http({
			method: 'PUT',
			url: '/angPass',
			data: {
				id : id,
				answer : answer
			}
		})
	};
	
	this.nodePass = (id, answer) => {
		return $http({
			method: 'PUT',
			url: '/nodePass',
			data: {
				id : id,
				answer : answer
			}
		})
	};
	
	this.sqlPass = (id, answer) => {
		return $http({
			method: 'PUT',
			url: '/sqlPass',
			data: {
				id : id,
				answer : answer
			}
		})
	};
	
	this.ppPass = (id, answer) => {
		return $http({
			method: 'PUT',
			url: '/ppPass',
			data: {
				id : id,
				answer : answer
			}
		})
	};
	
	this.gpPass = (id, answer) => {
		return $http({
			method: 'PUT',
			url: '/gpPass',
			data: {
				id : id,
				answer : answer
			}
		})
	};
	
});