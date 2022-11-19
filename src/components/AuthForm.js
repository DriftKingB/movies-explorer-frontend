export default function AuthForm({ inputFieldset, heading, submitText, submitSublineText, submitSublineLink }) {
  return (
    <form className="auth-form">
      <div className="auth-form__content">
        <h1 className="auth-form__title"> { heading } </h1>
        { inputFieldset }
      </div>
      <fieldset className="auth-form__handlers">
        <button className="auth-form__submit-button" type="submit"> { submitText } </button>
        <div className="auth-form__submit-subline">
          <p className="auth-form__submit-subline-text"> { submitSublineText } </p>
          { submitSublineLink }
        </div>
      </fieldset>
    </form>
  )
}