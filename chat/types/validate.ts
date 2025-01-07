import Joi from "joi";

export const verifySchema=Joi.object({
    deviceId: Joi.string().required(),
});

export const chatSchema=Joi.object({
    text: Joi.string().required().messages({
            "string.empty": "Tin nhắn không được để trống",
            "any.required": "Thiếu tin nhắn"
        }),
    id: Joi.string().required().messages({
        "string.empty": "Id chat không được để trống",
        "any.required": "Thiếu id chat"
    }),
})