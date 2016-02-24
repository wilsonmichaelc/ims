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
