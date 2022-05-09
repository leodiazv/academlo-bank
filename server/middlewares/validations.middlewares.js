const { body, validationResult } = require('express-validator');

// Validations

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

// CHECK VALIDATIONS

const checkCreateUserValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    //En la anterior linea de desestructura msg de error y permite hacer un return implicito

    const errorMsg = messages.join('. ');
    //En la anterior variable convertimos el array de mensaes en un solo string, separados por un punto y un espacio.

    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

module.exports = { createUserValidations, checkCreateUserValidation };
