import Joi from "joi";
import ErrorUtility from "../../../domain/service/ErrorJoiUtility";

const deleteBookJoiValidation = Joi.object({
  id: Joi.string().guid().required().messages(ErrorUtility.joiHelper("id", "string", false)),
});

export default deleteBookJoiValidation;
