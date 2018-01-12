const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      };

      if (!req.value) {
        req.value = {};
      }

      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      username: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(4)
    }),
    jokeSchema: Joi.object().keys({
      title: Joi.string().required().min(4),
      text: Joi.string().required().min(4),
      keywords: Joi.array().items(Joi.string().min(2))
    })
  }
};
