import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../hoc/AuthProvider";
import useInputsValues from "../hooks/useInputsValues";

export default function Search({ onSearch }) {
  const location = useLocation();
  const onMainPage = location.pathname === '/movies';

  const { searchState } = useContext(AuthContext);

  const { inputs, handleChange } = useInputsValues({ title: onMainPage ? searchState?.keyWord : ''});
  const [ isValid, setIsValid ] = useState(true);
  const [ shortsChecked, setShortsState ] = useState(false);

  function handleSearch(evt) {
    evt.preventDefault();

    if (!inputs.title) {
      setIsValid(false);
      return
    }
    onSearch(inputs.title, shortsChecked);
  }

  function handleShortsCheck() {
    onSearch(inputs.title, !shortsChecked);
    setShortsState(!shortsChecked);
  }

  return (
    <section className="search">
      <form className="search__form">
        <div className="search__finder">
          <input
            className="search__input"
            name="title"
            type="text"
            required
            placeholder="Фильм"
            onChange={handleChange}
            defaultValue={inputs?.title}
          />
          <button className="search__submit-button" type="submit" onClick={handleSearch}> Найти </button>
          <span className={`search__validation-error ${!isValid ? 'search__validation-error_active': ''}`}>
            Небходимо ввести ключевое слово
          </span>
        </div>
        <input className="search__shorts" type="checkbox" id="check-shorts" onChange={handleShortsCheck}/>
        <label
          className={ `search__shorts-label ${(shortsChecked) ? 'search__shorts-label_checked' : ''}` }
          htmlFor="check-shorts">
            Короткометражки
        </label>
      </form>
    </section>
  )
}