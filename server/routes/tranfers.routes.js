const express = require('express');

const router = express.Router();

// Middlewares

const {
  usersExists,
  sufficientTransferValue,
} = require('../middlewares/transfers.middlewares');

// Controllers

const {
  newTransfer,
  getAllTransfers,
} = require('../controllers/transfer.controller');

// Routes

router
  .route('/')
  .patch(usersExists, sufficientTransferValue, newTransfer)
  .get(getAllTransfers);

module.exports = { transfersRouter: router };
