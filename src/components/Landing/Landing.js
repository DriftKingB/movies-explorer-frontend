import About from "./About";
import Footer from "../Footer";
import Header from "../Header";
import Lead from "./Lead";
import Student from "./Student";
import Tech from "./Tech";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Landing({ title }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <>
      <Header
        dark={true}
      />
      <Lead />
      <About />
      <Tech />
      <Student />
      <Footer />
    </>
  )
}