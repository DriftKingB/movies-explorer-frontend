export default function ResponsePopup({ message }) {
  return(
    <div className={`response-popup ${message ? 'response-popup_fadeout' : ''}`}>
      <p className="response-popup__message"> { message } </p>
    </div>
  )
}