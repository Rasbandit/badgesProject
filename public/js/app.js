angular.module('badgeApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: './pages/home/home.html',
		controller: 'homeCtrl'
	})
	.state('badges', {
		url: '/badges',
		templateUrl: './pages/badges/badges.html',
		controller: 'badgesCtrl'
	})
	.state('calendar', {
		url: '/calendar',
		templateUrl: './pages/calendar/calendar.html',
		controller: 'calendarCtrl'
	})
	.state('assessments', {
		url: '/assessments',
		templateUrl: './pages/assessments/assessments.html',
		controller: 'assessmentsCtrl'
	})
	.state('discussion', {
		url: '/discussion',
		templateUrl: './pages/discussion/discussion.html',
		controller: 'discussionCtrl'
	})
	.state('login', {
		url: '/login',
		templateUrl: './pages/login/login.html',
		controller: 'loginCtrl'
	})
	.state('admin', {
		url: '/admin',
		templateUrl: './pages/admin/admin.html',
		controller: './pages/admin/adminCtrl.js'
	})
});
