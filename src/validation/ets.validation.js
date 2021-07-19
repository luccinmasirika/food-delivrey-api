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
    heure: Joi.array()
      .label("L'heure d'ouverture et de fermeture sont obligatoire")
      .min(1)
      .max(32)
      .required(),
    coordonnees: Joi.array()
      .label('Les coordonnées sont obligatoire')
      .min(2)
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
