export default function Student() {
  return (
    <section className="student">
      <h1 className="section-title"> Студент </h1>
      <div className="student__about">
        <div className="student__info">
          <div className="student__info-wrap">
            <h2 className="student__title"> Богдан </h2>
            <p className="student__subtitle"> Начинающий фронтенд-разработчик, 20 лет </p>
            <p className="section-paragraph">
              Родился и вырос на Сахалине. Сейчас обучаюсь в Москве в МГСУ на факультете
              промышленного и гражданского строительства. Свободное от основной учебы
              время решил посвятить курсам по программированию. Планирую развиваться
              в интересующих сферах и может даже их совмещать. &quot;Строитель-айтишник&quot; - звучит интересно.
            </p>
          </div>
          <a className="student__info-link" href="https://github.com/DriftKingB" target="blank"> Github </a>
        </div>
        <img className="student__photo" src={require('../../images/student__photo.jpeg')} alt="Фото студента" />
      </div>
      <div className="student__portfolio">
        <p className="student__portfolio-subline"> Портфолио </p>
        <ul className="student__portfolio-nav">
          <li className='student__portfolio-item'>
            <a className="student__portfolio-link" href="https://driftkingb.github.io/how-to-learn/" target="blank">
              <p className="student__portfolio-link-text"> Статичный сайт </p>
              <div className="student__portfolio-item-icon" />
            </a>
          </li>
          <li className='student__portfolio-item'>
            <a className="student__portfolio-link" href="https://driftkingb.github.io/russian-travel/index.html" target="blank">
              <p className="student__portfolio-link-text"> Адаптивный сайт </p>
              <div className="student__portfolio-item-icon" />
            </a>
          </li>
          <li className='student__portfolio-item'>
            <a className="student__portfolio-link" href="https://github.com/DriftKingB/react-mesto-api-full" target="blank">
              <p className="student__portfolio-link-text"> Одностраничное приложение </p>
              <div className="student__portfolio-item-icon" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}