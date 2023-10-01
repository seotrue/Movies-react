import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Favorite from './page/Favorite'
import { RecoilRoot } from 'recoil'

function Home() {
  return null
}

function App() {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  )
}

export default App
