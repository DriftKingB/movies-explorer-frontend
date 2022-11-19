import About from "./About";
import Footer from "../Footer";
import Header from "../Header";
import Lead from "./Lead";
import Student from "./Student";
import Tech from "./Tech";
import SideBar from "../SideBar";
import { useEffect } from "react";

export default function Landing({ title, sideBarIsOpen, setSideBarState }) {
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
      <Footer />
    </>
  )
}