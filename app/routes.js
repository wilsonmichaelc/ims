// app/routes.js

// import the middleware
var middleware = require('./middleware');

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
		}),
    function(req, res) {
        if (req.body.remember) {
          req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
          req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

		// process the login form
		app.post('/verify', passport.authenticate('local-verify', {
					successRedirect : '/settings', // redirect to the secure profile section
					failureRedirect : '/settings', // redirect back to the signup page if there is an error
					failureFlash : true // allow flash messages
			}),
      function(req, res) {
          if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
          } else {
            req.session.cookie.expires = false;
          }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/home', isLoggedIn, function(req, res) {
		res.render('home.ejs', {
			user : req.user, // get the user out of session and pass to template
			page : 'home'
		});
	});

	// =====================================
	// BOOKING SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/book', isLoggedIn, function(req, res) {
		res.render('book.ejs', {
			user : req.user, // get the user out of session and pass to template
			page : 'book'
		});
	});

	// =====================================
	// USER PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user, // get the user out of session and pass to template
			page : 'profile'
		});
	});

	// =====================================
	// ADMIN SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/admin', isAdmin, function(req, res) {
		res.render('admin.ejs', {
			user : req.user, // get the user out of session and pass to template
			page : 'admin',
			//data : rows
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// route middleware to make sure user is logged in AND an administrator
function isAdmin(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		if(req.user.Admin){
			return next();
		}

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// route middleware to make sure user is logged in AND a super user
function isSuperUser(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		if(req.user.SuperUser){
			return next();
		}

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// route middleware to make sure user is logged in AND a super user
function isAdminOrSuper(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		if(req.user.SuperUser || req.user.Admin){
			return next();
		}

	// if they aren't redirect them to the home page
	res.redirect('/');
}
