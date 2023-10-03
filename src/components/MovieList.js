import { useRecoilState } from 'recoil'
import {
  FavoriteListAtom,
  JoinFavoriteAndSearchListAtom,
  MovieListAtom,
  MovieListQueryAtom,
  SearchMoviesListAtom,
} from '../services/Atom'
import { useCallback, useEffect, useState } from 'react'
import { useIntersectionObserver } from '../hook/useIntersectionObserver'
import Modal from './Modal'
import { cloneDeep, findIndex, isEmpty, isEqual, isNull } from 'lodash'
import { CardView } from './styledComponents'
import MovieItem from './MovieItem'

const MovieList = () => {
  // 해당 컴포넌트 영화 데이터 구독
  //recoil 사용 선언부
  const [joinFavoriteAndSearchList] = useRecoilState(JoinFavoriteAndSearchListAtom)
  const [searchData] = useRecoilState(SearchMoviesListAtom)
  const [movieList, setMovieList] = useRecoilState(MovieListAtom)
  const [movieListQuery, setMovieListQuery] = useRecoilState(MovieListQueryAtom)
  const [favoriteList, setFavoriteListAtom] = useRecoilState(FavoriteListAtom)
  //const totalPage = useRecoilValue(TotalPageAtom)
  const [isOpen, setIsOpen] = useState(null)

  const [addListData, setAddListData] = useState(joinFavoriteAndSearchList)

  useEffect(() => {
    if (!isEqual(addListData, movieList)) {
      setAddListData(prev => {
        const sow = movieListQuery.sameKeyword ? prev : []
        const updateDate = [...sow, ...joinFavoriteAndSearchList]

        const result = updateDate.filter((v, i) => updateDate.findIndex(x => x.imdbID === v.imdbID) === i)
        return result
      })
      return
    }
  }, [joinFavoriteAndSearchList, favoriteList, movieListQuery])
  useEffect(() => {
    const { data = [] } = searchData
    const sow = movieListQuery.sameKeyword ? addListData : []
    const updateState = [...sow, ...data]
    const result = updateState.filter((v, i) => updateState.findIndex(x => x.imdbID === v.imdbID) === i)
    setMovieList(result)
  }, [searchData, movieListQuery])

  const callback = useCallback(() => {
    setMovieListQuery(prevState => ({
      ...prevState,
      page: prevState.page + 1,
      sameKeyword: true,
    }))
  }, [joinFavoriteAndSearchList])

  const setObservationTarget = useIntersectionObserver(callback)

  const handleOpenFavoriteModal = movie => {
    setIsOpen(movie)
  }

  const handleFavoriteToggle = data => {
    // 전역관리에 업데이트
    const copyItem = cloneDeep(data)
    copyItem.favorite = !copyItem.favorite

    setFavoriteListAtom(prevState => {
      const targetIdx = findIndex(prevState, { imdbID: copyItem.imdbID })
      return targetIdx > -1 ? prevState.filter(v => v.imdbID !== copyItem.imdbID) : [...prevState, copyItem]
    })
    setIsOpen(null)
  }

  return (
    <CardView>
      {isEmpty(joinFavoriteAndSearchList) ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <>
          {joinFavoriteAndSearchList.map((item, idx) => (
            <MovieItem
              item={item}
              key={idx}
              refTarget={joinFavoriteAndSearchList.length - 1 ? setObservationTarget : null}
              onOpenFavoriteModal={handleOpenFavoriteModal}
            />
          ))}
        </>
      )}
      {!isNull(isOpen) && <Modal open={isOpen} close={() => setIsOpen(null)} onFavoriteToggle={handleFavoriteToggle} />}
    </CardView>
  )
}

export default MovieList
