export default function About() {
  return (
    <section className="about">
      <h1 className="section-title"> О проекте </h1>
      <ul className="about__info">
        <li className="about__info-item">
          <h2 className="about__info-title"> Дипломный проект включал 5 этапов </h2>
          <p className="section-paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="about__info-item">
          <h2 className="about__info-title"> На выполнение диплома ушло 5 недель </h2>
          <p className="section-paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about__visual">
        <li className="about__visual-item">
          <p className="about__visual-text"> 1 неделя </p>
          <p className="about__visual-subtext"> Back-end </p>
        </li>
        <li className="about__visual-item">
          <p className="about__visual-text"> 4 недели </p>
          <p className="about__visual-subtext"> Front-end </p>
        </li>
      </ul>
    </section>
  )
}