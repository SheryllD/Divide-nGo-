// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)
require

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'Divide&Go'

app.locals.appTitle = `${capitalize(projectName)} here we place the logo`

// All our routes are here

//here is our homepage route
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

//here is our auth route
const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

//here is our LoggedInUser route 
const LoggedInUserRoutes = require('./routes/LoggedInUser.routes')
app.use('/LoggedInUser', LoggedInUserRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
