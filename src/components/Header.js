import { useContext } from "react";
import { AuthContext } from "../hoc/AuthProvider";
import NavBar from "./NavBar";

export default function Header({ dark, setSideBarState }) {
  const { tokenIsPresent } = useContext(AuthContext);

  return(
    <header className={`header ${dark ? 'header_dark' : ''}`}>
      <NavBar
        dark={dark}
        tokenIsPresent={tokenIsPresent}
        setSideBarState={setSideBarState}
      />
    </header>
  )
}