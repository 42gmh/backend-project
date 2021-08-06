const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    screenname: req.body.screenname
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            console.log("User:" + user.username + " created with roles:" + roles);
            // res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          console.log("User:" + user.username + " created with default role.");
          // res.send({ message: "User was registered successfully!" });
        });
      }
    }).then(() => {
      res.render('signup-success', {
        partials: {
          signinform : "/partials/signin-form"
      }
      });    
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.render('index', {
          partials: { signinform : "/partials/signin-form" },    
          locals : { err : "Unable to login." }
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.render('index', {
          partials: { signinform : "/partials/signin-form" },    
          locals : { err : "Unable to Login." }
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.cookie('twittoken', token, { httpOnly: true, secure: false, maxAge: 3600000 });

      res.redirect(303, '/twits');
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};