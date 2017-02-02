angular.module('badgeApp').controller('assessmentsCtrl', function($scope, userService, assessmentService, $state) {
	
	var user = userService.currentUser;
	$scope.stop1 = false;
	$scope.stop2 = false;
	$scope.stop3 = false;
	$scope.stop4 = false;
	$scope.stop5 = false;
	$scope.stop6 = false;
	
	//If user is not logged in, redirect to login page
	if(!user){
		$state.go('login');
		return
	}
	
	//Sweet alerts logic and settings
	$scope.sweet = (lang) => {
		sweetAlert({
				title: "Are you sure?",
				text: "Are you ready to begin the assessment? Proceeding will begin your time limit of 3 hours and 10 minutes.",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#00a82d",
				confirmButtonText: "Yes, I'm ready!",
				closeOnConfirm: true
			},
			() => {
				let date = new Date();
			if (lang === 'html') {
				assessmentService.htmlStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/html-css-assessment', '_blank');
				$scope.stop1 = true;
			}
			else if (lang === 'jsb') {
				assessmentService.basicStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/javascript-basic-assessment', '_blank');
				$scope.stop2 = true;
			}
			else if (lang === 'jsi') {
				assessmentService.intStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/intermediate-javascript-assessment', '_blank');
				$scope.stop3 = true;
			}
			else if (lang === 'ang') {
				assessmentService.angularStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/angular-assessment', '_blank');
				$scope.stop4 = true;
			}
			else if (lang === 'node') {
				assessmentService.nodeStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/node-assessment', '_blank');
				$scope.stop5 = true;
			}
			else if (lang === 'sql') {
				assessmentService.sqlStartTime(user.id, user.display_name, date);
				window.open('https://github.com/DevMountain/sql-assessment', '_blank');
				$scope.stop6 = true;
			}
			});
	};
	
	
	htmlEndTime () => {
		assessmentService.sqlStartTime(user.id, user.display_name, date);
	}
	
	
	
	
	
	
	
});
	
