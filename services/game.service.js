const sequelize = require('../db');
const Game = sequelize.import('../models/game');

const findByUser = async (owner_id) => {
  const games =  await Game.findAll({
    where: { owner_id }
  });

  return games;
};

const findById = async (id, owner_id) => {
  const game =  await Game.findOne({
    where: { id, owner_id }
  });

  return game;
};

const create = async (data) => {
  const game = await Game.create(data);

  return game;
}

const update = async (id, data) => {
  const game = await Game.update(data, {
    where: { id, owner_id: data.owner_id }
  });

  return game;
}

const remove = async (id, owner_id) => {
  const game = await Game.destroy({
    where: { id, owner_id }
  });

  return game;
}

module.exports = { findByUser, findById, create, update, remove };
