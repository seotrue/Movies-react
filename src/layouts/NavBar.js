import { NavLink } from 'react-router-dom'
import { FootTab } from '../components/styledComponents'

const NavBar = () => {
  return (
    <FootTab>
      <NavLink className={props => (props.isActive ? 'nav active' : 'nav')} to='/'>
        검색
      </NavLink>
      <NavLink className={props => (props.isActive ? 'nav active' : 'nav')} to='/favorite'>
        즐겨찾기
      </NavLink>
    </FootTab>
  )
}

export default NavBar
