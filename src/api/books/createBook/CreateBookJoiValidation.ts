import Joi from "joi";
import ErrorUtility from "../../../domain/service/ErrorJoiUtility";

const createBookJoiValidation = Joi.object({
  title: Joi.string().required().messages(ErrorUtility.joiHelper("title", "string")),
  author: Joi.string().required().messages(ErrorUtility.joiHelper("author", "string")),
  description: Joi.string().required().messages(ErrorUtility.joiHelper("description", "string")),
  publicationYear: Joi.string().required().messages(ErrorUtility.joiHelper("publicationYear", "string")),
});

export default createBookJoiValidation;
