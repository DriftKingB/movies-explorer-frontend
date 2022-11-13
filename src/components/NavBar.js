import { Link, NavLink } from "react-router-dom";


export default function NavBar({ dark }) {
  const activeLinkStyle = {
    fontWeight: "600",
    textDecoration: "none"
  }

  return (
    <nav className="navbar">
      <div className="navbar__utils-nav">
        <Link to="/" className="logo logo_location_movies" />
        { !dark &&
          <>
            <NavLink
              to="/movies"
              className={ `navbar__link navbar__link_type_films` }
              style={({ isActive }) => isActive ? activeLinkStyle : null}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={ `navbar__link navbar__link_type_films` }
              style={({ isActive }) => isActive ? activeLinkStyle : null}
            >
              Сохранённые фильмы
            </NavLink>
          </>
        }
      </div>
      <div className="navbar__account-nav">
        { dark ?
          <>
            <Link to="/signup" className="navbar__link navbar__link_type_signup"> Регистрация </Link>
            <Link to="/signin" className="navbar__link navbar__link_type_signin"> Войти </Link>
          </> :
          <>
            <Link to="/profile" className="navbar__link navbar__link_type_account-info"> Аккаунт </Link>
            <button className="navbar__menu-button" type="button" />
          </>
        }
      </div>
    </nav>
  )
}