angular.module('badgeApp').controller('homeCtrl', function($scope, homeService, userService, $state) {
	
	//Page always loads at the top
	window.scrollTo(0, 0);
	
	//Check if there is a user logged in
	let isLoggedIn = () => {
		userService.isLoggedIn().then((r) =>{
			if(!r.data) {
				$state.go('login');
				return
			}
			userService.currentUser = r.data;
			$scope.user = userService.currentUser;
			userService.in = false;
			userService.out = true;
		})
	};
	isLoggedIn();
	
	let getBadge = () => {
		if (userService.currentUser) {
			homeService.getBadge(userService.currentUser.id)
			.then(function(response) {
				$scope.badges = response.data;
				displayBadge(response.data.badges);
			})
		}
	};
	getBadge();
	
	let displayBadge = (badges) => {
		let count = 0;
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
	
	
	let getMessages = () => {
		homeService.getMessages().then(function(r){
			$scope.messages = r.data;
		});
	};
	getMessages();
	
	
	
	

	//Api pull for weather info
	
	$scope.getWeather = homeService.getWeather();
	var getWeather = function() {
		homeService.getWeather().then(function(response) {
			$scope.weather = response.data.forecast.simpleforecast.forecastday[0];
			console.log($scope.weather);
		});
	};
	getWeather();

	
	//Mini calendar on home page
	$(document).ready(() => {
		
		$('#calendar1').fullCalendar({
			defaultView: 'listWeek',
			googleCalendarApiKey: 'AIzaSyAFcks9Xx01nvniP3PTml4hTithgQIsiN8',
			eventSources: [
				{ googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com', color: '#58bc79' },
				{ googleCalendarId: 'dmcalendarproject@gmail.com' },
				{ googleCalendarId: 'devmounta.in_861odqeu3oqimb7t8939om6mlg@group.calendar.google.com' }],
			eventColor: '#3BB3E4',
			theme: true,
			header: { left: 'prev,next today', center: 'title', right: 'listDay,listWeek,month' },
			views: { listDay: { buttonText: 'Day' }, listWeek: { buttonText: 'Week' }, month: { buttonText: 'Month' }},
			navLinks: true,
			editable: false,
			eventLimit: true,
			eventClick: (event) => {
				if (event.url) {
					return false;
				}
			}
		});
	});
});
