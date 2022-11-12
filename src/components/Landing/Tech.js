export default function Tech() {
  return (
    <section className="tech">
      <h1 className="section-title"> Технологии </h1>
      <div className="tech__heading">
        <h2 className="tech__subtitle"> 7 технологий </h2>
        <p className="section-paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <ul className="tech__list">
        <li className="tech__list-item">
          <p className="tech__list-item-text"> HTML </p>
        </li>
        <li className="tech__list-item">
          <p className="tech__list-item-text"> CSS </p>
        </li>
        <li className="tech__list-item">
          <p className="tech__list-item-text"> JS </p>
        </li>
        <li className="tech__list-item">
          <p className="tech__list-item-text"> React </p>
        </li>
        <li className="tech__list-item">
          <p className="tech__list-item-text"> Git </p>
        </li>
        <li className="tech__list-item">
          <p className="tech__list-item-text"> Express.js </p>
        </li>
        <li className="tech__list-item">
          <p className="tech__list-item-text"> mongoDB </p>
        </li>
      </ul>
    </section>
  )
}