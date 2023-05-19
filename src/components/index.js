import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import GetListItem from '../passwords/index'
import './index.css'

class PasswordManager extends Component {
  state = {
    searchInput: '',
    showPassword: false,
    passwordList: [],
    website: '',
    username: '',
    password: '',
  }

  addPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      password: '',
      username: '',
    }))
  }

  websiteUrl = event => {
    this.setState({website: event.target.value})
  }

  userName = event => {
    this.setState({username: event.target.value})
  }

  passWord = event => {
    this.setState({password: event.target.value})
  }

  getDeleteID = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordList: filteredList})
  }

  searchUrl = event => {
    this.setState({searchInput: event.target.value})
  }

  checkStatus = event => {
    this.setState({showPassword: event.target.checked})
  }

  renderBackground = () => {
    const {passwordList, searchInput} = this.state
    const condition = passwordList.length === 0
    const filter = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (condition || filter.length <= 0) {
      return (
        <div className="down-container">
          <img
            className="first-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png  "
          />
          <p className="your-password">No Passwords</p>
        </div>
      )
    }
    return ''
  }

  render() {
    const {
      showPassword,
      searchInput,
      website,
      username,
      password,
      passwordList,
    } = this.state
    console.log(searchInput)
    const filteredPasswords = passwordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    // console.log(filteredPasswords)
    return (
      <div className="total-card">
        <img
          className="logo"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
        />
        <div className="user-card">
          <div className="user-details-card">
            <h1 className="head">Add New Password</h1>
            <form className="user-form" onSubmit={this.addPassword}>
              <div className="web-input">
                <img
                  className="web-img"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                />
                <input
                  value={website}
                  onChange={this.websiteUrl}
                  placeholder="Enter Website"
                  className="w-input"
                  type="text"
                />
              </div>
              <div className="web-input">
                <img
                  className="web-img"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                />
                <input
                  value={username}
                  onChange={this.userName}
                  placeholder="Enter Username"
                  className="w-input"
                  type="text"
                />
              </div>
              <div className="web-input">
                <img
                  className="web-img"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                />
                <input
                  value={password}
                  onChange={this.passWord}
                  placeholder="Enter Password"
                  className="w-input"
                  type="password"
                />
              </div>
              <div className="btn-container">
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>

          <img
            className="first-image"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
          />
        </div>

        <div className="second-card">
          <div className="first-line">
            <div className="pass">
              <h1 className="your-password">Your Passwords</h1>
              <p className="password-count">{passwordList.length}</p>
            </div>
            <div className="search-input">
              <img
                className="web-img"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
              />
              <input
                onChange={this.searchUrl}
                value={searchInput}
                placeholder="Search"
                className="search-in"
                type="search"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show">
            <input
              onChange={this.checkStatus}
              className="check-box"
              id="check"
              type="checkbox"
            />
            <label className="label-text" htmlFor="check">
              Show Passwords
            </label>
          </div>
          <ul className="password-container">
            {filteredPasswords.map(eachPassword => (
              <GetListItem
                key={eachPassword.id}
                passwordDetails={eachPassword}
                showPassword={showPassword}
                getDeleteID={this.getDeleteID}
              />
            ))}
          </ul>
          {this.renderBackground()}
        </div>
      </div>
    )
  }
}
export default PasswordManager
