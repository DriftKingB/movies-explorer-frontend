export default function AuthForm({ inputFieldset, heading, submitText, submitSublineText, submitSublineLink, responseMessage, isValid, isLoading, onSubmit }) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="auth-form__content">
        <h1 className="auth-form__title"> { heading } </h1>
        { inputFieldset }
      </div>
      <fieldset className="auth-form__handlers">
        <p className="auth-form__response"> { responseMessage } </p>
        <button
          className={`auth-form__submit-button ${!isValid ? 'auth-form__submit-button_inactive' : ''}`}
          type="submit"
          disabled={!isValid}
        >
          { !isLoading ? submitText : <div className="auth-form__loading-icon" /> }
        </button>
        <div className="auth-form__submit-subline">
          <p className="auth-form__submit-subline-text"> { submitSublineText } </p>
          { submitSublineLink }
        </div>
      </fieldset>
    </form>
  )
}