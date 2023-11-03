import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsSunFill, BsFillMoonFill} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

class Header extends Component {
  state = {hambergerOptions: false}

  onClickHambergerIcon = () => {
    this.setState(prevState => ({
      hambergerOptions: !prevState.hambergerOptions,
    }))
  }

  onClickCrossButton = () => {
    this.setState({hambergerOptions: false})
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkMode, changeMode} = value

          const onChangeMode = () => {
            changeMode()
          }

          const {hambergerOptions} = this.state
          const {home, vaccine, about} = this.props
          const activeHome = home ? 'activeHome1' : ''
          const activeHome1 = darkMode ? 'activeHome2' : ''
          const activeVaccine = vaccine ? 'activeVaccine1' : ''
          const activeAbout = about ? 'activeAbout1' : ''

          const lightMode = !darkMode ? 'header-container12' : ''
          return (
            <ul className={`header-container ${lightMode}`}>
              <li>
                <Link to="/">
                  <h1 className="heading">
                    COVID19<span className="spanElement">INDIA</span>
                  </h1>
                </Link>
              </li>
              {darkMode && (
                <li>
                  <Link to="/">
                    <button
                      className={`home-button ${activeHome}`}
                      type="button"
                    >
                      Home
                    </button>
                  </Link>
                </li>
              )}
              {!darkMode && (
                <li>
                  <Link to="/">
                    <button
                      className={`home-button ${activeHome1}`}
                      type="button"
                    >
                      Home
                    </button>
                  </Link>
                </li>
              )}
              {darkMode && (
                <button
                  type="button"
                  className="light-theme-button"
                  onClick={onChangeMode}
                >
                  <BsSunFill className="light-moon-color" />
                </button>
              )}
              {!darkMode && (
                <button
                  type="button"
                  className="dark-theme-button"
                  onClick={onChangeMode}
                >
                  <BsFillMoonFill className="dark-moon-color" />
                </button>
              )}
              <li>
                <Link to="/vaccine">
                  <button
                    className={`vaccine-button ${activeVaccine}`}
                    type="button"
                  >
                    Vaccination
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <button
                    className={`about-button ${activeAbout} `}
                    type="button"
                  >
                    About
                  </button>
                </Link>
              </li>
              <button
                type="button"
                className="hamberger-button"
                onClick={this.onClickHambergerIcon}
              >
                <img
                  src="https://i.ibb.co/0BhwSF4/add-to-queue-1.png"
                  className={`hamberger-header ${activeHome1}`}
                  alt="hamberger"
                />
              </button>
              {hambergerOptions && (
                <ul>
                  <Link to="/">
                    <button className="home-button1" type="button">
                      Home
                    </button>
                  </Link>

                  <Link to="/about">
                    <button
                      className={`about-button1 ${activeHome1}`}
                      type="button"
                    >
                      About
                    </button>
                  </Link>

                  <button
                    type="button"
                    onClick={this.onClickCrossButton}
                    className="cross-button"
                  >
                    <AiFillCloseCircle className="header-cross" />
                  </button>
                </ul>
              )}
            </ul>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Header
