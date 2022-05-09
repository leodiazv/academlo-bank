const { User } = require('../models/user.model');
const { Transfer } = require('../models/transfer.model');

// Utils

const { catchAsync } = require('../utils/catchAsync');

// Controllers

const newTransfer = catchAsync(async (req, res, next) => {
  const { senderUser, receiverUser } = req;
  const { transferAmount } = req.body;

  receiverUser.update({
    amount: receiverUser.amount + parseInt(transferAmount),
  });

  senderUser.update({
    amount: senderUser.amount - parseInt(transferAmount),
  });

  const newTransfer = await Transfer.create({
    amount: transferAmount,
    senderUserId: senderUser.id,
    receiverUserId: receiverUser.id,
  });

  res.status(201).json({
    newTransfer,
  });
});

const getAllTransfers = catchAsync(async (req, res, next) => {
  const transfers = await Transfer.findAll();

  res.status(200).json({
    transfers,
  });
});

const getAllTransfersByUserId = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const transfers = await Transfer.findAll({
    where: {
      senderUserId: parseInt(userId),
    },
  });

  res.status(200).json({
    transfers,
  });
});

module.exports = { newTransfer, getAllTransfers, getAllTransfersByUserId };
