import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useInputsValues from "../hooks/useInputsValues";
import useMoviesFilter from "../hooks/useMoviesFilter";

export default function Search({ onSearch, setCards }) {
  const location = useLocation();
  const onMainPage = location.pathname === '/movies';
  const savedMovies = JSON.parse(localStorage.getItem('saved-movies')) ?? [];
  const searchState = JSON.parse(onMainPage && localStorage.getItem('searchState')) ?? {};

  const { inputs, handleChange, handleInputsUpdate } = useInputsValues({ title: searchState?.keyWord ?? '' });
  const [ isValid, setIsValid ] = useState(true);
  const [ shortsChecked, setShortsState ] = useState(onMainPage ? searchState?.shortsChecked : "unsettled");
  const [ resetIsActive, setResetState ] = useState(false);

  useEffect(() => {
    !onMainPage && setCards(useMoviesFilter({ movies: savedMovies, keyWord: inputs.title, shortsChecked }));
    console.log(shortsChecked)
  }, [inputs, shortsChecked])


  function handleSearch(evt) {
    evt.preventDefault();

    if (!inputs.title) {
      setIsValid(false);
      return
    }
    onSearch(inputs.title, shortsChecked);
  }

  function handleShortsCheck() {
    setShortsState(!(shortsChecked && shortsChecked !== 'unsettled'));
    !resetIsActive && setResetState(true);
  }

  function handleInputChange(evt) {
    !isValid && setIsValid(true);
    !resetIsActive && setResetState(true);
    handleChange(evt);
  }

  function handleResetButtonClick() {
    setShortsState('unsettled');
    handleInputsUpdate();
    setResetState(false);
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
            onChange={handleInputChange}
            defaultValue={searchState?.keyWord ?? ''}
          />
          { onMainPage ?
            <button className="search__submit-button" type="submit" onClick={handleSearch}> Найти </button> :
            <button
              className={`search__reset-button ${resetIsActive ? 'search__reset-button_active' : ''}`}
              type="reset"
              onClick={handleResetButtonClick}
            /> }
          <span className={`search__validation-error ${!isValid ? 'search__validation-error_active': ''}`}>
            Небходимо ввести ключевое слово
          </span>
        </div>
        <input className="search__shorts" type="checkbox" id="check-shorts" onChange={handleShortsCheck}/>
        <label
          className={ `search__shorts-label ${(shortsChecked && shortsChecked !== "unsettled") ? 'search__shorts-label_checked' : ''}` }
          htmlFor="check-shorts">
            Короткометражки
        </label>
      </form>
    </section>
  )
}