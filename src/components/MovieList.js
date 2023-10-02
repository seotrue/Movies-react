import { useRecoilState, useRecoilValue } from 'recoil'
import { FavoriteListAtom, MovieListAtom, MovieListQueryAtom, TotalPageAtom } from '../services/Atom'
import { useCallback, useEffect, useState } from 'react'
import { useIntersectionObserver } from '../hook/useIntersectionObserver'
import Modal from './Modal'
import { cloneDeep, findIndex, isEmpty, isNull } from 'lodash'
import { CardView } from './styledComponents'

const MovieList = () => {
  // 해당 컴포넌트 영화 데이터 구독
  //recoil 사용 선언부
  const [movieList, setMovieList] = useRecoilState(MovieListAtom)
  const [, setMovieListQuery] = useRecoilState(MovieListQueryAtom)
  const [, setFavoriteListAtom] = useRecoilState(FavoriteListAtom)
  const totalPage = useRecoilValue(TotalPageAtom)
  const [isOpen, setIsOpen] = useState(null)
  //const [scroll, setScroll] = useState(false)
  const [addListData, setAddListData] = useState([])

  //const [updateDate, setUpdateDate] = useState(searchData)

  useEffect(() => {
    console.log(movieList, 'useEffect: movieList')
    console.log(addListData, 'useEffect: addListData')
    console.log(totalPage, 'useEffect: totalPage')
    // 검색후 첫 진입시 List 데이터 리셋
    // setMovieList(searchData)
    setAddListData(prevState => [...prevState, ...movieList])
  }, [movieList])

  const callback = useCallback(() => {
    setMovieListQuery(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }))
    setMovieList([...addListData])
  }, [setMovieListQuery, addListData])

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
    <CardView>
      {isEmpty(addListData) ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <>
          {addListData.map((item, idx) => (
            <div
              className={'card'}
              key={idx}
              onClick={() => handleOpenFavoriteModal(item)}
              ref={idx === addListData.length - 1 ? setObservationTarget : null}
            >
              {/*각 영화 아이템은 위쪽에 영화 포스터 이미지, 아래쪽에 영화 제목, 연도, 타입이 표시됩니다.*/}
              <img src={item.Poster} alt='img' />
              {item.favorite && <p>즐겨찾기</p>}
              <p>{item.Title}</p>
              <p>{item.Year}</p>
              <p>{item.Type}</p>
            </div>
          ))}
          {/*{scroll && <div ref={setObservationTarget} style={{ width: '1px' }}></div>}*/}
        </>
      )}
      {!isNull(isOpen) && <Modal open={isOpen} close={() => setIsOpen(null)} onFavoriteToggle={handleFavoriteToggle} />}
    </CardView>
  )
}

export default MovieList
