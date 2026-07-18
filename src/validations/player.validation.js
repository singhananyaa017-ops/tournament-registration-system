const { body } = require('express-validator');

const createPlayerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
];

module.exports = { createPlayerValidation };