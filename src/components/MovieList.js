import { useRecoilState } from 'recoil'
import { FavoriteListAtom, MovieListAtom, MovieListQueryAtom, SearchMoviesListAtom } from '../services/Atom'
import { useCallback, useEffect, useState } from 'react'
import { useIntersectionObserver } from '../hook/useIntersectionObserver'
import Modal from './Modal'
import { cloneDeep, findIndex, isNull } from 'lodash'
import { CardView } from './styledComponents'

const MovieList = () => {
  // 해당 컴포넌트 영화 데이터 구독
  //recoil 사용 선언부
  const [movieList] = useRecoilState(SearchMoviesListAtom)
  const [prevList, setMovieList] = useRecoilState(MovieListAtom)
  const [, setMovieListQuery] = useRecoilState(MovieListQueryAtom)
  const [, setFavoriteListAtom] = useRecoilState(FavoriteListAtom)
  const [isOpen, setIsOpen] = useState(null)

  useEffect(() => {
    console.log(movieList, prevList, 'movieList, prevList')
    // if (!isEqual(movieList, prevList)) {
    //   setMovieListAtom(prevState => [...prevState, ...movieList])
    // }
  }, [])

  const callback = useCallback(() => {
    setMovieListQuery(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }))
  }, [setMovieListQuery])

  const setObservationTarget = useIntersectionObserver(callback)

  const handleOpenFavoriteModal = movie => {
    // 선택 창이 뜨며 "즐겨찾기" or "취소" 를 선택 가능합니다.
    // "즐겨찾기"를 선택 시 해당 영화정보를 즐겨찾기 탭에서 조회할 수 있습니다.
    console.log(movie, '릭')
    setIsOpen(movie)
  }

  const handleFavoriteToggle = data => {
    // 전역관리에 업데이트
    const copyItem = cloneDeep(data)
    copyItem.favorite = !copyItem.favorite
    setFavoriteListAtom(prevState => {
      const targetIdx = findIndex(prevState, { imdbID: copyItem.imdbID })
      return targetIdx > -1 ? [...prevState, copyItem] : prevState.filter(v => v.imdbID !== copyItem.imdbID)
    })
    setMovieList(prevState => {
      const targetIdx = findIndex(prevState, { imdbID: copyItem.imdbID })
      if (targetIdx > -1) prevState[targetIdx] = copyItem
      return [...prevState]
    })
    setIsOpen(null)
  }

  return (
    <div>
      {movieList.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <CardView>
          {movieList.map((item, idx) => (
            <div className={'card'} key={idx} onClick={() => handleOpenFavoriteModal(item)}>
              {/*각 영화 아이템은 위쪽에 영화 포스터 이미지, 아래쪽에 영화 제목, 연도, 타입이 표시됩니다.*/}
              <img src={item.Poster} alt='img' />
              {item.favorite && <p>즐겨찾기</p>}
              <p>{item.Title}</p>
              <p>{item.Year}</p>
              <p>{item.Type}</p>
            </div>
          ))}
          <div ref={setObservationTarget}></div>
        </CardView>
      )}
      {!isNull(isOpen) && <Modal open={isOpen} close={() => setIsOpen(null)} onFavoriteToggle={handleFavoriteToggle} />}
    </div>
  )
}

export default MovieList
