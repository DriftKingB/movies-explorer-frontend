import About from "./About";
import Footer from "../Footer";
import Header from "../Header";
import Lead from "./Lead";
import Student from "./Student";
import Tech from "./Tech";
import SideBar from "../SideBar";
import { useEffect } from "react";
import ResponsePopup from "../ResponsePopup";

export default function Landing({ title, sideBarIsOpen, setSideBarState, popupMessage }) {
  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <>
      <Header
        dark={true}
        setSideBarState={setSideBarState}
      />
      <section className="main">
        <Lead />
        <About />
        <Tech />
        <Student />
        <SideBar isOpen={ sideBarIsOpen } setSideBarState={ setSideBarState } />
      </section>
      <ResponsePopup message={popupMessage} />
      <Footer />
    </>
  )
}