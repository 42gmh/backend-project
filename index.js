'use strict'

require('dotenv').config();

const verifyEnv = require("./app/middleware/verifyEnv");

verifyEnv();

const express = require('express');
var cookieParser = require('cookie-parser')
// const cors = require("cors");

// const db = require("./app/models");

// db.sequelize.sync();

const expressServer = express();
expressServer.use(express.urlencoded({ extended: true }));
expressServer.use(express.json());
expressServer.use(express.static('public'));
expressServer.use(cookieParser());

const es6Renderer = require('express-es6-template-engine');
expressServer.engine('html', es6Renderer);
expressServer.set('views', 'templates');
expressServer.set('view engine', 'html');

// expressServer.use(cors({ origin: "http://localhost:3031" }));

// simple route
expressServer.get("/", (req, res) => {

   console.log('Cookies: ', req.cookies);

    res.render('index', {
      partials: {
        signinform : "/partials/signin-form"
    }
    });
});

expressServer.get("/signup", (req, res) => {
  res.render('signup', {
    locals : {
      err : null
    }
  });
});

require('./app/routes/auth.routes')(expressServer);
require('./app/routes/user.routes')(expressServer);

  
// set port, listen for requests
expressServer.listen(process.env.MY_PORT, () => {
    console.log(`Server is running on port ${process.env.MY_PORT}.`);
});


{/* <div class="simple-1" style="background-color: blue; border: 1px solid black">
  <div class="colors">
    <span>Hello ${name}! <strong>You have ${messageCount} messages!</strong></span>
    <ul>${colors ? colors.reduce((m, color) => m + '<li>' + color + '</li>', '') : '<li>No colors!</li>'}</ul>
  </div><button class="${primary ? 'primary' : 'secondary'}">${buttonLabel}</button>
</div> */}