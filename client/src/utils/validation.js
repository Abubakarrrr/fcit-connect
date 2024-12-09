
export const validateForm = (schema, formData, setErrors) => {
    const { error } = schema.validate(formData, { abortEarly: false });
  
    if (!error) {
      setErrors({});
      return true;
    }
  
    const errorMessages = {};
    error.details.forEach((detail) => {
      errorMessages[detail.context.key] = detail.message;
    });
  
    setErrors(errorMessages);
    return false;
  };
  