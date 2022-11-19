import { Link, NavLink } from "react-router-dom";

export default function SideBar({ isOpen, setSideBarState }) {
  const activeLinkStyle = {
    borderBottom: "2px #000 solid"
  }

  function handleCloseButtonClick() {
    setSideBarState(false);
  }

  return (
    <section className={`sidebar ${isOpen ? 'sidebar_active' : ''}`}>
      <button className="sidebar__close-button" type="button" onClick={ handleCloseButtonClick }/>
      <div className="sidebar__container">
        <nav className="sidebar__nav">
          <div className="sidebar__utils">
            <NavLink
              to="/"
              className="sidebar__nav-link"
              style={({ isActive }) => isActive ? activeLinkStyle : null}
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className="sidebar__nav-link"
              style={({ isActive }) => isActive ? activeLinkStyle : null}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="sidebar__nav-link"
              style={({ isActive }) => isActive ? activeLinkStyle : null}
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <Link to="/profile" className="sidebar__account-button"> Аккаунт </Link>
        </nav>
      </div>
    </section>
  )
}