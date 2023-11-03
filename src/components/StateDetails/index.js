import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import TopDistricts from '../TopDistricts'
import Header from '../Header'
import Footer from '../Footer'
import ThemeContext from '../../context/ThemeContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const statesImagesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
    image_url: 'https://i.ibb.co/T4Kr1r0/Group-7362.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    image_url: 'https://i.ibb.co/TcMBTcd/Group-7354.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    image_url: 'https://i.ibb.co/GJNM12w/Group-7340.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    image_url: 'https://i.ibb.co/Gnrv8hP/Group-7341.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    image_url: 'https://i.ibb.co/PmkK9St/Group-7335.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    image_url: 'https://i.ibb.co/pxyCNt2/Group-7361.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    image_url: 'https://i.ibb.co/Rh2tKtW/Group-7353.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    image_url: 'https://i.ibb.co/MNVs6Z8/Group-7357.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    image_url: 'https://i.ibb.co/dLc1J73/Group-7358.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    image_url: 'https://i.ibb.co/bKyKwPZ/Group-7349.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    image_url: 'https://i.ibb.co/5kVJfsf/Group-7337.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    image_url: 'https://i.ibb.co/r7T4HPB/Group-7332.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    image_url: 'https://i.ibb.co/G0kq0qs/Group-7364.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    image_url: 'https://i.ibb.co/XXbSPkp/Group-7328.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    image_url: 'https://i.ibb.co/hMNCr9r/Group-7342.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    image_url: 'https://i.ibb.co/BVj4rVV/Group-7339.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    image_url: 'https://i.ibb.co/BVj4rVV/Group-7339.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    image_url: 'https://i.ibb.co/wRXJRLm/Group-7363.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    image_url: 'https://i.ibb.co/0MSrC0J/Group-7359.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    image_url: 'https://i.ibb.co/BC6pc3J/Group-7348.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    image_url: 'https://i.ibb.co/5MYrzB0/Group-7336.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    image_url: 'https://i.ibb.co/h84PMLW/Group-7346.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    image_url: 'https://i.ibb.co/KzYtpLj/Group-7344.png',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    image_url: 'https://i.ibb.co/fntpk3b/Group-7347.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    image_url: 'https://i.ibb.co/CW3NgNB/Group-7345.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    image_url: 'https://i.ibb.co/BC6pc3J/Group-7348.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    image_url: 'https://i.ibb.co/7pHdnyR/Group-7360.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    image_url: 'https://i.ibb.co/0tmRCQC/Group-7330.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    image_url: 'https://i.ibb.co/c2qWNjM/Group-7333.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    image_url: 'https://i.ibb.co/gz7GrG0/Group-7338.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    image_url: 'https://i.ibb.co/84QDx3z/Group-7356.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    image_url: 'https://i.ibb.co/Tm8g07c/Group-7351.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    image_url: 'https://i.ibb.co/MMPqmMH/Group-7352-1.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    image_url: 'https://i.ibb.co/NT67Z04/Group-7334.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    image_url: 'https://i.ibb.co/cF64kZ7/Group-7331.png',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    image_url: 'https://i.ibb.co/TbtkRzp/Group-7343.png',
  },
]

const months = [
  'JAN',
  'FEB',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUG',
  'SEPT',
  'OCT',
  'NOV',
  'DEC',
]

const selectedCases = {
  Confirmed: 'confirmed',
  Active: 'active',
  Recovered: 'recovered',
  Deceased: 'deceased',
}

class StateDetails extends Component {
  state = {
    stateName: '',
    districtsDesc: [],
    timeLineDetails: [],
    isLoadingState: true,
    isLoadingTimeLine: true,
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    totalTested: 0,
    barGraphValue: [],
    activeStatus: '',
    stateImageUrl: '',
    totalPopulation: 0,
  }

  componentDidMount() {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    const {match, statesList} = this.props
    const {params} = match
    const {stateCode} = params

    const nameOfState = statesList.filter(each => each.state_code === stateCode)

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const stateImage = statesImagesList.filter(
      each => each.state_code === stateCode,
    )

    const districtNames = Object.keys(data[stateCode].districts)
    let uniqueId = 1

    const eachDistrictsData = []

    districtNames.forEach(district => {
      if (data[stateCode].districts[district]) {
        const {total} = data[stateCode].districts[district]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0

        const eachDistrict = {
          district,
          confirmed,
          deceased,
          recovered,
          tested,
          uniqueId,
          active: confirmed - (deceased + recovered),
        }
        eachDistrictsData.push(eachDistrict)
        uniqueId += 1
      }
    })
    eachDistrictsData.sort((a, b) => b.confirmed - a.confirmed)
    this.setState({isLoadingState: false})

    const requestUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const timelineResponse = await fetch(requestUrl)

    const jsonData = await timelineResponse.json()
    console.log(jsonData)
    const keyNames = Object.keys(jsonData[stateCode].dates)
    const timelineData = []

    keyNames.forEach(date => {
      const obj1 = {
        date,
        confirmed: jsonData[stateCode].dates[date].total.confirmed,
        deceased: jsonData[stateCode].dates[date].total.deceased,
        recovered: jsonData[stateCode].dates[date].total.recovered,
        tested: jsonData[stateCode].dates[date].total.tested,
        active:
          jsonData[stateCode].dates[date].total.confirmed -
          (jsonData[stateCode].dates[date].total.deceased +
            jsonData[stateCode].dates[date].total.recovered),
      }
      timelineData.push(obj1)
    })

    const barValue = []
    const barGraph = timelineData.slice(-10)
    barGraph.forEach(eachDate => {
      const d = new Date(eachDate.date)
      const date1 = `${d.getDate()} ${months[d.getMonth()]}`

      const obj3 = {
        date: date1,
        count: eachDate.confirmed,
      }
      barValue.push(obj3)
    })

    this.setState({
      timeLineDetails: timelineData,
      totalActive:
        data[stateCode].total.confirmed -
        (data[stateCode].total.deceased + data[stateCode].total.recovered),
      totalConfirmed: data[stateCode].total.confirmed,
      totalRecovered: data[stateCode].total.recovered,
      totalDeceased: data[stateCode].total.deceased,
      totalTested: data[stateCode].total.tested,
      totalPopulation: data[stateCode].meta.population,
      isLoadingTimeLine: false,
      districtsDesc: eachDistrictsData,
      stateName: nameOfState[0].state_name,
      barGraphValue: barValue,
      activeStatus: selectedCases.Confirmed,
      stateImageUrl: stateImage[0].image_url,
    })
  }

  onClickActiveCard = () => {
    const {timeLineDetails} = this.state
    const barValue = []
    const barGraph = timeLineDetails.slice(-10)
    barGraph.forEach(eachDate => {
      const d = new Date(eachDate.date)
      const date1 = `${d.getDate()} ${months[d.getMonth()]}`

      const obj3 = {
        date: date1,
        count: eachDate.active,
      }
      barValue.push(obj3)
    })
    this.setState({barGraphValue: barValue, activeStatus: selectedCases.Active})
  }

  onClickConfirmCard = () => {
    const {timeLineDetails} = this.state
    const barValue = []
    const barGraph = timeLineDetails.slice(-10)
    barGraph.forEach(eachDate => {
      const d = new Date(eachDate.date)
      const date1 = `${d.getDate()} ${months[d.getMonth()]}`

      const obj3 = {
        date: date1,
        count: eachDate.confirmed,
      }
      barValue.push(obj3)
    })
    this.setState({
      barGraphValue: barValue,
      activeStatus: selectedCases.Confirmed,
    })
  }

  onClickRecoveredCard = () => {
    const {timeLineDetails} = this.state
    const barValue = []
    const barGraph = timeLineDetails.slice(-10)
    barGraph.forEach(eachDate => {
      const d = new Date(eachDate.date)
      const date1 = `${d.getDate()} ${months[d.getMonth()]}`

      const obj3 = {
        date: date1,
        count: eachDate.recovered,
      }
      barValue.push(obj3)
    })
    this.setState({
      barGraphValue: barValue,
      activeStatus: selectedCases.Recovered,
    })
  }

  onClickDeceasedCard = () => {
    const {timeLineDetails} = this.state
    const barValue = []
    const barGraph = timeLineDetails.slice(-10)
    barGraph.forEach(eachDate => {
      const d = new Date(eachDate.date)
      const date1 = `${d.getDate()} ${months[d.getMonth()]}`

      const obj3 = {
        date: date1,
        count: eachDate.deceased,
      }
      barValue.push(obj3)
    })
    this.setState({
      barGraphValue: barValue,
      activeStatus: selectedCases.Deceased,
    })
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkMode} = value

          const {
            timeLineDetails,
            totalActive,
            totalConfirmed,
            totalRecovered,
            totalDeceased,
            totalTested,
            districtsDesc,
            stateName,
            barGraphValue,
            activeStatus,
            stateImageUrl,
            totalPopulation,
            isLoadingState,
            isLoadingTimeLine,
          } = this.state

          const confirmedBg =
            activeStatus === 'confirmed'
              ? 'state-details-confirmed-card-bg'
              : ''
          const activeBg =
            activeStatus === 'active' ? 'state-details-active-card-bg' : ''
          const recoveredBg =
            activeStatus === 'recovered'
              ? 'state-details-recovered-card-bg'
              : ''
          const deceasedBg =
            activeStatus === 'deceased' ? 'state-details-deceased-card-bg' : ''
          const lightMode = !darkMode ? 'header-container1' : ''

          let barColor = ''
          switch (activeStatus) {
            case 'confirmed':
              barColor = '#9A0E31'
              break
            case 'active':
              barColor = '#0A4FA0'
              break
            case 'recovered':
              barColor = '#216837'
              break
            case 'deceased':
              barColor = '#474C57'
              break
            default:
              barColor = '#9A0E31'
              break
          }
          districtsDesc.sort((a, b) => b[activeStatus] - a[activeStatus])

          const confirmedLineChart = []
          timeLineDetails.forEach(each => {
            const obj2 = {
              date: each.date,
              count: each.confirmed,
            }
            confirmedLineChart.push(obj2)
          })

          const activeLineChart = []
          timeLineDetails.forEach(each => {
            const obj2 = {
              date: each.date,
              count: each.active,
            }
            activeLineChart.push(obj2)
          })

          const recoveredLineChart = []
          timeLineDetails.forEach(each => {
            const obj2 = {
              date: each.date,
              count: each.recovered,
            }
            recoveredLineChart.push(obj2)
          })

          const deceasedLineChart = []
          timeLineDetails.forEach(each => {
            const obj2 = {
              date: each.date,
              count: each.deceased,
            }
            deceasedLineChart.push(obj2)
          })

          const testedLineChart = []
          timeLineDetails.forEach(each => {
            const obj2 = {
              date: each.date,
              count: each.tested,
            }
            testedLineChart.push(obj2)
          })

          return (
            <div className={`state-details-container ${lightMode}`}>
              <Header />
              {isLoadingState ? (
                <div data-testid="stateDetailsLoader">
                  <Loader
                    type="TailSpin"
                    color="white"
                    height={50}
                    width={50}
                    className="state-details-loader"
                  />
                </div>
              ) : (
                <div>
                  <div className="state-name-heading">
                    <h1 className="name-heading">{stateName}</h1>
                  </div>
                  <p className="last-update-para">
                    Last update on october 31st 2021.
                  </p>
                  <p className="tested-para">Tested</p>
                  <p className="total-tested-para">{totalTested}</p>
                  <div className="state-details-card-container">
                    <button
                      type="button"
                      className={`state-details-confirmed-card ${confirmedBg}`}
                      data-testid="stateSpecificConfirmedCasesContainer"
                      onClick={this.onClickConfirmCard}
                    >
                      <p className="state-details-confirmed-text">Confirmed</p>
                      <img
                        src="https://i.ibb.co/jMjYW55/check-mark-1.png"
                        alt="state specific confirmed cases pic"
                        className="state-details-check-image"
                      />
                      <p className="states-total-Confirmed-para">
                        {totalConfirmed}
                      </p>
                    </button>
                    <button
                      type="button"
                      className={`state-details-active-card ${activeBg}`}
                      data-testid="stateSpecificActiveCasesContainer"
                      onClick={this.onClickActiveCard}
                    >
                      <p className="state-details-active-text">Active</p>
                      <img
                        src="https://i.ibb.co/VD1Yf52/protection-1-1.png"
                        alt="state specific active cases pic"
                        className="state-details-active-image"
                      />
                      <p className="states-total-Active-para">{totalActive}</p>
                    </button>
                    <button
                      type="button"
                      className={`state-details-recovered-card ${recoveredBg}`}
                      data-testid="stateSpecificRecoveredCasesContainer"
                      onClick={this.onClickRecoveredCard}
                    >
                      <p className="state-details-recovered-text">Recovered</p>
                      <img
                        src="https://i.ibb.co/hKtFZgL/recovered-1-1.png"
                        alt="state specific recovered cases pic"
                        className="state-details-recovered-image"
                      />
                      <p className="states-total-recovered-para">
                        {totalRecovered}
                      </p>
                    </button>
                    <button
                      type="button"
                      className={`state-details-deceased-card ${deceasedBg}`}
                      data-testid="stateSpecificDeceasedCasesContainer"
                      onClick={this.onClickDeceasedCard}
                    >
                      <p className="state-details-deceased-text">Deceased</p>
                      <img
                        src="https://i.ibb.co/4fyMtdm/breathing-1-1.png"
                        alt="state specific deceased cases pic"
                        className="state-details-deceased-image"
                      />
                      <p className="states-total-deceased-para">
                        {totalDeceased}
                      </p>
                    </button>
                  </div>
                  <div>
                    <img
                      src={stateImageUrl}
                      alt="specific-state"
                      className="state-details-image"
                    />
                  </div>
                  <div className="Reports-container">
                    <p className="state-details-ncp-report">NCP report </p>

                    <p className="state-population-report">Population</p>
                    <p>{totalPopulation}</p>
                    <p className="state-tested-report">Tested</p>
                    <p>{totalTested}</p>
                    <p className="state-as-per-source">
                      (As of 29 March per source)
                    </p>
                  </div>
                  <div>
                    <h1 className="state-top-districts">Top Districts</h1>
                    <ul
                      className="state-unordered-list"
                      data-testid="topDistrictsUnorderedList"
                    >
                      {districtsDesc.map(eachDistrictItem => (
                        <TopDistricts
                          eachDistrictItem={eachDistrictItem}
                          key={eachDistrictItem.uniqueId}
                          activeStatus={activeStatus}
                        />
                      ))}
                    </ul>
                  </div>
                  {isLoadingTimeLine && (
                    <div data-testid="timelinesDataLoader">
                      <Loader
                        type="TailSpin"
                        color="white"
                        height={50}
                        width={50}
                        className="state-details-loader"
                        testid="timelinesDataLoader"
                      />
                    </div>
                  )}
                  {!isLoadingTimeLine && (
                    <>
                      <div>
                        <div className="state-bar-chart">
                          <BarChart
                            width={800}
                            height={450}
                            data={barGraphValue}
                          >
                            <XAxis
                              dataKey="date"
                              tick={{fill: `${barColor}`}}
                            />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="count"
                              fill={barColor}
                              tick={{fill: `${barColor}`}}
                              stroke={barColor}
                              radius={[8, 8, 0, 0]}
                              label={{
                                fill: `${barColor}`,
                                fontSize: 15,
                                position: 'top',
                              }}
                            />
                          </BarChart>
                        </div>
                      </div>
                      <div data-testid="lineChartsContainer">
                        <h1 className="state-spread-trends">
                          Daily Spread Trends
                        </h1>
                        <div className="state-line-confirmed-chart">
                          <p className="state-line-confirmed-para">Confirmed</p>
                          <LineChart
                            width={1018}
                            height={300}
                            data={confirmedLineChart}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                          >
                            <XAxis
                              dataKey="date"
                              tick={{fill: '#FF073A'}}
                              tickLine={{stroke: '#FF073A'}}
                            />
                            <YAxis
                              tick={{fill: '#FF073A'}}
                              tickLine={{stroke: '#FF073A'}}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#FF073A"
                              legendType="none"
                            />
                          </LineChart>
                        </div>

                        <div className="state-line-active-chart">
                          <p className="state-line-active-para">Total Active</p>
                          <LineChart
                            width={1018}
                            height={300}
                            data={activeLineChart}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                          >
                            <XAxis
                              dataKey="date"
                              tick={{fill: '#007BFF'}}
                              tickLine={{stroke: '#007BFF'}}
                            />
                            <YAxis
                              tick={{fill: '#007BFF'}}
                              tickLine={{stroke: '#007BFF'}}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#007BFF"
                              legendType="none"
                            />
                          </LineChart>
                        </div>

                        <div className="state-line-recovered-chart">
                          <p className="state-line-recovered-para">Recovered</p>
                          <LineChart
                            width={1018}
                            height={300}
                            data={recoveredLineChart}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                          >
                            <XAxis
                              dataKey="date"
                              tick={{fill: '#27A243'}}
                              tickLine={{stroke: '#27A243'}}
                            />
                            <YAxis
                              tick={{fill: '#27A243'}}
                              tickLine={{stroke: '#27A243'}}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#27A243"
                              legendType="none"
                            />
                          </LineChart>
                        </div>
                      </div>
                      <div>
                        <div className="state-line-deceased-chart">
                          <p className="state-line-deceased-para">Deceased</p>
                          <LineChart
                            width={1018}
                            height={300}
                            data={recoveredLineChart}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                          >
                            <XAxis
                              dataKey="date"
                              tick={{fill: '#6C757D'}}
                              tickLine={{stroke: '#6C757D'}}
                            />
                            <YAxis
                              tick={{fill: '#6C757D'}}
                              tickLine={{stroke: '#6C757D'}}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#6C757D"
                              legendType="none"
                            />
                          </LineChart>
                        </div>
                      </div>
                      <div>
                        <div className="state-line-tested-chart">
                          <p className="state-line-tested-para">Tested</p>
                          <LineChart
                            width={1018}
                            height={300}
                            data={recoveredLineChart}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                          >
                            <XAxis
                              dataKey="date"
                              tick={{fill: '#9673B9'}}
                              tickLine={{stroke: '#9673B9'}}
                            />
                            <YAxis
                              tick={{fill: '#9673B9'}}
                              tickLine={{stroke: '#9673B9'}}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#9673B9"
                              legendType="none"
                            />
                          </LineChart>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              <Footer stateDetails />
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(StateDetails)
