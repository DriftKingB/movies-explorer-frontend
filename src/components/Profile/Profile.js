import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useInputsValidation from "../../hooks/useInputsValidation";
import Header from "../Header";

export default function Profile({ title, onEdit, onSignout, responseMessage, setResponseMessage }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [ isForm, setIsForm ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const defaultInputs = {
    name: { value: user?.name, isValid: true },
    email: { value: user?.email, isValid: true }
  };
  const { inputs, isValid, setIsValid, handleInputsUpdate, handleChange } = useInputsValidation(defaultInputs);

  useEffect(() => {
    document.title = title;
    handleFormRender();
  }, [location])

  useEffect(() => {
    handleFormRender();
  }, [user])

  function handleEditButtonClick() {
    setIsForm(true);
    setIsValid(false);
  }

  function handleFormRender() {
    setIsForm(false);
    handleInputsUpdate();
    setResponseMessage('');
  }

  function handleSignout() {
    onSignout(() => navigate('/signin', { replace: true }));
  }

  function handleUserUpdate(evt) {
    evt.preventDefault();

    onEdit(inputs, setIsLoading);
  }

  return (
    <>
      <Header />
      <section className="main">
        <form className="profile" onSubmit={handleUserUpdate}>
          <h1 className="profile__heading"> Привет, { user?.name }! </h1>
          <fieldset className="profile__info">
            <div className="profile__field">
              <p className="profile__info-text"> Имя </p>
              {
                isForm ?
                  <input
                  className={`profile__input ${!inputs.name?.isValid ? 'profile__input_invalid' : ''}`}
                  type="text"
                  required
                  minLength="2"
                  maxLength="30"
                  pattern="^[A-Za-zА-Яа-яЁё -]+"
                  name="name"
                  defaultValue={inputs.name?.value}
                  onChange={handleChange}
                  disabled={!isForm}
                  /> :
                  <p className="profile__info-text"> { user?.name } </p>
              }
            </div>
            <div className="profile__field">
              <p className="profile__info-text"> E-mail </p>
              {
                isForm ?
                  <input
                  className={`profile__input ${!inputs.email?.isValid ? 'profile__input_invalid' : ''}`}
                  type="email"
                  required
                  name="email"
                  defaultValue={inputs.email?.value}
                  onChange={handleChange}
                  disabled={!isForm}
                  /> :
                  <p className="profile__info-text"> { user?.email } </p>
              }
            </div>
          </fieldset>
          <fieldset className="profile__handlers">
            <p className="profile__response"> {responseMessage} </p>
            {
              isForm ?
                <>
                  <button
                    className={`profile__button profile__button_type_submit ${!isValid ? 'profile__button_inactive' : ''}`}
                    type="submit"
                    disabled={!isValid}
                  >
                    { !isLoading ? "Сохранить" : <div className="profile__loading-icon" /> }
                  </button>
                  <button
                    className="profile__button profile__button_type_cancel"
                    type="button"
                    onClick={handleFormRender}
                  > Отмена </button>
                </>  :
                <>
                  <button
                    className="profile__button profile__button_type_edit"
                    type="button"
                    onMouseDown={handleEditButtonClick}
                  > Редактировать </button>
                  <button
                    className="profile__button profile__button_type_signout"
                    type="button"
                    onClick={handleSignout}
                  > Выйти из аккаунта </button>
                </>
            }
          </fieldset>
        </form>
      </section>
    </>
  )
}