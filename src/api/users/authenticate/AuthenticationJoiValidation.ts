import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import ErrorUtility from "../../../domain/service/ErrorJoiUtility";

const complexityOptions = {
  min: 8,
  max: 25,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const authenticationJoiValidation = Joi.object({
  email: Joi.string().required().messages(ErrorUtility.joiHelper("title", "string")),
  password: passwordComplexity(complexityOptions).required().messages(ErrorUtility.joiHelper("author", "string")),
});

export default authenticationJoiValidation;
