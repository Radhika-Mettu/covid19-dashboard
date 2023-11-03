import {Link} from 'react-router-dom'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {darkMode} = value

      const lightMode = !darkMode ? 'header-container1' : ''
      return (
        <div className={`not-found-container ${lightMode}`}>
          <img
            src="https://i.ibb.co/xq737H4/Group-7484.jpg"
            alt="not-found-pic"
            className="not-found-img"
          />
          <h1 className="not-found-heading">PAGE NOT FOUND</h1>
          <p className="not-found-para">
            we are sorry, the page you requested could not be found
          </p>
          <Link to="/">
            <button className="not-found-home-button" type="button">
              Home
            </button>
          </Link>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
