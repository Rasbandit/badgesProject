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
	this.basicStartTime = (id, name, time) => {
		return $http({
			method: 'POST',
			url: '/basicStartTime',
			data: {
				'id' : id,
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp Intermediate JS assessment start time and date to db
	this.intStartTime = (id, name, time) => {
		return $http({
			method: 'POST',
			url: '/intStartTime',
			data: {
				'id' : id,
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp angular assessment start time and date to db
	this.angularStartTime = (id, name, time) => {
		return $http({
			method: 'POST',
			url: '/angularStartTime',
			data: {
				'id' : id,
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp node JS assessment start time and date to db
	this.nodeStartTime = (id, name, time) => {
		return $http({
			method: 'POST',
			url: '/nodeStartTime',
			data: {
				'id' : id,
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	//Stamp SQL assessment start time and date to db
	this.sqlStartTime = (id, name, time) => {
		return $http({
			method: 'POST',
			url: '/sqlStartTime',
			data: {
				'id' : id,
				'name' : name,
				'startTime' : time
			}
		})
	};
	
	
	// -----------------------------------
	
	
	//Stamp html assessment start time and date to db
	this.htmlStartTime = (id, time) => {
		return $http({
			method: 'PUT',
			url: '/htmlEndTime',
			data: {
				'id' : id,
				'startTime' : time
			}
		})
	};
	
	//Stamp basic JS assessment start time and date to db
	this.basicStartTime = (id, time) => {
		return $http({
			method: 'PUT',
			url: '/basicEndTime',
			data: {
				'id' : id,
				'startTime' : time
			}
		})
	};
	
	//Stamp Intermediate JS assessment start time and date to db
	this.intStartTime = (id, time) => {
		return $http({
			method: 'PUT',
			url: '/intEndTime',
			data: {
				'id' : id,
				'startTime' : time
			}
		})
	};
	
	//Stamp angular assessment start time and date to db
	this.angularStartTime = (id, time) => {
		return $http({
			method: 'PUT',
			url: '/angularEndTime',
			data: {
				'id' : id,
				'startTime' : time
			}
		})
	};
	
	//Stamp node JS assessment start time and date to db
	this.nodeStartTime = (id, time) => {
		return $http({
			method: 'PUT',
			url: '/nodeEndTime',
			data: {
				'id' : id,
				'startTime' : time
			}
		})
	};
	
	//Stamp SQL assessment start time and date to db
	this.sqlStartTime = (id, time) => {
		return $http({
			method: 'PUT',
			url: '/sqlEndTime',
			data: {
				'id' : id,
				'startTime' : time
			}
		})
	};
	
	
	
});