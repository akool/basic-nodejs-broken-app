const sequelize = require('../db');
const User = sequelize.import('../models/user');

const create = async (data) => {
  const user = await User.create(data);

  return user;
}

const getById = async (id) => {
  const user = await User.findOne({
    where: { id }
  });

  return user;
}
const getByUsername = async (username) => {
  const user = await User.findOne({
    where: { username }
  });

  return user;
}

module.exports = { create, getById, getByUsername };
