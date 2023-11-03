import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchItems = props => {
  const {eachItem} = props
  const {name, stateCode} = eachItem
  return (
    <Link to={`/state/${stateCode}`}>
      <li className="search-list-item">
        <p className="search-state-name">{name}</p>
        <button type="button" className="search-item-button">
          {stateCode} <BiChevronRightSquare className="right-arrow-icon" />
        </button>
      </li>
      <hr className="search-horizontal-line" />
    </Link>
  )
}
export default SearchItems
