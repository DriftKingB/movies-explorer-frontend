import Album from '../Album'
import Header from '../Header'
import Search from '../Search'
import Footer from '../Footer'
import { useEffect } from 'react'
import SideBar from '../SideBar'

export default function Saved({ title, cards, setCards, getSavedMovies, onCardRemove, sideBarIsOpen, setSideBarState, albumIsLoading, responseMessage }) {
  useEffect(() => {
    document.title = title;
    getSavedMovies();
  }, [])

  return (
    <>
      <Header setSideBarState={setSideBarState} />
      <section className="main">
        <Search
          setCards={setCards}
        />
        <Album
          cards={cards}
          isLoading={albumIsLoading}
          onCardRemove={onCardRemove}
          responseMessage={responseMessage}
        />
        <SideBar isOpen={ sideBarIsOpen } setSideBarState={ setSideBarState } />
      </section>
      <Footer />
    </>
  )
}