const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// TYPE VALIDATORS
const typeValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Le nom est obligatoire').min(1).max(32).required(),
    description: Joi.string()
      .label('La description est obligatoire')
      .min(1)
      .required()
  });
  validateRequest(req, res, next, schema);
};

module.exports = { typeValidator };
