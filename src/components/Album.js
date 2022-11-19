export default function Album({ cards }) {
  return (
    <section className="album">
      <ul className="album__container">
        { cards }
      </ul>
    </section>
  )
}