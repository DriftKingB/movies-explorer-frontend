import NavBar from "./NavBar";

export default function Header({ dark, setSideBarState }) {
  const tokenIsPresent = localStorage.getItem('token') != null;

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