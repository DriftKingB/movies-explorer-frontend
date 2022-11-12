// import { Link } from "react-router-dom";

import NavBar from "./NavBar";

export default function Header({ dark }) {
  return(
    <header className={`header ${dark ? 'header_dark' : ''}`}>
      <NavBar
        dark={dark}
      />
    </header>
  )
}