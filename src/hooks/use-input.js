import { useState } from "react";

const useInput = (validate) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const valueIsValid = validate(value);
  const hasError = !valueIsValid && touched;

  const inputChangedHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setTouched(true);
  };

  const reset = () => {
    setTouched(false);
    setValue('');
  };

  return {
    value,
    isValid: valueIsValid,
    hasError,
    reset,
    inputChangedHandler,
    inputBlurHandler,
  };
};

export default useInput;
