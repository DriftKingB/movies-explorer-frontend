import { useEffect, useState } from "react";
import { moviesBaseUrl } from "../utils/constants";

export default function AlbumCard({ card, onMainPage, onLike, onDislike, onRemove }) {
  const [ isLiked, setIsLiked ] = useState(card.isLiked);
  const imageLink =  onMainPage ? (card.image?.url && `${moviesBaseUrl}${card.image?.url}`) : card.image;
  const drt = card.duration;
  const duration = (drt < 60 && `${drt} м`) || (drt === 60 && `1 ч`) || (drt > 60 && `${Math.floor(drt/60)} ч ${drt % 60} м`);

  useEffect(() => {
    card.isLiked && setIsLiked(true);
  }, [card])

  function handleLikeButtonClick() {
    if (isLiked) {
      onDislike(card);
      setIsLiked(false);
    } else {
      onLike(card);
      setIsLiked(true);
    }
  }
  function handleRemoveButtonClick() {
    onRemove(card);
  }

  return (
    <li className={`card ${isLiked ? 'card_saved' : ''}`} id={card.id}>
      <a href={card.trailerLink} target="blank" className="card__image-link">
        <div className="card__image-container">
          <img className="card__image" src={ imageLink } alt={ card.nameRU } />
        </div>
      </a>
      <div className="card__tab">
        <p className="card__title"> { card.nameRU } </p>
          <div className="card__handlers">
            { onMainPage ?
              <button
                className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
                type="button"
                onClick={handleLikeButtonClick}
              /> :
              <button
                className="card__remove-button"
                type="button"
                onClick={handleRemoveButtonClick}
              />}
            {/* <form className="card__form">
              <p className="card__form-text"> Удалить фильм из сохранённых? </p>
              <button className="card__form-submit-button" type="submit" />
            </form> */}
          </div>
      </div>
      <p className="card__subline"> { duration } </p>
    </li>
  )
}