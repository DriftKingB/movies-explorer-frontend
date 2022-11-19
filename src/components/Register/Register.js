import AuthForm from "../AuthForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useInputsValidation from "../../hooks/useInputsValidation";

export default function Register({ title, onSignup, responseMessage, setResponseMessage }) {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultInputs = {
    name: {isValid: true},
    email: {isValid: true},
    password: {isValid: true},
  };
  const [ isLoading, setIsLoading ] = useState(false);
  const { inputs, isValid, handleInputsUpdate, handleChange } = useInputsValidation(defaultInputs);

  useEffect(() => {
    document.title = title;
    handleInputsUpdate();
    setResponseMessage('');
  }, [location])

  function redirectToFromPage() {
    const fromPage = "/movies";

    navigate(fromPage, {replace: true});
  }

  function handleSignup(evt) {
    evt.preventDefault();
    onSignup(inputs, setIsLoading, redirectToFromPage)
  }

  return (
    <section className="main">
      <section className="auth">
        <Link to="/" className="logo logo_location_form" />
        <AuthForm
          onSubmit={handleSignup}
          inputFieldset={
            <fieldset className="auth-form__input-container">
              <div className="auth-form__field">
                <label className="auth-form__input-label"> Имя </label>
                <input
                  className={`auth-form__input ${!inputs.name?.isValid? 'auth-form__input_invalid' : ''}`}
                  type="text"
                  required
                  minLength="2"
                  maxLength="30"
                  pattern="^[A-Za-zА-Яа-яЁё -]+"
                  name="name"
                  onChange={handleChange}
                />
                <label className="auth-form__input-label auth-form__input-label_invalid">
                  { inputs.name?.errorMessage }
                </label>
              </div>
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
                  className={`auth-form__input ${!inputs.password?.isValid ? 'auth-form__input_invalid' : ''}`}
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
          heading={"Добро пожаловать!"}
          submitText={"Зарегистрироваться"}
          submitSublineText={"Уже зарегистрированы?"}
          submitSublineLink={ <Link to="/signin" className="auth-form__submit-subline-link"> Войти </Link> }
          responseMessage={responseMessage}
          isValid={isValid}
          isLoading={isLoading}
        />
      </section>
    </section>
  )
}