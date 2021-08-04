module.exports = (sequelize, Sequelize) => {
    const Twit = sequelize.define("twits", {
      content: {
        type: Sequelize.STRING
      }
    });
  
    return Twit;
  };