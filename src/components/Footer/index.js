import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const Footer = props => (
  <ThemeContext.Consumer>
    {value => {
      const {darkMode} = value

      const lightMode1 = !darkMode ? 'header-container14' : ''
      const {about, stateDetails, vaccine} = props
      const aboutSection = about ? 'about-section' : ''
      const aboutPara = about ? 'about-para' : ''
      const aboutGit = about ? 'about-git' : ''
      const aboutInsta = about ? 'about-insta' : ''
      const aboutTwitter = about ? 'about-twitter' : ''
      const detailsSection = stateDetails ? 'details-section' : ''
      const detailsPara = stateDetails ? 'details-para' : ''
      const detailsGit = stateDetails ? 'details-git' : ''
      const detailsInsta = stateDetails ? 'details-insta' : ''
      const detailsTwitter = stateDetails ? 'details-twitter' : ''
      const vaccineSection = vaccine ? 'vaccine-section' : ''
      const vaccinePara = vaccine ? 'vaccine-para' : ''
      const vaccineGit = vaccine ? 'vaccine-git' : ''
      const vaccineInsta = vaccine ? 'vaccine-insta' : ''
      const vaccineTwitter = vaccine ? 'vaccine-twitter' : ''

      return (
        <div className={`footer-container ${lightMode1}`}>
          <h1
            className={`footer-heading ${aboutSection} ${detailsSection} ${vaccineSection} ${lightMode1}`}
          >
            COVID19<span className="spanElement1">INDIA</span>
          </h1>
          <p
            className={`footer-para ${aboutPara} ${detailsPara} ${vaccinePara} ${lightMode1}`}
          >
            we stand with everyone fighting on the front lines
          </p>
          <VscGithubAlt
            className={`git-image ${aboutGit} ${detailsGit} ${vaccineGit} ${lightMode1}`}
          />
          <FiInstagram
            className={`insta-image ${aboutInsta} ${detailsInsta} ${vaccineInsta} ${lightMode1}`}
          />
          <FaTwitter
            className={`twitter-image ${aboutTwitter} ${detailsTwitter} ${vaccineTwitter} ${lightMode1}`}
          />
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default Footer
