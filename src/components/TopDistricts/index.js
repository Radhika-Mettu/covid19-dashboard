import './index.css'

const TopDistricts = props => {
  const {eachDistrictItem, activeStatus} = props
  const {district} = eachDistrictItem
  return (
    <li className="state-list-item">
      <p className="state-each-district">{eachDistrictItem[activeStatus]}</p>
      <p>{district}</p>
    </li>
  )
}
export default TopDistricts
