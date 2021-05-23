const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

module.exports = function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next();   // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if (!sessionToken) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    } else {
      jwt.verify(sessionToken, 'lets_play_sum_games_man', (err, decoded) => {
        if (decoded) {
          userService
            .getById(decoded.id)
            .then((user) => {
              req.user = user;
              console.log(`user: ${user}`);
              next();
            },
              () => {
                res.status(401).json({
                  message: "not authorized"
                });
              });
        } else {
          res.status(400).json({
            message: "not authorized"
          });
        }
      });
    }
  }
}