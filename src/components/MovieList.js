import { useRecoilState } from 'recoil'
import { FavoriteListAtom, JoinFavoriteAndSearchListAtom, MovieListAtom, MovieListQueryAtom } from '../services/Atom'
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
  const [, setMovieList] = useRecoilState(MovieListAtom)
  const [, setMovieListQuery] = useRecoilState(MovieListQueryAtom)
  const [favoriteList, setFavoriteListAtom] = useRecoilState(FavoriteListAtom)
  //const totalPage = useRecoilValue(TotalPageAtom)
  const [isOpen, setIsOpen] = useState(null)
  const [addListData, setAddListData] = useState(joinFavoriteAndSearchList)

  useEffect(() => {
    // 검색후 첫 진입시 List 데이터 리셋
    if (!isEqual(addListData, joinFavoriteAndSearchList)) {
      setAddListData(prev => {
        const updateDate = cloneDeep([...prev, ...joinFavoriteAndSearchList]).map(v => {
          const targetIdx = findIndex(favoriteList, { imdbID: v.imdbID })
          v.favorite = targetIdx > -1 ? true : false
          return v
        })
        return updateDate
      })
      return
    }
    if (isEmpty(joinFavoriteAndSearchList)) {
      setAddListData([])
    }
  }, [joinFavoriteAndSearchList, favoriteList])
  console.log(addListData, 'useEffect: addListData')

  const callback = useCallback(() => {
    setMovieListQuery(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }))
    const accumulateArr = [...addListData, ...joinFavoriteAndSearchList]
    setMovieList(accumulateArr)
  }, [setMovieListQuery, addListData, joinFavoriteAndSearchList])

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
      {isEmpty(addListData) ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <>
          {addListData.map((item, idx) => (
            <MovieItem
              item={item}
              key={idx}
              refTarget={addListData.length - 1 ? setObservationTarget : null}
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
