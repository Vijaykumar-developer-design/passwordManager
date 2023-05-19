import './index.css'

const GetListItem = props => {
  const {passwordDetails, getDeleteID, showPassword} = props
  const {id, website, password, username} = passwordDetails
  const firstLetter = username.slice(0, 1)

  const Url =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

  const sendId = () => {
    getDeleteID(id)
  }

  const sendPassword = () => <img className="stars-img" alt="stars" src={Url} />

  const condition = showPassword ? password : sendPassword()

  return (
    <li className="person-password">
      <h1 className="first-letter">{firstLetter}</h1>
      <div>
        <p>{website}</p>
        <p>{username}</p>
        <p>{condition}</p>
      </div>
      <button
        // testid="delete"
        onClick={sendId}
        className="delete-btn"
        type="button"
      >
        <img
          className="delete-img"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default GetListItem
