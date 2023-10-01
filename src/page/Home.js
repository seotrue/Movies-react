import Search from '../components/Search'
import MovieList from '../components/MovieList'
import AsyncWrapper from '../layouts/AsyncWrapper'

const Home = () => {
  return (
    <AsyncWrapper errorFallback={<div>로드에 실패하였습니다</div>} suspenseFallback={<div>로딩중</div>}>
      <Search />
      <MovieList />
    </AsyncWrapper>
  )
}

export default Home
