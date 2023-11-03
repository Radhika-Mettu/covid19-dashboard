import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {isLoading: true, faqs: []}

  componentDidMount() {
    this.getAboutPageDetails()
  }

  getAboutPageDetails = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    const data = await response.json()
    const fetchedData = data.faq
    this.setState({faqs: fetchedData, isLoading: false})
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkMode} = value

          const {isLoading, faqs} = this.state
          const lightMode = !darkMode ? 'header-container1' : ''
          return (
            <div>
              <div className={`about-container ${lightMode}`}>
                <Header about />
                {isLoading && (
                  <div data-testid="aboutRouteLoader" className="about-loader">
                    <Loader
                      type="TailSpin"
                      color="#00bfff"
                      height={50}
                      width={50}
                    />
                  </div>
                )}
                {!isLoading && (
                  <div>
                    <h1 className={`about-heading ${lightMode}`}>About</h1>
                    <p className={`about-last-update ${lightMode}`}>
                      Last update on march 28th 2021.
                    </p>
                    <p className={`about-vaccines ${lightMode}`}>
                      COVID-19 vaccines be ready for distribution
                    </p>
                    <ul
                      data-testid="faqsUnorderedList"
                      className="faqs-unordered-list"
                    >
                      {faqs.map(eachItem => (
                        <li className="about-list-item" key={eachItem.qno}>
                          <p className={`about-question ${lightMode}`}>
                            {eachItem.question}
                          </p>
                          <p className="about-answer">{eachItem.answer}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Footer about="true" />
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default About
