import { useRecoilState } from 'recoil'
import { searchMoviesListAtom } from '../services/Atom'

const MovieList = () => {
  // 해당 컴포넌트 영화 데이터 구독
  //recoil 사용 선언부
  const [movieList] = useRecoilState(searchMoviesListAtom)

  console.log(movieList, '리스트 보여라~~~~~~~~~')

  return <div>{movieList.length === 0 ? <div>검색 결과가 없습니다.</div> : <div>{movieList}</div>}</div>
}

export default MovieList
