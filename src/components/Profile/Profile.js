import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header";

export default function Profile({ title }) {
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <>
      <Header />
      <section className="main">
        <section className="profile">
          <h1 className="profile__heading"> Привет, { user?.name }! </h1>
          <ul className="profile__info">
            <li className="profile__info-item">
              <p className="profile__info-text"> Имя </p>
              <p className="profile__info-text"> { user?.name } </p>
            </li>
            <li className="profile__info-item">
              <p className="profile__info-text"> E-mail </p>
              <p className="profile__info-text"> { user?.email } </p>
            </li>
          </ul>
          <div className="profile__handlers">
              <p className="profile__handlers-link profile__handlers-link_type_edit"> Редактировать </p>
              <p className="profile__handlers-link profile__handlers-link_type_signout"> Выйти из аккаунта </p>
          </div>
        </section>
      </section>
    </>
  )
}