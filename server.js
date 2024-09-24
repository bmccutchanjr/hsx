//  This is the entry point for several utilitoes to help me manage my HSX.com account.  These are stand-alone
//	applications and I'm not planning to share them (at least not now).  There's nothing about them that requires the
//	functionality of a server, except CORS.  Because these utilities will scrape information from vatious HSX pages,
//	I need a server.  If these utilites are loaded from disk, the browser won't let me fetch paged from HSX because of
//	CORS issues.  CORS headers are required and I can only get those from an HTTP server.

//	01	Removing standard code that I don't need at the moment

//	01	//
//	01	//  Require and configure NPM modules that are required to configure ExpressJS with WS
//	01	//
const chalk = require("chalk");
//	01	const cookies = require ("cookie-parser");
//	01	const dotenv = require("dotenv").config();
const express = require("express");
//	01	const session = require ("express-session");
//	01	const passport = require("passport");
//	01	const websocket = require("./end-points/sockets.js");

// Configure ExpressJS

const app = express();
//	01	app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//	01	app.use (session (
//	01		{
//	01			secret: "keyboard cat",
//	01			resave: true,
//	01			saveUninitialized: true
//	01		}));
//	01	
//	01	//  And link Passport to ExpressJS
//	01	
//	01	app.use (passport.initialize());
//	01	app.use (passport.session ());

//  Require custom modules to handles routes and end-points

//	01	app.use ("/api", require("./routes/api.js"));
app.use ("/", require("./routes/html.js"));

// Set the PORT to be used by the server.  If the Node.js process environment has a variable defined called
// PORT, this application is likely deployed on Heroku and it must use the server must use the port specified
// by Heroku.  If the process environment does not have a PORT variable defined it is probably running locally
// and can use pretty much whatever port I want.

const PORT = process.env.PORT ? process.env.PORT : 80;

const server = app.listen (PORT, () =>
{   //  Start the ExpressJS server to handle HTTP requests.

	//  If this application is hosted on the cloud, we'll listen on whatever port is assigned to it,
	//  otherwise we'll listen to port 80 and any address configured on the host machine

	if (server.listening)
	{
		console.log (chalk.green("The server is up and running"));
		console.log (chalk.green("Listening on port " + PORT));
	}
});

//	01	//  ExpressJS returns a reference to the HTTP server it created.  Use that to start a WebSocket server.
//	01	
//	01	websocket.createServer (server);
