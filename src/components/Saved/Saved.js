import Album from '../Album'
import Header from '../Header'
import Search from '../Search'
import Footer from '../Footer'
import AlbumCard from '../AlbumCard'
import { useEffect } from 'react'
import SideBar from '../SideBar'

export default function Saved({ title }) {
  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <>
      <Header />
      <section className="main">
        <Search
          shortsChecked={false}
        />
        <Album
          cards={
            <>
              <AlbumCard
                img={"https://www.ghimprove.com/_blog/images/posts/hello-world/mountain.jpg"}
                title={"33 слова о дизайне"}
                subline={"1ч 47м"}
                isSaved={true}
              />
              <AlbumCard
                img={"https://www.ghimprove.com/_blog/images/posts/hello-world/mountain.jpg"}
                title={"33 слова о дизайне"}
                subline={"1ч 47м"}
                isLiked={true}
                isSaved={true}
              />
              <AlbumCard
                img={"https://www.ghimprove.com/_blog/images/posts/hello-world/mountain.jpg"}
                title={"33 слова о дизайне"}
                subline={"1ч 47м"}
                isSaved={true}
              />
              <AlbumCard
                img={"https://www.ghimprove.com/_blog/images/posts/hello-world/mountain.jpg"}
                title={"33 слова о дизайне"}
                subline={"1ч 47м"}
                isLiked={true}
                isSaved={true}
              />
            </>
          }
        />
        <section className="more" />
        <SideBar />
      </section>
      <Footer />
    </>
  )
}