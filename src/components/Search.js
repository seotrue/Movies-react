import useInput from '../hook/useInput'
import { Input, SearBar } from './styledComponents'
import {
  JoinFavoriteAndSearchListAtom,
  MovieListAtom,
  MovieListQueryAtom,
  SearchMoviesListAtom,
  TotalPageAtom,
} from '../services/Atom'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

const Search = () => {
  const [searchKeyword, onChangeSearchKeyword] = useInput('')
  const [, setMovieListQuery] = useRecoilState(MovieListQueryAtom)
  const [searchData] = useRecoilState(SearchMoviesListAtom)
  const [, setMovieList] = useRecoilState(MovieListAtom)
  const setTotalPage = useSetRecoilState(TotalPageAtom)
  //const resetCookies = useResetRecoilState(MovieListAtom)
  const resetCookies = useResetRecoilState(JoinFavoriteAndSearchListAtom)

  useEffect(() => {
    // 검색 쿼리로 초기화
    const { data = [], pageTotal = 1 } = searchData
    setMovieList(data)
    setTotalPage(pageTotal)
  }, [searchData])

  const handleSearchMovie = e => {
    e.preventDefault()
    resetCookies([])
    setMovieList([])
    // movieListQueryAtom 쿼리 디스패치
    setMovieListQuery({
      keyword: searchKeyword,
      page: 1,
      sameKeyword: false,
    })
  }

  return (
    <SearBar>
      <Input placeholder={'영화를 검색해 주세요'} value={searchKeyword} onChange={onChangeSearchKeyword} />
      <button onClick={e => handleSearchMovie(e)}>버튼</button>
    </SearBar>
  )
}

export default Search
