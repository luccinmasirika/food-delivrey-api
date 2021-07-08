const Joi = require('joi'); // Module used for validators
const validateRequest = require('./validatorsRequest');

const signupValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .label('Le nom est obligatoire')
      .min(1)
      .max(32)
      .required(),
    lastName: Joi.string()
      .label('Le postnom est obligatoire')
      .min(1)
      .max(32)
      .required(),
    email: Joi.string()
      .label('Veuillez ajouter une adresse mail correcte')
      .min(3)
      .max(32)
      .required()
      .email(),
    password: Joi.string()
      .label('Veuillez ajouter un mot de passe (min 6 char)')
      .min(6)
      .max(32)
      .required(),
    role: Joi.number().label('Le rôle est oblogatoire').required(),
  });
  validateRequest(req, res, next, schema);
};

const signupClientValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .label('Le nom est obligatoire')
      .min(1)
      .max(32)
      .required(),
    lastName: Joi.string()
      .label('Le postnom est obligatoire')
      .min(1)
      .max(32)
      .required(),
    telephone: Joi.string()
      .label('Le Numero est obligatoire')
      .min(1)
      .max(13)
      .required(),
    password: Joi.string()
      .label('Veuillez ajouter un mot de passe (min 6 char)')
      .min(6)
      .max(32)
      .required(),
    role: Joi.number().label('Le rôle est oblogatoire').required(),
  });
  validateRequest(req, res, next, schema);
};

const updateUserValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .label('Le nom est obligatoire')
      .min(1)
      .max(32)
      .empty(''),
    lastName: Joi.string()
      .label('Le postnom est obligatoire')
      .min(1)
      .max(32)
      .empty(''),
    avatar: Joi.string()
      .label('Le postnom est obligatoire')
      .min(1)
      .max(32)
      .empty(''),
    email: Joi.string()
      .label('Veuillez ajouter une adresse mail correcte')
      .min(3)
      .max(32)
      .email()
      .empty(''),
    password: Joi.string()
      .label('Veuillez ajouter un mot de passe (min 6 char)')
      .min(6)
      .max(32)
      .empty(''),
    role: Joi.number()
      .label('Le rôle est oblogatoire')
      .valid(0, 1, 2)
      .empty(''),
  });
  validateRequest(req, res, next, schema);
};

module.exports = {
  signupValidator,
  updateUserValidator,
  signupClientValidator,
};
