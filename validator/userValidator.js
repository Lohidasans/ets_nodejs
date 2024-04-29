const joi = require('joi');

exports.userRequestValidator = (userPayload) =>
{
    const schema =  {
                      name : joi.string().required(),
                      user_name : joi.string().required(),
                      password : joi.string().min(7).max(255).required(),
                    };
    return joi.validate(userPayload,schema); 
};

