const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/usersettings",
    [authJwt.verifyToken],
    controller.userSettings
  );

  app.get(
    "/twits",
    [authJwt.verifyToken],
    controller.loadtwits
  );

  app.post(
    "/twit",
    [authJwt.verifyToken],
    controller.createtwit
  );

  app.post(
    "/deltwit",
    [authJwt.verifyToken],
    controller.deletetwit
  );

};