import Album from '../Album'
import Header from '../Header'
import Search from '../Search'
import Footer from '../Footer'
import { useEffect } from 'react'
import SideBar from '../SideBar'

export default function Saved({ title, cards, setCards, renderSavedMovies, onCardDislike, sideBarIsOpen, setSideBarState, albumIsLoading, responseMessage }) {
  useEffect(() => {
    document.title = title;
    renderSavedMovies();
  }, [])

  return (
    <>
      <Header setSideBarState={setSideBarState} />
      <section className="main">
        <Search
          cards={cards}
          setCards={setCards}
        />
        <Album
          cards={cards}
          isLoading={albumIsLoading}
          onCardDislike={onCardDislike}
          responseMessage={responseMessage}
        />
        <SideBar isOpen={ sideBarIsOpen } setSideBarState={ setSideBarState } />
      </section>
      <Footer />
    </>
  )
}