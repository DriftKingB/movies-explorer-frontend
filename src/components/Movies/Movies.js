import Footer from "../Footer";
import Header from "../Header";
import Album from "../Album";
import Search from "../Search";
import { useEffect } from "react";
import SideBar from "../SideBar";
import useCardsRender from "../../hooks/useCardsRender";
import ResponsePopup from "../ResponsePopup";

export default function Movies({ title, cards, getMovies, onSearch, onCardLike, onCardDislike, sideBarIsOpen, setSideBarState, albumIsLoading, responseMessage, popupMessage }) {
  const { maxCardsNumber, moreButtonIsActive, handleMoreButtonClick } = useCardsRender(cards);

  useEffect(() => {
    document.title = title;
    getMovies();
  }, [])

  return (
    <>
      <Header setSideBarState={setSideBarState} />
      <section className="main">
        <Search
          onSearch={onSearch}
        />
        <Album
          cards={cards}
          isLoading={albumIsLoading}
          onCardLike={onCardLike}
          onCardDislike={onCardDislike}
          responseMessage={responseMessage}
          maxCardsNumber={maxCardsNumber}
          moreButtonIsActive={moreButtonIsActive}
          handleMoreButtonClick={handleMoreButtonClick}
        />
        <SideBar isOpen={ sideBarIsOpen } setSideBarState={ setSideBarState } />
      </section>
      <ResponsePopup message={popupMessage}/>
      <Footer />
    </>
  )
}