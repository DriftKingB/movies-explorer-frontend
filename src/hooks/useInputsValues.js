import { useState } from "react";

export default function useInputsValidation(defaultInputs = {}) {
  const [ inputs, setInputs ] = useState(defaultInputs);

  function handleInputsUpdate(values = defaultInputs) {
    setInputs(values);
  }

  function handleChange(evt) {
    const input = evt.target;
    const value = input.value;

    setInputs({ ...inputs, [input.name]: value });
  }

  return { inputs, handleInputsUpdate, handleChange };
}