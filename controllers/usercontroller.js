const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

router.post('/signup', (req, res) => {
  const userData = req.body.user;
  userData.passwordHash = bcrypt.hashSync(userData.password, 10);

  userService
    .create(userData)
    .then((user) => {
      const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });

      res.status(200).json({
        user: user,
        token: token
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      });
    })
})

router.post('/signin', (req, res) => {
  userService
    .getByUsername(req.body.user.username)
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordHash, (err, matches) => {
          if (matches) {
            const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });

            res.json({
              user: user,
              message: "Successfully authenticated.",
              sessionToken: token
            });
          } else {
            res.status(502).json({
              message: "Passwords do not match."
            })
          }
        });
      } else {
        res.status(403).json({
          message: "User not found."
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      });
    })
})

module.exports = router;
