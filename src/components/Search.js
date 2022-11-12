export default function Search({ shortsChecked }) {
  return (
    <section className="search">
      <form className="search__form" name="finder-form">
        <div className="search__finder">
          <input className="search__input" type="text" required placeholder="Фильм" />
          <button className="search__submit-button" type="submit"> Найти </button>
        </div>
        <input className="search__shorts" type="checkbox" id="check-shorts" />
        <label
          className={ `search__shorts-label ${shortsChecked ? 'search__shorts-label_checked' : ''}` }
          htmlFor="check-shorts">
            Короткометражки
        </label>
      </form>
    </section>
  )
}