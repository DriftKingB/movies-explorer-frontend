import { customErrors } from "../utils/constants"

export default function useCustomValidatioErrors(validity) {
  if (validity.patternMismatch) {
    return customErrors.namePatternValidation
  }

  return
}