
import { useLocation } from "react-router-dom";
import AlbumCard from "./AlbumCard";
import Preloader from "./Preloader";

export default function Album({ cards, isLoading, onCardLike, onCardDislike, responseMessage, maxCardsNumber, moreButtonIsActive, handleMoreButtonClick }) {
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
                        key={card?.id}
                        card={card}
                        onMainPage={onMainPage}
                        onLike={onCardLike}
                        onDislike={onCardDislike}
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