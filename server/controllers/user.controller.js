const { User } = require('../models/user.model');

// Utils

const { catchAsync } = require('../utils/catchAsync');

// Controllers

const createUser = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const accountNumber = Math.floor(Math.random() * 1000000);

  const newUser = await User.create({ name, password, accountNumber });

  res.status(201).json({ newUser });
});

const userlogin = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.findOne({
    where: {
      name: name,
    },
  });

  if (!user) {
    res.status(400).json({
      msg: 'User name not found',
    });
  } else if (user.password === password) {
    res.status(200).json({
      msg: 'Logeado',
    });
  } else {
    res.status(400).json({
      msg: 'Incorrect password',
    });
  }
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    users,
  });
});

module.exports = { createUser, userlogin, getAllUsers };
