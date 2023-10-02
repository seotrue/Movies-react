import useInput from '../hook/useInput'
import { Input } from './styledComponents'
import { MovieListQueryAtom } from '../services/Atom'
import { useRecoilState } from 'recoil'
const Search = () => {
  const [searchKeyword, onChangeSearchKeyword] = useInput('')
  const [MovieListQuery, setMovieListQuery] = useRecoilState(MovieListQueryAtom)
  //const setMoveList = useSetRecoilState(SearchMoviesListAtom)
  // movieListQueryAtom

  const handleSearchMovie = e => {
    e.preventDefault()
    console.log(MovieListQuery, '영화 검색!')
    // movieListQueryAtom 쿼리 디스패치
    setMovieListQuery({
      keyword: searchKeyword,
      page: 1,
    })
    //setMoveList()
  }

  return (
    <div>
      <Input
        placeholder={'영화를 검색해 주세요'}
        value={searchKeyword}
        onChange={onChangeSearchKeyword}
        width={'150px'}
      />
      <div onClick={e => handleSearchMovie(e)}>버튼</div>
    </div>
  )
}

export default Search
