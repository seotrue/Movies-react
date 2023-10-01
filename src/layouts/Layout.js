import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Layout = () => {
  return (
    <>
      <div>
        <Outlet />
        <NavBar />
      </div>
    </>
  )
}

export default Layout
