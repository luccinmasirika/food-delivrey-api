const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// COMMANDE VALIDATORS
const createCommandeValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    produit: Joi.array().label('Product is required').min(1).required(),
    client: Joi.string().label('Client is required').min(24).max(24).required(),
    ville: Joi.string().label('Town is required').min(1).max(32).required(),
    adresse1: Joi.string()
      .label('Adress is required')
      .min(1)
      .max(32)
      .required(),
    adresse2: Joi.string().label('Error with adress 2').min(1).max(32),
    long: Joi.string().label('Longitude is required').min(1).max(32),
    lat: Joi.string().label('Latitude is required').min(1).max(32),
    distance: Joi.number().label('Distance is required').required(),
  });
  validateRequest(req, res, next, schema);
};

const accepterCommandeValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    etat: Joi.string()
      .label("L'état est invalide")
      .valid('VALIDATED', 'DENIED')
      .min(1)
      .max(32)
      .required(),
  });
  validateRequest(req, res, next, schema);
};

const payerCommandeValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    etat: Joi.string()
      .label("L'état est obligatoire")
      .valid('PAYIED', 'CANCELED')
      .min(1)
      .max(32)
      .required(),
  });
  validateRequest(req, res, next, schema);
};

const CommandeValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    commande: Joi.string()
      .label('La commande est obligatoire')
      .min(24)
      .max(24)
      .required(),
    ets: Joi.string()
      .label("L'établissement est obligatoire")
      .min(24)
      .max(24)
      .required(),
    etat: Joi.String()
      .label("L'état est obligatoire")
      .min(1)
      .max(32)
      .required(),
  });
  validateRequest(req, res, next, schema);
};

module.exports = {
  createCommandeValidator,
  CommandeValidator,
  accepterCommandeValidator,
  payerCommandeValidator,
};
