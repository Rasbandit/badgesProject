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
	});
});
'use strict';

angular.module('badgeApp').controller('assessmentsCtrl', function ($scope) {

	$scope.test = "The assessments page is working";
});
'use strict';

angular.module('badgeApp').controller('badgesCtrl', function ($scope) {

	$scope.test = "The badge page is working";
});
'use strict';

angular.module('badgeApp').controller('calendarCtrl', function ($scope) {

	$(document).ready(function () {

		$('#external-events .fc-event').each(function () {

			// store data so the calendar knows to render an event upon drop
			$(this).data('event', {
				title: $.trim($(this).text()), // use the element's text as the event title
				stick: true // maintain when user navigates (see docs on the renderEvent method)
			});

			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true, // will cause the event to go back to its
				revertDuration: 0 //  original position after the drag
			});
		});

		$('#calendar').fullCalendar({

			theme: true,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			navLinks: true, // can click day/week names to navigate views
			selectable: true,
			selectHelper: true,
			droppable: true, // this allows things to be dropped onto the calendar
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
					$(this).remove();
				}
			},
			editable: true,
			eventLimit: true,
			eventRender: function eventRender(event, element) {
				element.append("<span class='closeon'>X</span>");
				element.find(".closeon").click(function () {
					$('#calendar').fullCalendar('removeEvents', event._id);
				});
			}
		});
	});
});
'use strict';

angular.module('badgeApp').controller('discussionCtrl', function ($scope, messageService) {

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

angular.module('badgeApp').controller('loginCtrl', function ($scope, loginService, $state, $stateParams) {

	loginService.checkForToken($stateParams.token);

	function getUser() {
		loginService.getUser().then(function (user) {
			if (user) $scope.user = user.username;else $scope.user = 'Please login';
		});
	}

	getUser();

	$scope.loginLocal = function (username, password) {
		console.log('Logging in with', username, password);
		loginService.loginLocal({
			username: username,
			password: password
		}).then(function (response) {
			getUser();
		});
	};

	$scope.logout = loginService.logout;
});
'use strict';

angular.module('badgeApp').service('loginService', function ($http) {

	this.loginLocal = function (credentials) {
		return $http({
			method: "POST",
			url: '/auth/local',
			data: credentials
		}).then(function (res) {
			return res.data;
		}).catch(function (err) {
			console.log('ERROR LOGGING IN!', err);
		});
	};

	this.getUser = function () {
		return $http({
			method: 'GET',
			url: '/auth/me'
		}).then(function (res) {
			return res.data;
		}).catch(function (err) {
			console.log(err);
		});
	};

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
'use strict';

angular.module('badgeApp').controller('homeCtrl', function ($scope, homeService) {

	window.scrollTo(0, 0);

	// $scope.getWeather = homeService.getWeather();
	//
	// var getWeather = function() {
	// 	homeService.getWeather().then(function(response) {
	// 		$scope.weather = response.data.forecast.simpleforecast.forecastday[0];
	// 		console.log($scope.weather);
	// 	});
	// };
	//
	// getWeather();


	$(document).ready(function () {

		$('#calendar1').fullCalendar({
			theme: true,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'listDay,listWeek,month'
			},

			// customize the button names,
			// otherwise they'd all just say "list"
			views: {
				listDay: { buttonText: 'Day' },
				listWeek: { buttonText: 'Week' },
				month: { buttonText: 'Month' }
			},

			defaultView: 'month',
			defaultDate: '01/01/2017',
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events


			//This is where the database call will go

			// eventSources: [
			// 	{
			// 		url: '/myfeed.php',
			// 		type: 'POST',
			// 		data: {
			// 			custom_param1: 'something',
			// 			custom_param2: 'somethingelse'
			// 		},
			// 		error: function() {
			// 			alert('there was an error while fetching events!');
			// 		}
			// 	}
			// ]


			events: [{

				"name": "Independence Day",
				"date": "2017-01-04",
				"observed": "2017-01-03",
				"public": true
			}, {
				title: 'Long Event',
				start: '2016-12-07',
				end: '2016-12-10'
			}, {
				id: 999,
				title: 'Repeating Event',
				start: '2016-12-09T16:00:00'
			}, {
				id: 999,
				title: 'Repeating Event',
				start: '2016-12-16T16:00:00'
			}, {
				title: 'Conference',
				start: '2016-12-11',
				end: '2016-12-13'
			}, {
				title: 'Meeting',
				start: '2016-12-12T10:30:00',
				end: '2016-12-12T12:30:00'
			}, {
				title: 'Lunch',
				start: '2016-12-12T12:00:00'
			}, {
				title: 'Meeting',
				start: '2016-12-12T14:30:00'
			}, {
				title: 'Happy Hour',
				start: '2016-12-12T17:30:00'
			}, {
				title: 'Dinner',
				start: '2016-12-12T20:00:00'
			}, {
				title: 'Birthday Party',
				start: '2016-12-13T07:00:00'
			}, {
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2016-12-28'
			}]
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
});
//# sourceMappingURL=bundle.js.map
