angular.module('badgeApp').controller('badgesCtrl', function($scope, userService, badgeService, $state) {
	
	$scope.user = userService.currentUser;
	const user = userService.currentUser;
	
	//If user is not logged in, redirect to login page
	if(!user){
		$state.go('login');
		return
	}
	
	//Api call to get user's badge info --> badgeService
	let getBadges = () => {
		if (user) {
			badgeService.getBadges(user.id)
			.then(function(response) {
				$scope.badges = response.data;
				displayBadges(response.data.badges);
			})
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

	//Test which badges user has completed
	let displayBadges = (badges) => {
		let count = 0;
		if (badges[0].html_badge === true) {
			$scope.html_c = true;
			$scope.html_g = false;
			count++;
			if (badges[0].basic_js_badge === true) {
				$scope.bjs_c = true;
				$scope.bjs_g = false;
				count++;
				if (badges[0].int_js_badge === true) {
						$scope.ijs_c = true;
						$scope.ijs_g = false;
					count++;
					if (badges[0].angular_badge === true) {
						$scope.angular_c = true;
						$scope.angular_g = false;
						count++;
						if (badges[0].node_badge === true) {
							$scope.node_c = true;
							$scope.node_g = false;
							count++;
							if (badges[0].sql_badge === true) {
								$scope.sql_c = true;
								$scope.sql_g = false;
								count++;
								if (badges[0].pproj_badge === true) {
									$scope.pp_c = true;
									$scope.pp_g = false;
									count++;
									if (badges[0].gproj_badge === true) {
										$scope.gp_c = true;
										$scope.gp_g = false;
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
	
	
	$scope.pass = (ans) => {
		console.log('piiiii');
		if (ans === 'html') {
			console.log('fired 1');
			badgeService.htmlPass(user.id, true);
		}
		else if (ans === 'jsb') {
			badgeService.bjsPass(user.id, true);
		}
		else if (ans === 'jsi') {
			badgeService.ijsPass(user.id, true);
		}
		else if (ans === 'ang') {
			badgeService.angPass(user.id, true);
		}
		else if (ans === 'node') {
			badgeService.nodePass(user.id, true);
		}
		else if (ans === 'sql') {
			badgeService.sqlPass(user.id, true);
		}
		else if (ans === 'pp') {
			badgeService.ppPass(user.id, true);
		}
		else if (ans === 'gp') {
			badgeService.gpPass(user.id, true);
		}
	};
	
	
	$scope.fail = (ans) => {
		if (ans === 'html') {
			badgeService.htmlPass(user.id, false);
		}
		else if (ans === 'jsb') {
			badgeService.bjsPass(user.id, false);
		}
		else if (ans === 'jsi') {
			badgeService.ijsPass(user.id, false);
		}
		else if (ans === 'ang') {
			badgeService.angPass(user.id, false);
		}
		else if (ans === 'node') {
			badgeService.nodePass(user.id, false);
		}
		else if (ans === 'sql') {
			badgeService.sqlPass(user.id, false);
		}
		else if (ans === 'pp') {
			badgeService.ppPass(user.id, false);
		}
		else if (ans === 'gp') {
			badgeService.gpPass(user.id, false);
		}
	};
	
	
	
	
	
});

