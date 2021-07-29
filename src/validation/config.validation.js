const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// CONFIG VALIDATORS
const configValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    devise: Joi.string()
      .label('La devise est obligatoire')
      .min(1)
      .max(32)
      .required(),
    rayonLimite: Joi.number()
      .label('Le rayon est obligatoire')
      .min(1)
      .max(32)
      .required(),
    fraisParKm: Joi.number()
      .label('Le prix par km est obligatoire')
      .min(1)
      .required(),
  });
  validateRequest(req, res, next, schema);
};

const logoIcon = (req, res, next) => {
  const schema = Joi.object().keys({
    image: Joi.string()
      .label('Veuillez choisir un fichier')
      .min(1)
      .max(32)
      .required(),
  });
  validateRequest(req, res, next, schema);
};

const deviseValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Le nom est obligatoire').min(1).max(32).required(),
    taux: Joi.number()
      .label('Le taux doit être supérieur à 0')
      .min(1)
      .required(),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { configValidator, logoIcon, deviseValidator };
