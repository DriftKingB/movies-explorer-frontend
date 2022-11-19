import { useEffect, useState } from "react";
import useCustomValidatioErrors from "./useCustomValidationErrors";

export default function useInputsValidation(defaultInputs = {}) {
  const [ inputs, setInputs ] = useState(defaultInputs);
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    const someInputIsInvalid = Object.values(inputs).some(input => !(input?.isValid));

    !someInputIsInvalid ? setIsValid(true) : setIsValid(false);
  }, [inputs]);

  function handleInputsUpdate() {
    setInputs(defaultInputs);
  }

  function handleChange(evt) {
    const input = evt.target;
    const value = input.value;
    const isValid = input.validity.valid;
    const errorMessage = useCustomValidatioErrors(input.validity) ?? input.validationMessage;

    setInputs({ ...inputs, [input.name]: { value, isValid, errorMessage } });
  }

  return { inputs, isValid, setIsValid, handleInputsUpdate, handleChange };
}