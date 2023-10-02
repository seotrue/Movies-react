import { NavLink } from 'react-router-dom'
import { FootTab } from '../components/styledComponents'

const NavBar = () => {
  const handleClickNav = () => {}

  return (
    <FootTab>
      <NavLink className={props => (props.isActive ? 'nav active' : 'nav')} to='/' onClick={handleClickNav}>
        검색
      </NavLink>
      <NavLink className={props => (props.isActive ? 'nav active' : 'nav')} to='/favorite' onClick={handleClickNav}>
        즐겨찾기
      </NavLink>
    </FootTab>
  )
}

export default NavBar
