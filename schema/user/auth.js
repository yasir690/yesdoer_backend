const Joi = require("joi");

const userRegisterSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    deviceType: Joi.string()
      .valid('ANDROID', 'IOS')
      .optional()
      .allow(null, '')
      .messages({
        'any.only': 'deviceType must be either ANDROID or IOS',
      }),
    deviceToken: Joi.string().optional().allow(null, ''),
  }),
});

const userVerifySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({

  }),
});


const userLoginSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
  }),
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  userRegisterSchema,
  userVerifySchema,
  userLoginSchema
}
