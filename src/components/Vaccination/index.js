import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import Header from '../Header'
import Footer from '../Footer'
import StatesList from '../StatesList'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

class Vaccination extends Component {
  state = {
    statesData: [],
    districtsData: [],
    totalSites: 0,
    governmentSites: 0,
    privateSites: 0,
    totalDoses: 0,
    firstDose: 0,
    secondDose: 0,
    vaccinationByDose: [],
    vaccinationByAge: [],
    vaccinationByCategory: [],
    differentVaccinations: [],
    differentAges: [],
    dosesButton: true,
    isLoading: true,
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    const statesDataUrl = 'https://apis.ccbp.in/covid19-state-ids'
    const response = await fetch(statesDataUrl)
    const data = await response.json()
    console.log(data.states)

    const updatedData = data.states.map(each => ({
      stateId: each.state_id,
      stateName: each.state_name,
    }))

    const vaccinationDataUrl = 'https://apis.ccbp.in/covid19-vaccination-data'
    const response2 = await fetch(vaccinationDataUrl)
    const vaccinationData = await response2.json()

    const byCategory = [
      {
        count: vaccinationData.topBlock.vaccination.female,
        Category: 'Female',
      },
      {
        count: vaccinationData.topBlock.vaccination.male,
        Category: 'Male',
      },
      {
        count: vaccinationData.topBlock.vaccination.others,
        Category: 'Others',
      },
    ]

    const differentVaccine = [
      {
        count: vaccinationData.topBlock.vaccination.covaxin,
        Category: 'Covaxin',
      },
      {
        count: vaccinationData.topBlock.vaccination.covishield,
        Category: 'Covishield',
      },
      {
        count: vaccinationData.topBlock.vaccination.sputnik,
        Category: 'Sputnik',
      },
    ]

    const pieByAge = [
      {
        count: vaccinationData.vaccinationByAge.above_60,
        Category: 'Above 60',
      },
      {
        count: vaccinationData.vaccinationByAge.vac_12_14,
        Category: '12-14',
      },
      {
        count: vaccinationData.vaccinationByAge.vac_15_17,
        Category: '15-17',
      },
      {
        count: vaccinationData.vaccinationByAge.vac_18_45,
        Category: '18-45',
      },
      {
        count: vaccinationData.vaccinationByAge.vac_45_60,
        Category: '45-60',
      },
    ]

    this.setState({
      statesData: updatedData,
      totalSites: vaccinationData.sessionSiteData.total_sites,
      governmentSites: vaccinationData.sessionSiteData.govt_sites,
      privateSites: vaccinationData.sessionSiteData.pvt_sites,
      totalDoses: vaccinationData.topBlock.vaccination.total_doses,
      firstDose: vaccinationData.topBlock.vaccination.tot_dose_1,
      secondDose: vaccinationData.topBlock.vaccination.tot_dose_2,
      vaccinationByDose: vaccinationData.vaccinationDoneByTime,
      vaccinationByAge: vaccinationData.vaccinationDoneByTimeAgeWise,
      vaccinationByCategory: byCategory,
      differentVaccinations: differentVaccine,
      differentAges: pieByAge,
      isLoading: false,
    })
  }

  onChangeState = async event => {
    const id = event.target.value
    console.log(id)
    const districtsDataUrl = `https://apis.ccbp.in/covid19-districts-data/${id}`
    const response1 = await fetch(districtsDataUrl)
    const jsonData = await response1.json()
    console.log(jsonData.districts)

    const updatedDistrictsData = jsonData.districts.map(each => ({
      districtId: each.district_id,
      districtName: each.district_name,
    }))

    this.setState({
      districtsData: updatedDistrictsData,
    })
  }

  onClickDosesButton = () => {
    this.setState({dosesButton: true})
  }

  onClickAgesButton = () => {
    this.setState({dosesButton: false})
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkMode} = value

          const {
            statesData,
            districtsData,
            totalSites,
            governmentSites,
            privateSites,
            totalDoses,
            firstDose,
            secondDose,
            vaccinationByDose,
            vaccinationByAge,
            vaccinationByCategory,
            differentVaccinations,
            differentAges,
            dosesButton,
            isLoading,
          } = this.state

          const activedosesButton = dosesButton ? 'ages-button1' : ''
          const agesDosesButton = !dosesButton ? 'ages-button1' : ''
          const lightMode = !darkMode ? 'header-container1' : ''
          const lightMode1 = !darkMode ? 'header-container2' : ''
          const lightMode2 = !darkMode ? 'header-container3' : ''

          return (
            <div className={`vaccination-total-page-container ${lightMode}`}>
              <Header vaccine />
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
                <div className={`vaccination-page-container ${lightMode}`}>
                  <AiFillHome className="home" />
                  <h1 className="vaccination-heading">India</h1>
                  <select
                    onChange={this.onChangeState}
                    defaultValue="none"
                    className={`states-drop-down ${lightMode1}`}
                  >
                    <option value="none">Select State</option>
                    {statesData.map(eachState => (
                      <option value={eachState.stateId} key={eachState.stateId}>
                        {eachState.stateName}
                      </option>
                    ))}
                  </select>
                  <select className={`districts-drop-down ${lightMode1}`}>
                    <option value="none" className="options-section">
                      Select District
                    </option>
                    {districtsData.map(eachState => (
                      <StatesList
                        eachState={eachState}
                        key={eachState.districtId}
                        district
                      />
                    ))}
                  </select>

                  <div className={`site-vaccination ${lightMode1}`}>
                    <div className="vaccination-image-container">
                      <img
                        src="https://i.ibb.co/CHySMGh/vaccines-1.png"
                        alt="Vaccine1"
                        className="vaccination-image"
                      />
                      <h1 className={`site-conducting-heading ${lightMode2}`}>
                        Site Conducting Vaccination
                      </h1>
                      <p
                        className={`total-sites-vaccination-value ${lightMode2}`}
                      >
                        {totalSites}
                      </p>
                      <p className={`site-government-heading ${lightMode2}`}>
                        Government
                      </p>
                      <p className={`total-gov-sites-value ${lightMode2}`}>
                        {governmentSites}
                      </p>
                      <p className={`site-private-heading ${lightMode2}`}>
                        Private
                      </p>
                      <p className={`total-prv-sites-value ${lightMode2}`}>
                        {privateSites}
                      </p>
                    </div>
                  </div>
                  <div className={`vaccination-doses ${lightMode1}`}>
                    <div className="vaccination-image-container ">
                      <img
                        src="https://i.ibb.co/5BQPhb4/apartment.png"
                        alt="Doses"
                        className="vaccination-image"
                      />
                      <h1 className={`site-conducting-heading ${lightMode2}`}>
                        Total Vaccination Doses
                      </h1>
                      <p
                        className={`total-sites-vaccination-value ${lightMode2}`}
                      >
                        {totalDoses}
                      </p>
                      <p className={`site-government-heading ${lightMode2}`}>
                        Dose 1
                      </p>
                      <p className={`total-gov-sites-value ${lightMode2}`}>
                        {firstDose}
                      </p>
                      <p className={`site-private-heading ${lightMode2}`}>
                        Dose 2
                      </p>
                      <p className={`total-prv-sites-value ${lightMode2}`}>
                        {secondDose}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`vaccination-line-chart-container ${lightMode1}`}
                  >
                    <h1 className={`vaccination-trends-heading ${lightMode2}`}>
                      Vaccination Trends
                    </h1>
                    <button
                      type="button"
                      className={`doses-button ${activedosesButton} ${lightMode2}`}
                      onClick={this.onClickDosesButton}
                    >
                      By Doses
                    </button>
                    <button
                      type="button"
                      className={`ages-button ${agesDosesButton} ${lightMode2}`}
                      onClick={this.onClickAgesButton}
                    >
                      By Age
                    </button>
                    <div className="vaccination-line-chart ">
                      {dosesButton && (
                        <AreaChart
                          width={1018}
                          height={300}
                          data={vaccinationByDose}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                          <XAxis
                            dataKey="label"
                            tick={{fill: '#6C757D'}}
                            tickLine={{stroke: '#6C757D'}}
                          />
                          <YAxis
                            tick={{fill: '#6C757D'}}
                            tickLine={{stroke: '#6C757D'}}
                          />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#A226DC"
                            fill="#2E1E30"
                            legendType="none"
                          />
                          <Area
                            type="monotone"
                            dataKey="dose_one"
                            stroke="#37C62B"
                            fill="#233323"
                            legendType="none"
                          />
                          <Area
                            type="monotone"
                            dataKey="dose_two"
                            stroke="#FCEA4E"
                            fill="#3E4226"
                            legendType="none"
                          />
                        </AreaChart>
                      )}
                    </div>
                    <div className="vaccination-line-chart">
                      {!dosesButton && (
                        <AreaChart
                          width={1018}
                          height={300}
                          data={vaccinationByAge}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                          <XAxis
                            dataKey="label"
                            tick={{fill: '#6C757D'}}
                            tickLine={{stroke: '#6C757D'}}
                          />
                          <YAxis
                            tick={{fill: '#6C757D'}}
                            tickLine={{stroke: '#6C757D'}}
                          />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="vac_12_14"
                            stroke="#A226DC"
                            fill="#2E1E30"
                            legendType="none"
                          />
                          <Area
                            type="monotone"
                            dataKey="vac_15_17"
                            stroke="#37C62B"
                            fill="#233323"
                            legendType="none"
                          />
                          <Area
                            type="monotone"
                            dataKey="vac_18_45"
                            stroke="#FCEA4E"
                            fill="#3E4226"
                            legendType="none"
                          />
                          <Area
                            type="monotone"
                            dataKey="vac_45_60"
                            stroke="#A3DF9F"
                            fill="#A3DF9F"
                            legendType="none"
                          />
                          <Area
                            type="monotone"
                            dataKey="vac_60_above"
                            stroke="#2D87BB"
                            fill="#2D87BB"
                            legendType="none"
                          />
                        </AreaChart>
                      )}
                    </div>
                  </div>
                  <div
                    className={`vaccination-category-container ${lightMode1}`}
                  >
                    <h1
                      className={`Vaccination-category-heading ${lightMode2}`}
                    >
                      Vaccination Category
                    </h1>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart className="first-half-pie-chart">
                        <Pie
                          cx="70%"
                          cy="40%"
                          data={vaccinationByCategory}
                          startAngle={0}
                          endAngle={180}
                          innerRadius="40%"
                          outerRadius="70%"
                          dataKey="count"
                        >
                          <Cell name="Female" fill="#5A8DEE" />
                          <Cell name="Male" fill="#F54394" />
                          <Cell name="Others" fill="#FF9800" />
                        </Pie>
                        <Legend
                          iconType="circle"
                          layout="horizontal"
                          verticalAlign="middle"
                          align="right"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          cx="70%"
                          cy="40%"
                          data={differentVaccinations}
                          startAngle={0}
                          endAngle={180}
                          innerRadius="40%"
                          outerRadius="70%"
                          dataKey="count"
                        >
                          <Cell name="Covaxin" fill="#5A8DEE" />
                          <Cell name="Covisheild" fill="#7AC142" />
                          <Cell name="Sputnik V" fill="#FF9800" />
                        </Pie>
                        <Legend
                          iconType="circle"
                          layout="horizontal"
                          verticalAlign="middle"
                          align="right"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className={`vaccination-by-age-container ${lightMode1}`}>
                    <h1 className={`vaccination-by-age-heading ${lightMode2}`}>
                      Vaccination By Age
                    </h1>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          cx="70%"
                          cy="40%"
                          data={differentAges}
                          startAngle={0}
                          endAngle={360}
                          dataKey="count"
                        >
                          <Cell name="Above 60" fill="#5A8DEE" />
                          <Cell name="12-14" fill="#7AC142" />
                          <Cell name="15-17" fill="#FF9800" />
                          <Cell name="18-45" fill="#A3DF9F" />
                          <Cell name="45-60" fill="#64C2A6" />
                        </Pie>
                        <Legend
                          iconType="circle"
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="right"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              <Footer vaccine />
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Vaccination
