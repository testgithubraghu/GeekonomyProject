import Joi from "joi";
import ErrorUtility from "../../../domain/service/ErrorJoiUtility";

const updateBookJoiValidation = Joi.object({
  title: Joi.string().optional().messages(ErrorUtility.joiHelper("title", "string")),
  author: Joi.string().optional().messages(ErrorUtility.joiHelper("author", "string")),
  description: Joi.string().optional().messages(ErrorUtility.joiHelper("description", "string")),
  publicationYear: Joi.string().optional().messages(ErrorUtility.joiHelper("publicationYear", "string")),
});

export default updateBookJoiValidation;
