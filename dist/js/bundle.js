'use strict';

angular.module('badgeApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: './pages/home/home.html',
		controller: 'homeCtrl'
	}).state('badges', {
		url: '/badges',
		templateUrl: './pages/badges/badges.html',
		controller: 'badgesCtrl'
	}).state('calendar', {
		url: '/calendar',
		templateUrl: './pages/calendar/calendar.html',
		controller: 'calendarCtrl'
	}).state('assessments', {
		url: '/assessments',
		templateUrl: './pages/assessments/assessments.html',
		controller: 'assessmentsCtrl'
	}).state('discussion', {
		url: '/discussion',
		templateUrl: './pages/discussion/discussion.html',
		controller: 'discussionCtrl'
	}).state('login', {
		url: '/login',
		templateUrl: './pages/login/login.html',
		controller: 'loginCtrl'
	}).state('admin', {
		url: '/admin',
		templateUrl: './pages/admin/admin.html',
		controller: './pages/admin/adminCtrl.js'
	});
});
'use strict';

angular.module('badgeApp').service('userService', function ($http) {

	this.isLoggedIn = function () {
		return $http({
			method: 'GET',
			url: '/loggedIn'
		});
	};

	this.currentUser;
});
'use strict';

angular.module('badgeApp').controller('indexCtrl', function ($scope, userService, $state, $rootScope) {

	$scope.out = false;
	$rootScope.$on('$stateChangeSuccess', function () {
		if ($state.current.name === 'login') {
			$scope.out = false;
		} else if ($state.current.name === 'home') {
			$scope.out = true;
		}
	});
});
"use strict";
'use strict';

angular.module('badgeApp').service('assessmentService', function ($http, $q) {

	//Stamp html assessment start time and date to db
	this.htmlStartTime = function (id, name, time) {
		return $http({
			method: 'POST',
			url: '/htmlStartTime',
			data: {
				'id': id,
				'name': name,
				'startTime': time
			}
		});
	};

	//Stamp basic JS assessment start time and date to db
	this.basicStartTime = function (id, name, time) {
		return $http({
			method: 'POST',
			url: '/basicStartTime',
			data: {
				'id': id,
				'name': name,
				'startTime': time
			}
		});
	};

	//Stamp Intermediate JS assessment start time and date to db
	this.intStartTime = function (id, name, time) {
		return $http({
			method: 'POST',
			url: '/intStartTime',
			data: {
				'id': id,
				'name': name,
				'startTime': time
			}
		});
	};

	//Stamp angular assessment start time and date to db
	this.angularStartTime = function (id, name, time) {
		return $http({
			method: 'POST',
			url: '/angularStartTime',
			data: {
				'id': id,
				'name': name,
				'startTime': time
			}
		});
	};

	//Stamp node JS assessment start time and date to db
	this.nodeStartTime = function (id, name, time) {
		return $http({
			method: 'POST',
			url: '/nodeStartTime',
			data: {
				'id': id,
				'name': name,
				'startTime': time
			}
		});
	};

	//Stamp SQL assessment start time and date to db
	this.sqlStartTime = function (id, name, time) {
		return $http({
			method: 'POST',
			url: '/sqlStartTime',
			data: {
				'id': id,
				'name': name,
				'startTime': time
			}
		});
	};

	// -----------------------------------


	//Stamp html assessment start time and date to db
	this.htmlEndTime = function (id, time) {
		return $http({
			method: 'PUT',
			url: '/htmlEndTime',
			data: {
				'id': id,
				'endTime': time
			}
		});
	};

	//Stamp basic JS assessment start time and date to db
	this.basicEndTime = function (id, time) {
		return $http({
			method: 'PUT',
			url: '/basicEndTime',
			data: {
				'id': id,
				'endTime': time
			}
		});
	};

	//Stamp Intermediate JS assessment start time and date to db
	this.intEndTime = function (id, time) {
		return $http({
			method: 'PUT',
			url: '/intEndTime',
			data: {
				'id': id,
				'endTime': time
			}
		});
	};

	//Stamp angular assessment start time and date to db
	this.angularEndTime = function (id, time) {
		return $http({
			method: 'PUT',
			url: '/angularEndTime',
			data: {
				'id': id,
				'endTime': time
			}
		});
	};

	//Stamp node JS assessment start time and date to db
	this.nodeEndTime = function (id, time) {
		return $http({
			method: 'PUT',
			url: '/nodeEndTime',
			data: {
				'id': id,
				'endTime': time
			}
		});
	};

	//Stamp SQL assessment start time and date to db
	this.sqlEndTime = function (id, time) {
		return $http({
			method: 'PUT',
			url: '/sqlEndTime',
			data: {
				'id': id,
				'endTime': time
			}
		});
	};
});
'use strict';

angular.module('badgeApp').controller('assessmentsCtrl', function ($scope, userService, assessmentService, $state) {

	var user = userService.currentUser;
	$scope.stop1 = false;
	$scope.stop2 = false;
	$scope.stop3 = false;
	$scope.stop4 = false;
	$scope.stop5 = false;
	$scope.stop6 = false;

	//If user is not logged in, redirect to login page
	if (!user) {
		$state.go('login');
		return;
	}

	//Sweet alerts logic and settings
	$scope.sweet = function (lang) {
		sweetAlert({
			title: "Are you sure?",
			text: "Are you ready to begin the assessment? Proceeding will begin your time limit of 3 hours and 10 minutes.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#00a82d",
			confirmButtonText: "Yes, I'm ready!",
			closeOnConfirm: true
		}, function () {
			var date = new Date();
			if (lang === 'html') {
				assessmentService.htmlStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/html-css-assessment', '_blank');
				$scope.stop1 = true;
			} else if (lang === 'jsb') {
				assessmentService.basicStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/javascript-basic-assessment', '_blank');
				$scope.stop2 = true;
			} else if (lang === 'jsi') {
				assessmentService.intStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/intermediate-javascript-assessment', '_blank');
				$scope.stop3 = true;
			} else if (lang === 'ang') {
				assessmentService.angularStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/angular-assessment', '_blank');
				$scope.stop4 = true;
			} else if (lang === 'node') {
				assessmentService.nodeStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/node-assessment', '_blank');
				$scope.stop5 = true;
			} else if (lang === 'sql') {
				assessmentService.sqlStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/sql-assessment', '_blank');
				$scope.stop6 = true;
			}
		});
	};

	$scope.htmlEndTime = function () {
		var date = new Date();
		assessmentService.htmlEndTime(user.id, date);
		$scope.stop1 = false;
	};

	$scope.basicEndTime = function () {
		var date = new Date();
		assessmentService.basicEndTime(user.id, date);
		$scope.stop2 = false;
	};

	$scope.intEndTime = function () {
		var date = new Date();
		assessmentService.intEndTime(user.id, date);
		$scope.stop3 = false;
	};

	$scope.angularEndTime = function () {
		var date = new Date();
		assessmentService.angularEndTime(user.id, date);
		$scope.stop4 = false;
	};

	$scope.nodeEndTime = function () {
		var date = new Date();
		assessmentService.nodeEndTime(user.id, date);
		$scope.stop5 = false;
	};

	$scope.sqlEndTime = function () {
		var date = new Date();
		assessmentService.sqlEndTime(user.id, date);
		$scope.stop6 = false;
	};
});
'use strict';

angular.module('badgeApp').service('badgeService', function ($http, $q) {

	//Api call to get user badge info
	this.getBadges = function (id) {
		return $http({
			method: 'GET',
			url: '/badges/' + id
		});
	};

	this.htmlPass = function (id, answer) {
		return $http({
			method: 'PUT',
			url: '/htmlPass',
			data: {
				id: id,
				answer: answer
			}
		});
	};

	this.bjsPass = function (id, answer) {
		return $http({
			method: 'PUT',
			url: '/bjsPass',
			data: {
				id: id,
				answer: answer
			}
		});
	};

	this.ijsPass = function (id, answer) {
		return $http({
			method: 'PUT',
			url: '/ijsPass',
			data: {
				id: id,
				answer: answer
			}
		});
	};

	this.angPass = function (id, answer) {
		return $http({
			method: 'PUT',
			url: '/angPass',
			data: {
				id: id,
				answer: answer
			}
		});
	};

	this.nodePass = function (id, answer) {
		return $http({
			method: 'PUT',
			url: '/nodePass',
			data: {
				id: id,
				answer: answer
			}
		});
	};

	this.sqlPass = function (id, answer) {
		return $http({
			method: 'PUT',
			url: '/sqlPass',
			data: {
				id: id,
				answer: answer
			}
		});
	};

	this.ppPass = function (id, answer) {
		return $http({
			method: 'PUT',
			url: '/ppPass',
			data: {
				id: id,
				answer: answer
			}
		});
	};

	this.gpPass = function (id, answer) {
		return $http({
			method: 'PUT',
			url: '/gpPass',
			data: {
				id: id,
				answer: answer
			}
		});
	};
});
'use strict';

angular.module('badgeApp').controller('badgesCtrl', function ($scope, userService, badgeService, $state) {

	$scope.user = userService.currentUser;
	var user = userService.currentUser;

	//If user is not logged in, redirect to login page
	if (!user) {
		$state.go('login');
		return;
	}

	$scope.reload = function () {
		$state.reload();
	};

	//Api call to get user's badge info --> badgeService
	var getBadges = function getBadges() {
		if (user) {
			badgeService.getBadges(user.id).then(function (response) {
				$scope.badges = response.data;
				displayBadges(response.data.badges);
				displayBadge1(response.data.badges);
				displayBadge2(response.data.badges);
				displayBadge3(response.data.badges);
				displayBadge4(response.data.badges);
				displayBadge5(response.data.badges);
				displayBadge6(response.data.badges);
				displayBadge7(response.data.badges);
				displayBadge8(response.data.badges);
			});
		}
	};
	getBadges();

	//Default Color badge icons
	$scope.html_c = false;
	$scope.bjs_c = false;
	$scope.ijs_c = false;
	$scope.angular_c = false;
	$scope.node_c = false;
	$scope.sql_c = false;
	$scope.pp_c = false;
	$scope.gp_c = false;

	//Default Gray badge icons
	$scope.html_g = true;
	$scope.bjs_g = true;
	$scope.ijs_g = true;
	$scope.angular_g = true;
	$scope.node_g = true;
	$scope.sql_g = true;
	$scope.pp_g = true;
	$scope.gp_g = true;

	var displayBadge1 = function displayBadge1(badges) {
		if (badges[0].html_badge === true) {
			$scope.html_c = true;
			$scope.html_g = false;
		}
	};

	var displayBadge2 = function displayBadge2(badges) {
		if (badges[0].basic_js_badge === true) {
			$scope.bjs_c = true;
			$scope.bjs_g = false;
		}
	};

	var displayBadge3 = function displayBadge3(badges) {
		if (badges[0].int_js_badge === true) {
			$scope.ijs_c = true;
			$scope.ijs_g = false;
		}
	};

	var displayBadge4 = function displayBadge4(badges) {
		if (badges[0].angular_badge === true) {
			$scope.angular_c = true;
			$scope.angular_g = false;
		}
	};

	var displayBadge5 = function displayBadge5(badges) {
		if (badges[0].node_badge === true) {
			$scope.node_c = true;
			$scope.node_g = false;
		}
	};

	var displayBadge6 = function displayBadge6(badges) {
		if (badges[0].sql_badge === true) {
			$scope.sql_c = true;
			$scope.sql_g = false;
		}
	};

	var displayBadge7 = function displayBadge7(badges) {
		if (badges[0].pproj_badge === true) {
			$scope.pp_c = true;
			$scope.pp_g = false;
		}
	};

	var displayBadge8 = function displayBadge8(badges) {
		if (badges[0].gproj_badge === true) {
			$scope.gp_c = true;
			$scope.gp_g = false;
		}
	};

	//Test which badges user has completed
	var displayBadges = function displayBadges(badges) {
		var count = 0;
		if (badges[0].html_badge === true) {
			count++;
			if (badges[0].basic_js_badge === true) {
				count++;
				if (badges[0].int_js_badge === true) {
					count++;
					if (badges[0].angular_badge === true) {
						count++;
						if (badges[0].node_badge === true) {
							count++;
							if (badges[0].sql_badge === true) {
								count++;
								if (badges[0].pproj_badge === true) {
									count++;
									if (badges[0].gproj_badge === true) {
										count++;
									}
								}
							}
						}
					}
				}
			}
		}
		$scope.finalCount = count;
	};

	// $scope.pass = () => {
	// 	badgeService.passFail(user.id, true);
	// };
	//
	// $scope.fail = () => {
	// 	badgeService.passFail(user.id, false);
	// };


	$scope.pass = function (ans) {
		if (ans === 'html') {
			badgeService.htmlPass(user.id, true);
		} else if (ans === 'jsb') {
			badgeService.bjsPass(user.id, true);
		} else if (ans === 'ijs') {
			badgeService.ijsPass(user.id, true);
		} else if (ans === 'ang') {
			badgeService.angPass(user.id, true);
		} else if (ans === 'node') {
			badgeService.nodePass(user.id, true);
		} else if (ans === 'sql') {
			badgeService.sqlPass(user.id, true);
		} else if (ans === 'pp') {
			badgeService.ppPass(user.id, true);
		} else if (ans === 'gp') {
			badgeService.gpPass(user.id, true);
		}
	};

	$scope.fail = function (ans) {
		if (ans === 'html') {
			badgeService.htmlPass(user.id, false);
		} else if (ans === 'jsb') {
			badgeService.bjsPass(user.id, false);
		} else if (ans === 'ijs') {
			badgeService.ijsPass(user.id, false);
		} else if (ans === 'ang') {
			badgeService.angPass(user.id, false);
		} else if (ans === 'node') {
			badgeService.nodePass(user.id, false);
		} else if (ans === 'sql') {
			badgeService.sqlPass(user.id, false);
		} else if (ans === 'pp') {
			badgeService.ppPass(user.id, false);
		} else if (ans === 'gp') {
			badgeService.gpPass(user.id, false);
		}
	};
});
'use strict';

angular.module('badgeApp').controller('calendarCtrl', function ($scope, userService, $state) {
	var _this = this;

	//If user is not logged in, redirect to login page
	if (!userService.currentUser) {
		$state.go('login');
		return;
	}

	$(document).ready(function () {

		$('#external-events .fc-event').each(function () {

			// store data so the calendar knows to render an event upon drop,
			$(_this).data('event', {
				title: $.trim($(_this).text()), // use the element's text as the event title
				stick: true // maintain when user navigates (see docs on the renderEvent method)
			});

			// make the event draggable using jQuery UI
			$(_this).draggable({
				zIndex: 999,
				revert: true, // will cause the event to go back to its
				revertDuration: 0 //  original position after the drag
			});
		});

		$('#calendar').fullCalendar({
			googleCalendarApiKey: 'AIzaSyAFcks9Xx01nvniP3PTml4hTithgQIsiN8',
			eventSources: [{
				googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com',
				color: '#58bc79'
			}, {
				googleCalendarId: 'dmcalendarproject@gmail.com'
			}, {
				googleCalendarId: 'devmounta.in_861odqeu3oqimb7t8939om6mlg@group.calendar.google.com'
			}],
			eventColor: '#3BB3E4',
			theme: true,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			navLinks: true, // can click day/week names to navigate views
			selectable: true,
			selectHelper: true,
			droppable: false, // this allows things to be dropped onto the calendar
			select: function select(start, end) {
				var title = prompt('Event Title:');
				var eventData;
				console.log('hello');

				if (title) {
					eventData = {
						title: title,
						start: start,
						end: end
					};
					$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
				}
				$('#calendar').fullCalendar('unselect');
			},
			drop: function drop() {
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(_this).remove();
				}
			},
			editable: false,
			eventLimit: true,
			eventClick: function eventClick(event) {
				if (event.url) {
					return false;
				}
			}
		});
	});
});
'use strict';

angular.module('badgeApp').controller('discussionCtrl', function ($scope, userService, $state) {

	if (!userService.currentUser) {
		$state.go('login');
		return;
	}

	$scope.currentPage = 1;
	$scope.maxPages = 4;

	$scope.getUsers = function (pageNum) {
		$scope.users = mainService.getUsers(pageNum).then(function (response) {
			$scope.users = response.data;
			$scope.maxPages = response.total_pages;
		});
	};

	$scope.postMessage = function (message) {
		messageService.postMessage(message).then(function (res) {
			if (res.data === 'success') {
				getMessages();
			}
		});
	};

	$scope.getUsers();
});
'use strict';

angular.module('badgeApp').service('messageService', function ($http) {
	//Here you'll need to create two methods. One called postMessage and the other called getMessages.

	//On the lines below create a getMessages method. This method will retrieve data from the backend.
	//The url for the get request should be 'http://practiceapi.devmounta.in/api/chats'
	//Be sure to return whatever gets returned from $http so you can call .then in your controller.
	this.getMessages = function (messages) {
		return $http({
			method: 'GET',
			url: 'http://practiceapi.devmounta.in/api/chats'
		}).then(function (response) {
			return response.messages;
		});
	};

	//On the line below create the postMessage method. This method will add data to the backend server.
	//The url for the request needs to be 'http://practiceapi.devmounta.in/api/chats'
	//Because we're making a POST request, we need a way to tell the server the data we want to give it, in your $http call (along with url and method) have a data property which has a value that is equal to another object with a key of message and a value of the message being passed to parse. IE data: {message: yourMessage}
	//Also, remember that $http returns a promise. So if you return the whole $http call (return $http(...)), you can then use .then in your controller.

	this.postMessages = function (messages) {
		return $http({
			method: 'POST',
			url: 'http://practiceapi.devmounta.in/api/chats',
			data: { message: yourMessage }
		});
	};
});
'use strict';

angular.module('badgeApp').controller('homeCtrl', function ($scope, homeService, userService, $state) {

	//Page always loads at the top
	window.scrollTo(0, 0);

	//Check if there is a user logged in
	var isLoggedIn = function isLoggedIn() {
		userService.isLoggedIn().then(function (r) {
			if (!r.data) {
				$state.go('login');
				return;
			}
			userService.currentUser = r.data;
			$scope.user = userService.currentUser;
			userService.in = false;
			userService.out = true;
		});
	};
	isLoggedIn();

	var getBadge = function getBadge() {
		if (userService.currentUser) {
			homeService.getBadge(userService.currentUser.id).then(function (response) {
				$scope.badges = response.data;
				displayBadge(response.data.badges);
			});
		}
	};
	getBadge();

	var displayBadge = function displayBadge(badges) {
		var count = 0;
		if (badges[0].html_badge === true) {
			count++;
			if (badges[0].basic_js_badge === true) {
				count++;
				if (badges[0].int_js_badge === true) {
					count++;
					if (badges[0].angular_badge === true) {
						count++;
						if (badges[0].node_badge === true) {
							count++;
							if (badges[0].sql_badge === true) {
								count++;
								if (badges[0].pproj_badge === true) {
									count++;
									if (badges[0].gproj_badge === true) {
										count++;
									}
								}
							}
						}
					}
				}
			}
		}
		$scope.finalCountHome = count;
	};

	//Api pull for weather info

	// $scope.getWeather = homeService.getWeather();
	// var getWeather = function() {
	// 	homeService.getWeather().then(function(response) {
	// 		$scope.weather = response.data.forecast.simpleforecast.forecastday[0];
	// 		console.log($scope.weather);
	// 	});
	// };
	// getWeather();


	//Mini calendar on home page
	$(document).ready(function () {

		$('#calendar1').fullCalendar({
			defaultView: 'listWeek',
			googleCalendarApiKey: 'AIzaSyAFcks9Xx01nvniP3PTml4hTithgQIsiN8',
			eventSources: [{ googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com', color: '#58bc79' }, { googleCalendarId: 'dmcalendarproject@gmail.com' }, { googleCalendarId: 'devmounta.in_861odqeu3oqimb7t8939om6mlg@group.calendar.google.com' }],
			eventColor: '#3BB3E4',
			theme: true,
			header: { left: 'prev,next today', center: 'title', right: 'listDay,listWeek,month' },
			views: { listDay: { buttonText: 'Day' }, listWeek: { buttonText: 'Week' }, month: { buttonText: 'Month' } },
			navLinks: true,
			editable: false,
			eventLimit: true,
			eventClick: function eventClick(event) {
				if (event.url) {
					return false;
				}
			}
		});
	});
});
'use strict';

angular.module('badgeApp').service('homeService', function ($http) {

	this.getWeather = function () {
		return $http({
			method: 'GET',
			url: 'http://api.wunderground.com/api/22e474a581a15228/geolookup/conditions/forecast/q/84601.json'
		});
	};

	//Api call to get user badge info
	this.getBadge = function (id) {
		return $http({
			method: 'GET',
			url: '/badge/' + id
		});
	};
});
'use strict';

angular.module('badgeApp').controller('loginCtrl', function ($scope, loginService, $state, $stateParams) {

	if (!userService.currentUser) {
		$state.go('login');
		return;
	}

	loginService.checkForToken($stateParams.token);

	// function getUser() {
	// 	console.log('ctrl getUser function');
	// 	loginService.getUser().then(function(user) {
	// 		if (user) $scope.user = user.username;
	// 		else   $scope.user = 'Please login';
	// 	})
	// }


	// $scope.loginLocal = function(username, password) {
	// 	console.log('Logging in with', username, password);
	// 	loginService.loginLocal({
	// 		username: username,
	// 		password: password
	// 	})
	// 	.then(function(response) {
	// 		getUser();
	// 	})
	// };

	$scope.logout = loginService.logout;
});
'use strict';

angular.module('badgeApp').service('loginService', function ($http) {

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

	this.logout = function () {
		return $http({
			method: 'GET',
			url: '/auth/logout'
		}).then(function (res) {
			return res.data;
		}).catch(function (err) {
			console.log(err);
		});
	};

	this.checkForToken = function (token) {
		if (token) {
			sessionStorage.setItem('myToken', token);
		}
	};
});
//# sourceMappingURL=bundle.js.map
