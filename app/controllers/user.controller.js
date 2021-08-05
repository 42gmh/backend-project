const db = require("../models");
const Twit = db.twit;
const User = db.user;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.loadtwits = (req, res) => {
    console.log('Cookies: ', req.cookies);
    Twit.findAll({
        attributes : ['content', 'createdAt'],
        order: [['createdAt', 'DESC']],
        include: {
            model : User,
            attributes : ['screenname', 'username']
        }
      }).then(twits => {
        res.render('twits', {
            locals : {
                twits
            }
        });
    });
}

exports.createtwit = (req, res) => {

    console.log(req.userId);
    console.log(req.body.twit);
    console.log('Cookies: ', req.cookies);


    Twit.create({
        content: req.body.twit,
        userId: req.userId
    }).then(() => {
        res.redirect(303, '/twits');
    }); 
}