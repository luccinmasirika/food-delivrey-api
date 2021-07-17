const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// CONFIG VALIDATORS
const menuValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Le nom est obligatoire').min(1).max(32).required(),
    description: Joi.string()
      .label('La description est obligatoire')
      .min(1)
      .required(),
    image: Joi.string().label('Image').min(1).max(32),
    ets: Joi.string()
      .label("L'établissement est obligatoire")
      .min(1)
      .max(32)
      .required(),
    category: Joi.string()
      .label('La catégorie est obligatoire')
      .min(2)
      .max(32)
      .required(),
  });
  validateRequest(req, res, next, schema);
};

const categoryValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Le nom est obligatoire').min(1).max(32).required(),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { menuValidator, categoryValidator };
