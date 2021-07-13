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
      .label('Veuillez ajouter une adresse email correcte')
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

const signupLivreurValidator = (req, res, next) => {
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
    email: Joi.string()
      .label('Veuillez ajouter une adresse email correcte')
      .min(3)
      .max(32)
      .required()
      .email(),
    password: Joi.string()
      .label('Veuillez ajouter un mot de passe (min 6 char)')
      .min(6)
      .max(32)
      .required(),
    role: Joi.number()
      .label('Le rôle est oblogatoire')
      .min(2)
      .max(3)
      .required(),
    idPiece: Joi.string()
      .label("L'ID est obligatoire")
      .min(1)
      .max(13)
      .required(),
    photoCarte: Joi.string()
      .label('La photo est obligatoire')
      .min(6)
      .max(32)
      .required(),
    sexe: Joi.string().label('Sexe').min(1).max(13),
    adresse: Joi.string().label('Adresse').min(1).max(13),
  });
  validateRequest(req, res, next, schema);
};

const updateLivreurValidator = (req, res, next) => {
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
    telephone: Joi.string()
      .label('Le Numero est obligatoire')
      .min(1)
      .max(13)
      .empty(''),
    password: Joi.string()
      .label('Veuillez ajouter un mot de passe (min 6 char)')
      .min(6)
      .max(32)
      .empty(''),
    role: Joi.number().label('Le rôle').required(),
    idPiece: Joi.number()
      .label("L'ID est obligatoire")
      .min(1)
      .max(13)
      .empty(''),
    photoCarte: Joi.string()
      .label('La photo de la carte')
      .min(1)
      .max(13)
      .empty(''),
    avatar: Joi.string().label('La photo de profil').min(1).max(13).empty(''),
    sexe: Joi.string().label('Sexe').min(1).max(13).empty(''),
    adresse: Joi.string().label('Adresse').min(1).max(13).empty(''),
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
    avatar: Joi.string().min(1).max(32).empty(''),
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
  signupLivreurValidator,
  updateLivreurValidator,
};
