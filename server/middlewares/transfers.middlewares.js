const { User } = require('../models/user.model');

// Utils

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const usersExists = catchAsync(async (req, res, next) => {
  const { senderUserAccountNumber, receiverUserAccountNumber } = req.body;

  const senderUser = await User.findOne({
    where: { accountNumber: senderUserAccountNumber },
  });

  const receiverUser = await User.findOne({
    where: { accountNumber: receiverUserAccountNumber },
  });

  if (!senderUser) {
    return next(
      new AppError('Sender user does not exist with given account number', 404)
    );
  }

  if (!receiverUser) {
    return next(
      new AppError(
        'Receiver user does not exist with given account number',
        404
      )
    );
  }

  // Add user data to the req object

  req.senderUser = senderUser;
  req.receiverUser = receiverUser;

  next();
});

const sufficientTransferValue = catchAsync(async (req, res, next) => {
  const { senderUser } = req;
  const { transferAmount } = req.body;

  if (transferAmount > senderUser.amount) {
    return next(new AppError('Insufficient funds', 400));
  }

  next();
});

module.exports = { usersExists, sufficientTransferValue };
