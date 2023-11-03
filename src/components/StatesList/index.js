import './index.css'

const StatesList = props => {
  const {eachState} = props
  const {districtName} = eachState
  return <option value={districtName}>{districtName}</option>
}
export default StatesList
