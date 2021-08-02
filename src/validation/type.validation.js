const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// TYPE VALIDATORS
const typeValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Invalid name').min(3).max(32).required(),
    description: Joi.string().label('Invalid description').min(1).required(),
  });
  validateRequest(req, res, next, schema);
};

const typeEditValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Invalid name').min(3).max(32).empty(''),
    description: Joi.string().label('Invalid description').min(1).empty(''),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { typeValidator, typeEditValidator };
