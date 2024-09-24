//  This module is the middleware used to serve static routes and their auxillary files.  It's pretty much just a
//  standard, no-frills module that configures ExpressJS to serve the application's static routes.

//	01	Remove standard code that I don't need at this time.

// Require the dependencies

const chalk = require("chalk");
const express = require("express");
const path = require("path");

//	01	//  Require the database ORM that provides the functions to authenticate our users
//	01	
//	01	const people = require ("./database/people.js");

// Configure ExpressJS

const app = express();
const router = express.Router ();
app.use ("/", router);

router
.use (function (request, response, next)
	{   // This always happens always happens whenever any route is served in this module.  At the moment its only
		// purpose is it to debug routes, but it could be something more useful.

		console.log(chalk.blue("requesting: ", request.url));

		next();
	})

.get("/route", (request, response) =>
	{   //  A generic route handler

		if (!request.user)
			return response.status(401).sendFile(path.join(__dirname, "../web/login.html"));

		response.sendFile(path.join(__dirname, "../web/page.html"));
	})

.use(express.static(path.join(__dirname, "../web")))

.use(function (request, response)
	{   //  Finally, a handler to for unknown route requests.  That corresponds to an HTML 404 status
		//  code, so send them a 404 page!

		response.sendFile(path.join(__dirname, "../web/404.html"));
	});

module.exports = router;
