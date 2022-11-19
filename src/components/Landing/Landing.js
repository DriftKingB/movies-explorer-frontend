import About from "./About";
import Footer from "../Footer";
import Header from "../Header";
import Lead from "./Lead";
import Student from "./Student";
import Tech from "./Tech";
import { useEffect } from "react";

export default function Landing({ title }) {
  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <>
      <Header
        dark={true}
      />
      <section className="main">
        <Lead />
        <About />
        <Tech />
        <Student />
      </section>
      <Footer />
    </>
  )
}