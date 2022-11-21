import Album from '../Album'
import Header from '../Header'
import Search from '../Search'
import Footer from '../Footer'
import { useEffect } from 'react'
import SideBar from '../SideBar'
import ResponsePopup from '../ResponsePopup'

export default function Saved({ title, cards, getSavedMovies, onCardDislike, onSearch, sideBarIsOpen, setSideBarState, albumIsLoading, responseMessage, popupMessage }) {
  useEffect(() => {
    document.title = title;
    getSavedMovies({ render: true });
  }, [])

  return (
    <>
      <Header setSideBarState={setSideBarState} />
      <section className="main">
        <Search
          cards={cards}
          onSearch={onSearch}
        />
        <Album
          cards={cards}
          isLoading={albumIsLoading}
          onCardDislike={onCardDislike}
          responseMessage={responseMessage}
        />
        <SideBar isOpen={ sideBarIsOpen } setSideBarState={ setSideBarState } />
        <ResponsePopup message={popupMessage} />
      </section>
      <Footer />
    </>
  )
}