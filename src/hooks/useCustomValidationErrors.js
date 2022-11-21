import { customErrors } from "../utils/constants"

export default function useCustomValidatioErrors(input) {
  const inputValidity = input.validity;
  const inputName = input.name;

  if (inputValidity.patternMismatch) {
    if (inputName === 'name') {
      return customErrors.namePatternValidation
    } else if (inputName === 'email') {
      return customErrors.emailPatternValidation
    }
  }

  return
}