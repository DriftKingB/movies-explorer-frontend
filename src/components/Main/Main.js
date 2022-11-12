import Footer from "../Footer";
import Header from "../Header";
import Album from "../Album";
import Search from "../Search";
import AlbumCard from "../AlbumCard";
import { useEffect } from "react";
import SideBar from "../SideBar";

export default function Main({ title }) {
  useEffect(() => {
    document.title = title;
  }, [])

  return (
    <>
      <Header />
      <Search
        shortsChecked={true}
      />
      <Album
        cards={
          <>
            <AlbumCard
              img={"https://www.ghimprove.com/_blog/images/posts/hello-world/mountain.jpg"}
              title={"33 слова о дизайне"}
              subline={"1ч 47м"}
            />
            <AlbumCard
              img={"https://www.ghimprove.com/_blog/images/posts/hello-world/mountain.jpg"}
              title={"33 слова о дизайне"}
              subline={"1ч 47м"}
              isLiked={true}
            />
            <AlbumCard
              img={"https://www.ghimprove.com/_blog/images/posts/hello-world/mountain.jpg"}
              title={"33 слова о дизайне"}
              subline={"1ч 47м"}
            />
            <AlbumCard
              img={"https://www.ghimprove.com/_blog/images/posts/hello-world/mountain.jpg"}
              title={"33 слова о дизайне"}
              subline={"1ч 47м"}
              isLiked={true}
            />
          </>
        }
      />
      <section className="more">
        <button className="more__button"> Ещё </button>
      </section>
      <SideBar />
      <Footer />
    </>
  )
}