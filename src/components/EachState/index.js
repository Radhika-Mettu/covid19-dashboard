import {Link} from 'react-router-dom'
import './index.css'

const EachState = props => {
  const {each} = props
  const {
    name,
    confirmed,
    active,
    recovered,
    deceased,
    population,
    stateCode,
  } = each
  return (
    <li className="list-item">
      <Link to={`/state/${stateCode}`} className="line-state">
        <p className="name">{name}</p>
      </Link>
      <p className="confirmed">{confirmed}</p>
      <p className="active">{active}</p>
      <p className="recovered">{recovered}</p>
      <p className="deceased">{deceased}</p>
      <p className="population">{population}</p>
    </li>
  )
}

export default EachState
