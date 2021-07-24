const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// ETS VALIDATORS
const etsValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Le nom est obligatoire').min(1).max(32).required(),
    description: Joi.string()
      .label('La description est obligatoire')
      .min(1)
      .required(),
    ouverture: Joi.string()
      .label("L'heure d'ouverture est obligatoire")
      .min(1)
      .max(32)
      .required(),
    fermeture: Joi.string()
      .label("L'heure de fermeture est obligatoire")
      .min(1)
      .max(32)
      .required(),
    long: Joi.string()
      .label('La longitude est obligatoire')
      .min(1)
      .max(32)
      .required(),
    lat: Joi.string()
      .label('La latitude est obligatoire')
      .min(1)
      .max(32)
      .required(),
    disable: Joi.any().label('Actif'),
    type: Joi.string()
      .label('Le type est obligatoire')
      .min(1)
      .max(32)
      .required(),
    image: Joi.string().label('Image').min(1).max(32),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { etsValidator };
