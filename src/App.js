import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Favorite from './page/Favorite'

function Home() {
  return null
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='favorite' element={<Favorite />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
