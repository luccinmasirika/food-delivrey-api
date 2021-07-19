const AppHttpError = require('../_helpers/appHttpError');

const validateRequest = (req, res, next, schema) => {
  const option = {
    abortEarly: false, // include all errors
    allowUnknown: true, // include all errors
    stripUnknown: true, // remove unknown props
  };

  const { error, value } = schema.validate(req.body, option);

  if (error) {
    next(new AppHttpError(error.details[0].context.label, 422));
  } else {
    req.body = value;
    next();
  }
};

module.exports = validateRequest;
