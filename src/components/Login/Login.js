import AuthForm from "../AuthForm"
import { useEffect } from "react";
import { Link } from "react-router-dom"

export default function Login({ title }) {
  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <section className="auth">
      <Link to="/" className="logo logo_location_form" />
      <AuthForm
        inputFieldset={
          <fieldset className="auth-form__input-container">
            <div className="auth-form__field">
              <label className="auth-form__input-label"> E-mail </label>
              <input className="auth-form__input" type="email" required />
            </div>
            <div className="auth-form__field">
              <label className="auth-form__input-label"> Пароль </label>
              <input className="auth-form__input" type="password" required />
            </div>
          </fieldset>
        }
        heading={"Рады видеть!"}
        submitText={"Войти"}
        submitSublineText={"Ещё не зарегистрированы?"}
        submitSublineLink={ <Link to="/signup" className="auth-form__submit-subline-link"> Регистрация </Link> }
      />
    </section>
  )
}