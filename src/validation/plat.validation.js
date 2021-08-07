const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// PLAT VALIDATORS
const platValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Name is required').min(3).max(32).required(),
    delais: Joi.number().label('Delais is required').min(1).max(32).required(),
    prix: Joi.number()
      .label('The price must be greater than 0')
      .min(0.1)
      .max(32)
      .required(),
    description: Joi.string()
      .label('Description is required')
      .min(1)
      .required(),
    image: Joi.string().label('Image').min(1).max(32),
    ets: Joi.string().label('Establishment').min(1).max(32).required(),
    menu: Joi.string().label('Menu is required').min(2).max(32).required(),
  });
  validateRequest(req, res, next, schema);
};

const platEditValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Invalid name').min(3).max(32).empty(''),
    delais: Joi.number().label('Invalid delais').min(1).max(32).empty(''),
    prix: Joi.number().label('Invalid price').min(0.1).max(32).empty(''),
    description: Joi.string().label('Invalid description').min(1).empty(''),
    image: Joi.string().label('Image').min(1).max(32),
    ets: Joi.string().label('Invalid establishment').min(1).max(32).empty(''),
    menu: Joi.string().label('Invalid menu').min(2).max(32).empty(''),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { platValidator, platEditValidator };

/*

    autresImages: [{ type: String }],

*/
