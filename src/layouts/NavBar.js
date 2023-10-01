import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const handleClickNav = () => {}

  return (
    <div className={'navBarMenu'}>
      <NavLink
        to='/'
        onClick={handleClickNav}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red',
        }}
      >
        검색
      </NavLink>
      <NavLink
        to='/favorite'
        onClick={handleClickNav}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red',
        }}
      >
        즐겨찾기
      </NavLink>
    </div>
  )
}

export default NavBar
