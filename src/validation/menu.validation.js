const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// MENU VALIDATORS
const menuValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Name is required').min(1).max(32).required(),
    description: Joi.string()
      .label('Description is required')
      .min(1)
      .required(),
    image: Joi.string().label('Image is required').min(1).max(32),
  });
  validateRequest(req, res, next, schema);
};

const menuEditValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Invalid name').min(1).max(32).empty(''),
    description: Joi.string().label('Invalid description').min(1).empty(''),
    image: Joi.string().label('Invalid image').min(1).max(32),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { menuValidator, menuEditValidator };
