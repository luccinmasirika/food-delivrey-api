const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// ETS VALIDATORS
const etsValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Name is required').min(1).max(32).required(),
    description: Joi.string()
      .label('Description is required')
      .min(1)
      .required(),
    type: Joi.string().label('Type is required').min(1).max(32).required(),
    ouverture: Joi.string().label('Opening Hour is required').min(1).required(),
    fermeture: Joi.string().label('Closure Hour is required').min(1).required(),
    long: Joi.string().label('Longitude is required').min(1).required(),
    lat: Joi.string().label('Latitude is required').min(1).required(),
    image: Joi.string().label('Image').min(1).max(32),
  });
  validateRequest(req, res, next, schema);
};

const etsEditValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Invalid name').min(3).max(32).empty(''),
    description: Joi.string().label('Invalid description').min(1).empty(''),
    type: Joi.string().label('Invalid type').min(1).max(32).empty(''),
    ouverture: Joi.string().label('Invalid open time').min(1).empty(''),
    fermeture: Joi.string().label('Invalid close time').min(1).empty(''),
    long: Joi.string().label('Invalid long').min(1).empty(''),
    lat: Joi.string().label('Invalid lat').min(1).empty(''),
    image: Joi.string().label('Image').min(1).max(32),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { etsValidator, etsEditValidator };
