import { useEffect, useState } from "react";
import useCustomValidationErrors from "./useCustomValidationErrors";

export default function useInputsValidation({ defaultInputs, defaultIsValidState }) {
  const [ inputs, setInputs ] = useState(defaultInputs);
  const [ isValid, setIsValid ] = useState(defaultIsValidState);

  useEffect(() => {
    const someInputIsInvalid = Object.values(inputs).some(input => !(input?.isValid ?? defaultIsValidState));
    const inputsDidntChange = Object.values(inputs).every(input => {
      return Object.values(defaultInputs).some(defaultInput => {
        return defaultInput.value === input.value;
      });
    });

    (someInputIsInvalid || inputsDidntChange) ? setIsValid(false) : setIsValid(true);
  }, [inputs]);

  function handleInputsUpdate() {
    setInputs(defaultInputs);
  }

  function handleChange(evt) {
    const input = evt.target;
    const value = input.value;
    const isValid = input.validity.valid;
    const errorMessage = useCustomValidationErrors(input) ?? input.validationMessage;

    setInputs({ ...inputs, [input.name]: { value, isValid, errorMessage } });
  }

  return { inputs, isValid, setIsValid, handleInputsUpdate, handleChange };
}