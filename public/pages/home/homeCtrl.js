angular.module('badgeApp').controller('homeCtrl', function($scope, homeService, userService, $state) {
	
	//Page always loads at the top
	window.scrollTo(0, 0);
	
	if(!userService.currentUser){
		$state.go('login')
		return
	}
	
	//Check if there is a user logged in
	let isLoggedIn = () => {
		userService.isLoggedIn().then((res) =>{
			if(!res.data) {
				$state.go('login');
				return
			}
			userService.currentUser = res.data;
			$scope.user = userService.currentUser;
			userService.in = false;
			userService.out = true;
			getBadge($scope.user);
		})
	};
	isLoggedIn();
	
	//GET users badge db info
	let getBadge = (user) => {
		if (user) {
			console.log(userService.currentUser);
			homeService.getBadge(user.id)
			.then(function(response) {
				$scope.badges = response.data;
				displayBadge(response.data.badges);
			})
		}
	};
	
	
	//Count users completed badges
	let displayBadge = (badges) => {
		let count = 0;
		for (let key in badges[0]) {
			if (badges[0][key] === true) {
				count++;
			}
		}
		$scope.finalCountHome = count;
	};
	
	//GET users message db info
	let getMessages = () => {
		homeService.getMessages().then(function(res){
			$scope.messages = res.data;
		});
	};
	getMessages();
	
	//Api pull for weather info
	$scope.getWeather = homeService.getWeather();
	let getWeather = function() {
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
