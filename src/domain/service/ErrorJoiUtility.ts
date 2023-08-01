class ErrorUtility {
    static errorMessages = (name: string, type: string) => {
      return {
        requiredMsg: ErrorUtility.requiredMsg(name),
        typeMsg: ErrorUtility.typeMsg(name, type),
        emptyMsg: ErrorUtility.emptyMsg(name),
      };
    };
    static joiHelper = (
      name: string,
      type: string,
      isEmptyCheckRequired = true,
      isTypeCheckRequired = true,
      isRequiredCheckRequired = true,
    ) => {
      let errors = {};
      isRequiredCheckRequired ? (errors["any.required"] = ErrorUtility.requiredMsg(name)) : undefined;
      isTypeCheckRequired ? (errors[`${type}.base`] = ErrorUtility.typeMsg(name, type)) : undefined;
      isEmptyCheckRequired ? (errors[`${type}.empty`] = ErrorUtility.emptyMsg(name)) : undefined;
  
      return errors;
    };
    static requiredMsg = (name) => `${name} is required`;
    static typeMsg = (name, type) => `${name} must be of type ${type}`;
    static emptyMsg = (name) => `${name} is not allowed to be empty`;
  }
  
  export default ErrorUtility;
  