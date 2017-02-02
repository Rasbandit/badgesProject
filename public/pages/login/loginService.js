angular.module('badgeApp').service('loginService', function($http) {
	
	// this.loginLocal = function(credentials) {
	// 	return $http({
	// 		method: "POST",
	// 		url: '/auth/local',
	// 		data: credentials
	// 	})
	// 	.then(function(res) {
	// 		console.log(res.data);
	// 		return res.data;
	// 	})
	// 	.catch(function(err) {
	// 		console.log('ERROR LOGGING IN!', err);
	// 	})
	// };
	
	// this.getUser = function() {
	// 	return $http({
	// 		method: 'GET',
	// 		url: '/auth/me'
	// 	})
	// 	.then(function(res) {
	// 		console.log(res.data);
	// 		return res.data;
	// 	})
	// 	.catch(function(err) {
	// 		console.log(err);
	// 	})
	// };
	
	this.logout = () =>{
		return $http({
			method: 'GET',
			url: '/auth/logout'
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		})
	};
	
	this.checkForToken = (token) => {
		if (token) {
			sessionStorage.setItem('myToken', token)
		}
	}
});

