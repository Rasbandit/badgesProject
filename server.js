const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const githubStrategy = require('passport-github').Strategy;
const config = require('./config.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = module.exports =express();

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
const massiveInstance = massive.connectSync({connectionString: `postgres://${config.postgresUser}:${config.postgresPass}@localhost/TheBadges`});

app.set('db', massiveInstance);
const db = app.get('db');

db.init.createBadgesTable([],(err, result)=>{
	if(err){
	  console.log(err);
	}
});

db.init.createTimestampsTable([],(err, result)=>{
	if(err){
		console.log(err);
	}
});

db.init.createUsersTable([],(err, result)=>{
	if(err){
		console.log(err);
	}
});

app.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/');
});

app.get('/badges/:id', function(req, res) {
	db.getUserBadges([req.params.id], function(err, badges) {
		res.send({badges : badges});
	})
});

app.get('/badge/:id', function(req, res) {
	db.getUserBadges([req.params.id], function(err, badges) {
		res.send({badges : badges});
	})
});

app.get('/loggedIn', function(req, res){
	if(!req.session.passport){
		res.json(false);
		return
	}
	res.json(req.session.passport.user)
});

//Assessment start time stamps
app.post('/htmlStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startHtmlStamp([timeStamp.id, timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});

app.put('/basicStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startBasicStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});

app.put('/intStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startIntStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});

app.put('/angularStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startAngularStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		console.log(result);
		res.send(result);
	});
});

app.put('/nodeStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startNodeStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});

app.put('/sqlStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startSqlStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});


//Assessment end time stamps
app.post('/htmlStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startHtmlStamp([timeStamp.id, timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});

app.put('/basicStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startBasicStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});

app.put('/intStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startIntStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});

app.put('/angularStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startAngularStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		console.log(result);
		res.send(result);
	});
});

app.put('/nodeStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startNodeStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
});

app.put('/sqlStartTime', function(req, res) {
	let timeStamp = req.body;
	db.timeStamps.startSqlStamp([timeStamp.name, timeStamp.startTime], function(err, result) {
		res.send(result);
	});
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

/**
 * Facebook Auth
 */
passport.use('facebook', new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: "http://localhost:3000/auth/facebook/callback",
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
		callbackURL: "http://localhost:3000/auth/github/callback",
		profileFields: ['id', 'displayName']
	},
	function(accessToken, refreshToken, profile, done) {
		// console.log(profile);
		db.getUserByGithubId([profile.id], function(err, user) {
			if (!user.length) {
				console.log('Creating User');
				let date = new Date();
				db.createUserGithub([profile.displayName, profile.id, profile.emails[0].value, profile.photos[0].value, date], function(err, u) {
					return done(err, u, {scope: 'all'});
				})
			} else {
				return done(err, user[0]);
			}
		})
	}));

passport.serializeUser(function(user, done) {
	return done(null, user);
});

passport.deserializeUser(function(user, done) {
	return done(null, user);
});

//facebook callback
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {failureRedirect: '/'}), function(req, res) {
		res.status(200).redirect('/');
	});

//github callback
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
	passport.authenticate('github', {failureRedirect: '/'}), function(req, res) {
		res.status(200).redirect('/');
	});

app.listen(config.port, function() {
	console.log('Listening to port:', config.port)
});



