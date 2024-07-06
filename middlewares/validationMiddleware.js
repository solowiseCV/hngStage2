import { body, validationResult } from 'express-validator';

const userValidationRules = () => [
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('lastName').not().isEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').not().isEmpty().withMessage('Password is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map(err => ({ field: err.param, message: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export { userValidationRules, validate };
