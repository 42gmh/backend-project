const db = require("../models");
const Twit = db.twit;
const User = db.user;


exports.updateUserSettings = (req, res) => {

    console.log("Hi!", req.userId);
    console.log("Hi!", req.body.screenname);
    console.log("Hi!", req.body.email);

    User.update(
        { screenname: req.body.screenname, email: req.body.email}, 
        { where: { id: req.userId } }
    ).then( () => {
        findUserAndRender(req.userId, "Update successful!", res);
    });
}

exports.userSettings = (req, res) => {
    findUserAndRender(req.userId, null, res);
}

function findUserAndRender(userId, status, res){
    
    User.findByPk(userId).then((theUser) => { 
        res.render('userinfo', {
            locals : {
                userInfo : theUser,
                updateStatus : status
            }
        });
    });
}

exports.loadtwits = (req, res) => {

    Twit.findAll({
        attributes : ['id', 'content', 'createdAt'],
        order: [['createdAt', 'DESC']],
        include: {
            model : User,
            attributes : ['screenname', 'username', 'id']
        }
      }).then(twits => {
          twits.forEach(aTwit => {
            aTwit.isMine = (aTwit.user.id == req.userId);
          });

        res.render('twits', {
            locals : {
                twits
            }
        });
    });
}

exports.createtwit = (req, res) => {

    Twit.create({
        content: req.body.twit,
        userId: req.userId
    }).then(() => {
        res.redirect(303, '/twits');
    }); 
}

exports.deletetwit = (req, res) => {

    console.log(req.userId);
    console.log(req.body.twitToDel);

    Twit.findByPk(req.body.twitToDel).then((theTwit) => {

        if(theTwit && theTwit.userId == req.userId)
        {
            console.log("NUKING IT!!!!");
            Twit.destroy({
                where: {
                id: req.body.twitToDel
                }
            });
        }

    });

    res.redirect(303, '/twits');
}