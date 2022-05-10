const express = require('express');

const router = express.Router();

// Middlewares

const {
  createUserValidations,
  checkCreateUserValidation,
} = require('../middlewares/validations.middlewares');

const { userExists } = require('../middlewares/users.middlewares');

// Controllers

const {
  createUser,
  userlogin,
  getAllUsers,
} = require('../controllers/user.controller');

const {
  getAllTransfersByUserId,
} = require('../controllers/transfer.controller');

// Routes

router.route('/').get(getAllUsers);

router
  .route('/signup')
  .post(createUserValidations, checkCreateUserValidation, createUser);
router.route('/login').post(userlogin);

router.route('/:userId/history').get(userExists, getAllTransfersByUserId);

module.exports = { usersRouter: router };
