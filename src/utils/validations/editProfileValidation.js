const Joi = require('joi');

const editProfileSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(8).optional().messages({
    'string.min': 'Password must be at least 8 characters',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).optional().messages({
    'string.empty': 'Password confirmation is required',
    'any.only': 'Passwords did not match',
  }),
  full_name: Joi.string().optional(),
  class: Joi.string().optional(),
  university: Joi.string().optional(),
  major: Joi.string().optional(),
});

const editProfileValidation = (req, res, next) => {
  const { error } = editProfileSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    return res.status(400).json({
      status: 'failed',
      message: 'Validation error',
      errors,
    });
  }

  next();
};

module.exports = editProfileValidation;
