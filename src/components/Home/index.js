import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Header from '../Header'
import Footer from '../Footer'
import SearchItems from '../SearchItems'
import EachState from '../EachState'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const unionTerritoriesList = ['AN', 'CH', 'DN', 'DL', 'LA', 'LD', 'PY']

class Home extends Component {
  state = {
    covidCases: [],
    searchInput: '',
    totalConfirmed: 0,
    totalActive: 0,
    totalDeceased: 0,
    totalRecovered: 0,
    searchSection: false,
    statesSection: true,
    isLoading: true,
    statesList1: [],
    unionTerritories: [],
  }

  componentDidMount() {
    this.getCasesDetails()
  }

  getCasesDetails = async () => {
    const {statesList} = this.props
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()

    const resultList = []
    const u1 = []
    const s1 = []
    let totalConfirm = 0
    let totalAct = 0
    let totalRecover = 0
    let totalDecease = 0
    const keyNames = Object.keys(data)
    keyNames.splice(33, 1)
    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        totalConfirm += confirmed
        const deceased = total.deceased ? total.deceased : 0
        totalDecease += deceased
        const recovered = total.recovered ? total.recovered : 0
        totalRecover += recovered
        const tested = total.tested ? total.tested : 0

        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0

        totalAct += confirmed - (deceased + recovered)

        const obj1 = {
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        }

        if (unionTerritoriesList.includes(obj1.stateCode)) {
          u1.push(obj1)
        } else {
          s1.push(obj1)
        }
        resultList.push(obj1)
      }
    })

    this.setState({
      covidCases: [...resultList],
      statesList1: [...s1],
      unionTerritories: [...u1],
      totalConfirmed: totalConfirm,
      totalActive: totalAct,
      totalRecovered: totalRecover,
      totalDeceased: totalDecease,
      isLoading: false,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
    if (event.target.value === '') {
      this.setState({statesSection: true, searchSection: false})
    } else {
      this.setState({statesSection: false, searchSection: true})
    }
  }

  onClickDescOrderButton = () => {
    const {statesList1, unionTerritories} = this.state
    const descStatesList = statesList1.sort((a, b) =>
      b.name.localeCompare(a.name),
    )
    const descTerritoriesList = unionTerritories.sort((a, b) =>
      b.name.localeCompare(a.name),
    )
    this.setState({
      statesList1: descStatesList,
      unionTerritories: descTerritoriesList,
    })
  }

  onClickAscOrderButton = () => {
    const {statesList1, unionTerritories} = this.state
    const ascStatesList = statesList1.sort((a, b) =>
      a.name.localeCompare(b.name),
    )
    const ascTerritoriesList = unionTerritories.sort((a, b) =>
      a.name.localeCompare(b.name),
    )
    this.setState({
      statesList1: ascStatesList,
      unionTerritories: ascTerritoriesList,
    })
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkMode} = value

          const lightMode = !darkMode ? 'header-container1' : ''
          const {
            covidCases,
            totalConfirmed,
            totalActive,
            totalDeceased,
            totalRecovered,
            searchInput,
            searchSection,
            statesSection,
            isLoading,
            statesList1,
            unionTerritories,
          } = this.state

          const searchResult = covidCases.filter(eachItem =>
            eachItem.name.toLowerCase().includes(searchInput.toLowerCase()),
          )
          return (
            <div className={`home-container ${lightMode}`}>
              <Header home />
              {isLoading && (
                <div data-testid="homeRouteLoader" className="home-loader">
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
                  <div className="search-input">
                    <BsSearch className="search-icon" />
                    <input
                      type="search"
                      className="search-element"
                      placeholder="Enter the State"
                      value={searchInput}
                      onChange={this.onChangeSearchInput}
                    />
                  </div>
                  {searchSection && (
                    <ul
                      className="search-unordered-list"
                      data-testid="searchResultsUnorderedList"
                    >
                      {searchResult.map(eachItem => (
                        <SearchItems
                          eachItem={eachItem}
                          key={eachItem.stateCode}
                        />
                      ))}
                    </ul>
                  )}
                  {statesSection && (
                    <div>
                      <div className="group-container">
                        <div
                          className="right-icon-container"
                          data-testid="countryWideConfirmedCases"
                        >
                          <p className="confirmed-text">Confirmed</p>

                          <img
                            src="https://i.ibb.co/jMjYW55/check-mark-1.png"
                            className="right-icon"
                            alt="country wide confirmed cases pic"
                          />
                          <p className="confirmed-count">{totalConfirmed}</p>
                        </div>
                        <div
                          className="active-icon-container"
                          data-testid="countryWideActiveCases"
                        >
                          <p className="active-text">Active</p>
                          <img
                            src="https://i.ibb.co/phxLL7C/protection-1.png"
                            className="active-icon"
                            alt="country wide active cases pic"
                          />
                          <p className="active-count">{totalActive}</p>
                        </div>
                        <div
                          className="recovered-icon-container"
                          data-testid="countryWideRecoveredCases"
                        >
                          <p className="recovered-text">Recovered</p>
                          <img
                            src="https://i.ibb.co/DLXFjmx/recovered-1.png"
                            className="recovered-icon"
                            alt="country wide recovered cases pic"
                          />
                          <p className="recovered-count">{totalRecovered}</p>
                        </div>
                        <div
                          className="deceased-icon-container"
                          data-testid="countryWideDeceasedCases"
                        >
                          <p className="deceased-text">Deceased</p>
                          <img
                            src="https://i.ibb.co/c6Lwhdv/breathing-1.png"
                            className="deceased-icon"
                            alt="country wide deceased cases pic"
                          />
                          <p className="deceased-count">{totalDeceased}</p>
                        </div>
                      </div>
                      <div className={`unordered-list ${lightMode}`}>
                        <div
                          className="table-heading"
                          data-testid="stateWiseCovidDataTable"
                        >
                          <p className="state-heading">States/UT</p>
                          <button
                            type="button"
                            onClick={this.onClickAscOrderButton}
                            className="asc-button"
                            data-testid="ascendingSort"
                          >
                            <FcGenericSortingAsc className="sorting-asc" />
                          </button>
                          <button
                            type="button"
                            onClick={this.onClickDescOrderButton}
                            className="asc-button"
                            data-testid="descendingSort"
                          >
                            <FcGenericSortingDesc className="sorting-desc" />
                          </button>
                          <p className="confirmed-heading">Confirmed</p>
                          <p className="active-heading">Active</p>
                          <p className="recovered-heading">Recovered</p>
                          <p className="deceased-heading">Deceased</p>
                          <p className="population-heading">Population</p>

                          <hr className="horizontal-line" />

                          <ul className={`unordered-list2 ${lightMode}`}>
                            {statesList1.map(each => (
                              <EachState each={each} key={each.stateCode} />
                            ))}
                            {unionTerritories.map(each => (
                              <EachState each={each} key={each.stateCode} />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Footer />
                </div>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
