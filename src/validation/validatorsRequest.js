const validateRequest = (req,res, next, schema) => {
  const option = {
    abortEarly: false, // include all errors
    allowUnknown: true, // include all errors
    stripUnknown: true, // remove unknown props
  }

  const { error, value } = schema.validate(req.body, option)

  if (error) {
    res.status(422).json({
      error: error.details[0].context.label
    })
  } else {
    req.body = value;
    next()
  }
}

module.exports = validateRequest
