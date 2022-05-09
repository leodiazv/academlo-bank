const { User } = require('../models/user.model');

// Utils

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const userExists = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    return next(new AppError('User does not exist with given id', 404));
  }

  next();
});

module.exports = { userExists };
