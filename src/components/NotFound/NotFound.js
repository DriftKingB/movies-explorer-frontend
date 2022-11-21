import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function NotFound({ title }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <section className="main">
      <section className="notfound">
        <h1 className="notfound__heading"> 404 </h1>
        <p className="notfound__subline"> Страница не найдена </p>
        <button className="notfound__link" type="button" onClick={() => navigate(-1)}> Назад </button>
      </section>
    </section>
  )
}