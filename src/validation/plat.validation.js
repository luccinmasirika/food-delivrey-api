const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

// PLAT VALIDATORS
const platValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    nom: Joi.string().label('Le nom est obligatoire').min(1).max(32).required(),
    delais: Joi.number()
      .label('Le délais est obligatoire')
      .min(1)
      .max(32)
      .required(),
    prix: Joi.number()
      .label('Le prix est obligatoire')
      .min(1)
      .max(32)
      .required(),
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
    menu: Joi.string()
      .label('Le menu est obligatoire')
      .min(2)
      .max(32)
      .required(),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { platValidator };

/*

    autresImages: [{ type: String }],

*/
