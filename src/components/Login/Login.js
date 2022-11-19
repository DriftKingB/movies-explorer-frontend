import AuthForm from "../AuthForm"
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useInputsValidation from "../../hooks/useInputsValidation";

export default function Login({ title, onSignin, responseMessage, setResponseMessage }) {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultInputs = {
    email: {isValid: true},
    password: {isValid: true},
  };
  const { inputs, isValid, handleInputsUpdate, handleChange } = useInputsValidation(defaultInputs);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    document.title = title;
    handleInputsUpdate();
    setResponseMessage('');
  }, [location])

  function redirectToFromPage() {
    const fromPage = location.state?.from?.pathname || "/movies";

    navigate(fromPage, {replace: true});
  }

  function handleSignin(evt) {
    evt.preventDefault();
    onSignin(inputs, setIsLoading, redirectToFromPage);
  }

  return (
    <section className="main">
      <section className="auth">
        <Link to="/" className="logo logo_location_form" />
        <AuthForm
          onSubmit={handleSignin}
          inputFieldset={
            <fieldset className="auth-form__input-container">
              <div className="auth-form__field">
                <label className="auth-form__input-label"> E-mail </label>
                <input
                  className={`auth-form__input ${!inputs.email?.isValid? 'auth-form__input_invalid' : ''}`}
                  type="email"
                  required
                  name="email"
                  onChange={handleChange}
                />
                <label className="auth-form__input-label auth-form__input-label_invalid">
                  { inputs.email?.errorMessage }
                </label>
              </div>
              <div className="auth-form__field">
                <label className="auth-form__input-label"> Пароль </label>
                <input
                  className={`auth-form__input ${!inputs.password?.isValid? 'auth-form__input_invalid' : ''}`}
                  type="password"
                  required
                  minLength="3"
                  name="password"
                  onChange={handleChange}
                />
                <label className="auth-form__input-label auth-form__input-label_invalid">
                  { inputs.password?.errorMessage }
                </label>
              </div>
            </fieldset>
          }
          heading={"Рады видеть!"}
          submitText={"Войти"}
          submitSublineText={"Ещё не зарегистрированы?"}
          submitSublineLink={ <Link to="/signup" className="auth-form__submit-subline-link"> Регистрация </Link> }
          responseMessage={responseMessage}
          isValid={isValid}
          isLoading={isLoading}
        />
      </section>
    </section>
  )
}