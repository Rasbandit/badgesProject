angular.module('badgeApp').controller('badgesCtrl', function($scope, userService, badgeService, $state) {
	
	$scope.user = userService.currentUser;
	const user = userService.currentUser;
	
	//If user is not logged in, redirect to login page
	if(!user){
		$state.go('login');
		return
	}
	
	$scope.reload= function(){
		$state.reload()
	};
	
	//Api call to get user's badge info --> badgeService
	let getBadges = () => {
		if (user) {
			badgeService.getBadges(user.id)
			.then(function(response) {
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
	
	
	let displayBadge1 = (badges) => {
		if (badges[0].html_badge === true) {
			$scope.html_c = true;
			$scope.html_g = false;
		}
	};
	
	let displayBadge2 = (badges) => {
		if (badges[0].basic_js_badge === true) {
			$scope.bjs_c = true;
			$scope.bjs_g = false;
		}
	};
	
	let displayBadge3 = (badges) => {
		if (badges[0].int_js_badge === true) {
			$scope.ijs_c = true;
			$scope.ijs_g = false;
		}
	};
	
	let displayBadge4 = (badges) => {
		if (badges[0].angular_badge === true) {
			$scope.angular_c = true;
			$scope.angular_g = false;
		}
	};
	
	let displayBadge5 = (badges) => {
		if (badges[0].node_badge === true) {
			$scope.node_c = true;
			$scope.node_g = false;
		}
	};
	
	let displayBadge6 = (badges) => {
		if (badges[0].sql_badge === true) {
			$scope.sql_c = true;
			$scope.sql_g = false;
		}
	};
	
	let displayBadge7 = (badges) => {
		if (badges[0].pproj_badge === true) {
			$scope.pp_c = true;
			$scope.pp_g = false;
		}
	};
	
	let displayBadge8 = (badges) => {
		if (badges[0].gproj_badge === true) {
			$scope.gp_c = true;
			$scope.gp_g = false;
		}
	};
	
	
	
	//Test which badges user has completed
	let displayBadges = (badges) => {
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
		if (ans === 'html') {
			badgeService.htmlPass(user.id, true);
		}
		else if (ans === 'jsb') {
			badgeService.bjsPass(user.id, true);
		}
		else if (ans === 'ijs') {
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
		else if (ans === 'ijs') {
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

