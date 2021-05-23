const router = require('express').Router();
const gameService = require('../services/game.service');

router.route('/all').get(async (req, res) => {
  gameService
    .findByUser(req.user.id)
    .then((data) => {
      res.status(200).json({
        games: data,
        message: 'Data fetched.'
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Data not found.'
      });
    });
});

router.route('/:id').get(async (req, res) => {
  gameService
    .findById(req.params.id, req.user.id)
    .then((game) => {
      res.status(200).json({
        game: game
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Data not found.'
      });
    });
});

router.route('/create').post(async (req, res) => {
  const gameData = req.body.game;
  gameData.owner_id = req.user.id;

  gameService
    .create(gameData)
    .then((game) => {
      res.status(201).json({
        game: game,
        message: 'Game created.'
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.route('/update/:id').put(async (req, res) => {
  const gameData = req.body.game;
  gameData.owner_id = req.user.id;

  gameService
    .update(req.params.id, gameData)
    .then((game) => {
      res.status(200).json({
        game: game,
        message: 'Successfully updated.'
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      });
    })
});

router.route('/remove/:id').delete(async (req, res) => {
  gameService
    .remove(req.params.id, req.user.id)
    .then((game) => {
      res.status(200).json({
        game: game,
        message: 'Successfully deleted.'
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      });
    });
});

module.exports = router;