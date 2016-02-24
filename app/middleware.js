// route middleware to make sure user is logged in
module.exports = {
	isLoggedIn: function (req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	},

	// route middleware to make sure user is logged in AND an administrator
	isAdmin: function (req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			if(req.user.Admin){
				return next();
			}

		// if they aren't redirect them to the home page
		res.redirect('/');
	},

	// route middleware to make sure user is logged in AND a super user
	isSuperUser: function (req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			if(req.user.SuperUser){
				return next();
			}

		// if they aren't redirect them to the home page
		res.redirect('/');
	},

	// route middleware to make sure user is logged in AND a super user
	isAdminOrSuper: function (req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			if(req.user.SuperUser || req.user.Admin){
				return next();
			}

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
};
