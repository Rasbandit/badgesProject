const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const githubStrategy = require('passport-github2').Strategy;
const config = require('./config.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = module.exports = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
	secret: config.secret,
	saveUninitialized: false,
	resave: true,
	expiration: 1000*60*60*60*24*14
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/dist'));


/////////////
// DATABASE //
/////////////
const massiveInstance = massive.connectSync({connectionString: `postgres://${config.postgresUser}:${config.postgresPass}@localhost/the_badges`});

app.set('db', massiveInstance);
const db = app.get('db');


//Create all db tables
db.init.createUsersTable([],(err, result) => {
	if(err){
		console.log(err);
	}
});

db.init.createBadgesTable([],(err, result) => {
	if(err){
	  console.log(err);
	}
});

db.init.createTimestampsTable([],(err, result) => {
	if(err){
		console.log(err);
	}
});

db.init.createMessageTable([],(err, result) => {
	if(err){
		console.log(err);
	}
});


//GET and POST for chat app
app.post('/postMsg', function(req, res) {
	db.createNewMsg([req.body.id, req.body.name, req.body.message, req.body.time], function(err, result) {
		res.send(result)
	});
});

app.get('/getMsg', function(req, res) {
	db.getMsg(function(err, messages) {
		res.send(messages);
	})
});

app.get('/getHomeMsg', function(req, res) {
	db.getHomeMsg(function(err, messages) {
		res.send(messages);
	})
});


//GET badges for logged in user (Badge Page)
app.get('/badges/:id', function(req, res) {
	db.getUserBadges([req.params.id], function(err, badges) {
		res.send({badges : badges});
	})
});

//GET badges for logged in user (Home Page)
app.get('/badge/:id', function(req, res) {
	db.getUserBadges([req.params.id], function(err, badges) {
		res.send({badges : badges});
	})
});

//Check if user is logged in
app.get('/loggedIn', function(req, res){
	if(!req.session.passport){
		res.json(false);
		return
	}
	res.json(req.session.passport.user)
});

//Logout
app.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/');
});


//Assessment start time stamps
app.post('/htmlStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startHtmlStamp([timeStamp.id, timeStamp.name, timeStamp.startTime], function(err, result) {
		req.session.currentAssessmentStart = result;
		res.send(result);
	});
});

app.post('/basicStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startBasicStamp([timeStamp.id, timeStamp.name, timeStamp.startTime], function(err, result) {
		req.session.currentAssessmentStart = result;
		res.send(result);
	});
});

app.post('/intStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startIntStamp([timeStamp.id, timeStamp.name, timeStamp.startTime], function(err, result) {
		req.session.currentAssessmentStart = result;
		res.send(result);
	});
});

app.post('/angularStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startAngularStamp([timeStamp.id, timeStamp.name, timeStamp.startTime], function(err, result) {
		req.session.currentAssessmentStart = result;
		res.send(result);
	});
});

app.post('/nodeStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startNodeStamp([timeStamp.id, timeStamp.name, timeStamp.startTime], function(err, result) {
		req.session.currentAssessmentStart = result;
		res.send(result);
	});
});

app.post('/sqlStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startSqlStamp([timeStamp.id, timeStamp.name, timeStamp.startTime], function(err, result) {
		req.session.currentAssessmentStart = result;
		res.send(result);
	});
});

//Assessment end time stamps
app.put('/htmlEndTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.endHtmlStamp([timeStamp.id, timeStamp.endTime, req.session.currentAssessmentStart[0].id], function(err, result) {
		res.send(result);
	});
});

app.put('/basicEndTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.endBasicStamp([timeStamp.id, timeStamp.endTime, req.session.currentAssessmentStart[0].id], function(err, result) {
		res.send(result);
	});
});

app.put('/intEndTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.endIntStamp([timeStamp.id, timeStamp.endTime, req.session.currentAssessmentStart[0].id], function(err, result) {
		res.send(result);
	});
});

app.put('/angularEndTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.endAngularStamp([timeStamp.id, timeStamp.endTime, req.session.currentAssessmentStart[0].id], function(err, result) {
		console.log(result);
		res.send(result);
	});
});

app.put('/nodeEndTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.endNodeStamp([timeStamp.id, timeStamp.endTime, req.session.currentAssessmentStart[0].id], function(err, result) {
		res.send(result);
	});
});

app.put('/sqlEndTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.endSqlStamp([timeStamp.id, timeStamp.endTime, req.session.currentAssessmentStart[0].id], function(err, result) {
		res.send(result);
	});
});

//User Pass/Fail db data
app.put('/htmlPass', function(req, res) {
	db.badgeQueries.htmlPassFail([req.body.id, req.body.answer], function(err, result) {
		res.send(result);
	});
});

app.put('/bjsPass', function(req, res) {
	db.badgeQueries.bjsPassFail([req.body.id, req.body.answer], function(err, result) {
		res.send(result);
	});
});

app.put('/ijsPass', function(req, res) {
	db.badgeQueries.ijsPassFail([req.body.id, req.body.answer], function(err, result) {
		res.send(result);
	});
});

app.put('/angPass', function(req, res) {
	db.badgeQueries.angPassFail([req.body.id, req.body.answer], function(err, result) {
		res.send(result);
	});
});

app.put('/nodePass', function(req, res) {
	db.badgeQueries.nodePassFail([req.body.id, req.body.answer], function(err, result) {
		res.send(result);
	});
});

app.put('/sqlPass', function(req, res) {
	db.badgeQueries.sqlPassFail([req.body.id, req.body.answer], function(err, result) {
		res.send(result);
	});
});

app.put('/ppPass', function(req, res) {
	db.badgeQueries.ppPassFail([req.body.id, req.body.answer], function(err, result) {
		res.send(result);
	});
});

app.put('/gpPass', function(req, res) {
	db.badgeQueries.gpPassFail([req.body.id, req.body.answer], function(err, result) {
		res.send(result);
	});
});


/**
 * Facebook Auth
 */
passport.use('facebook', new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: "/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'email']
	},
	function(accessToken, refreshToken, profile, done) {
	// console.log(profile);
		db.getUserByFacebookId([profile.id], function(err, user) {
			if (!user.length) {
				console.log('Creating User');
				db.createUserFacebook([profile.displayName, profile.id, profile.emails[0].value], function(err, u) {
					return done(err, u, {scope: 'all'});
				})
			} else {
				return done(err, user[0]);
			}
		})
	}));

//github Auth
passport.use('github', new githubStrategy({
		clientID: config.github.clientID,
		clientSecret: config.github.clientSecret,
		callbackURL: config.callbackUrl,
		profileFields: ['id', 'displayName']
	},
	function(accessToken, refreshToken, profile, done) {
		// console.log(profile);
		db.getUserByGithubId([profile.id], function(err, user) {
			if (!user.length) {
				console.log('Creating User');
				let date = new Date();
				db.createUserGithub([profile.displayName, profile.id, profile.emails, profile.photos, date], function(err, u) {
					return done(err, u, {scope: 'all'});
				})
			} else {
				return done(err, user[0]);
			}
		})
	}));


//github callback
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/'}),
	function(req, res) {
		res.status(200).redirect('/');
	});

/**
 * Local Auth
 */
// passport.use('local', new LocalStrategy(
// 	function(username, password, done) {
// 		db.getUserByUsername({username: username}, function(err, user) {
// 			if (err) { return done(err); }
// 			if (!user) {
// 				return done(null, false);
// 			}
// 			if (!user.password != password) {
// 				return done(null, false);
// 			}
// 			return done(null, user);
// 		});
// 	}
// ));

// passport.use('local', new LocalStrategy(
// app.post('/auth/local', passport.authenticate('local'), function(req, res) {
// 	res.status(200).redirect('/#/');
// 	})));
//
//
// app.post('/auth/me', function(req, res) {
// 	console.log('reached auth/me');
// 	if (req.user) {
// 		console.log(req.user);
// 		res.status(200).send(req.user);
// 	} else {
// 		console.log('No user!');
// 		res.status(200).send();
// 	}
// });


passport.serializeUser(function(user, done) {
	return done(null, user);
});

passport.deserializeUser(function(user, done) {
	return done(null, user);
});

//facebook callback
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {failureRedirect: '/login'}), function(req, res) {
		res.status(200).redirect('/');
	});


app.listen(config.port, function() {
	console.log('Listening to port:', config.port)
});



