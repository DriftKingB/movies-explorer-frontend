import AuthForm from "../AuthForm";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Register({ title }) {
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
              <label className="auth-form__input-label"> Имя </label>
              <input className="auth-form__input" type="text" required />
            </div>
            <div className="auth-form__field">
              <label className="auth-form__input-label"> E-mail </label>
              <input className="auth-form__input auth-form__input_invalid" type="email" required />
              <label className="auth-form__input-label auth-form__input-label_invalid"> Что-то пошло не так... </label>
            </div>
            <div className="auth-form__field">
              <label className="auth-form__input-label"> Пароль </label>
              <input className="auth-form__input auth-form__input_invalid" type="password" required />
              <label className="auth-form__input-label auth-form__input-label_invalid"> Что-то пошло не так... </label>
            </div>
          </fieldset>
        }
        heading={"Добро пожаловать!"}
        submitText={"Зарегистрироваться"}
        submitSublineText={"Уже зарегистрированы?"}
        submitSublineLink={ <Link to="/signin" className="auth-form__submit-subline-link"> Войти </Link> }
      />
    </section>
  )
}