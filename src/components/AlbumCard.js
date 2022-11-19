export default function AlbumCard({ img, title, subline, isSaved, isLiked }) {
  return (
    <li className={`card ${isSaved ? 'card_saved' : ''}`}>
      <div className="card__image-container">
        <img className="card__image" src={ img } alt={ title } />
      </div>
      <div className="card__tab">
        <p className="card__title"> { title } </p>
        { isSaved ?
          <button className="card__remove-button" type="button" /> :
          <button className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} type="button" /> }
      </div>
      <p className="card__subline"> { subline } </p>
    </li>
  )
}