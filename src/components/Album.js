
import { useLocation } from "react-router-dom";
import AlbumCard from "./AlbumCard";
import Preloader from "./Preloader";

export default function Album({ cards, isLoading, onCardLike, onCardDislike, onCardRemove, responseMessage, maxCardsNumber, moreButtonIsActive, handleMoreButtonClick }) {
  const location = useLocation();
  const onMainPage = location.pathname === '/movies';

  return (
    <>
      <section className="album">
        {
          isLoading ?
            <Preloader /> :
            <>
            {
              responseMessage ?
                <p className="album__response"> {responseMessage} </p> :
                <ul className="album__container">
                  {
                    cards?.slice(0, (onMainPage ? maxCardsNumber : 100)).map(card =>
                      <AlbumCard
                        key={card?.id ?? card?.movieId}
                        card={card}
                        onMainPage={onMainPage}
                        onLike={onCardLike}
                        onDislike={onCardDislike}
                        onRemove={onCardRemove}
                      />)
                  }
                </ul>
            }
            </>
        }
      </section>
      <section className="more">
        {
          (!isLoading && onMainPage && moreButtonIsActive) &&
          <button className="more__button" type="button" onClick={handleMoreButtonClick}> Ещё </button>
        }
      </section>
    </>
  )
}