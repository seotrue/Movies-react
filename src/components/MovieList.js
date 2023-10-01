import { useRecoilState } from 'recoil'
import { FavoriteListAtom, searchMoviesListAtom } from '../services/Atom'
import Modal from './Modal'
import { useRef, useState } from 'react'
import { isNull } from 'lodash'
import { useIntersectionObserver } from '../hook/useIntersectionObserver'

const MovieList = () => {
  // 해당 컴포넌트 영화 데이터 구독
  //recoil 사용 선언부
  const [movieList] = useRecoilState(searchMoviesListAtom)
  const [, setFavoriteListAtom] = useRecoilState(FavoriteListAtom)
  const [isOpen, setIsOpen] = useState(null)

  console.log(movieList, '리스트 보여라~~~~~~~~~')

  const handleClickFavorite = movie => {
    // 선택 창이 뜨며 "즐겨찾기" or "취소" 를 선택 가능합니다.
    // "즐겨찾기"를 선택 시 해당 영화정보를 즐겨찾기 탭에서 조회할 수 있습니다.
    console.log(movie, '릭')
    setIsOpen(movie)
  }
  //const setObservationTarget = useIntersectionObserver(fetchMoreComments)
  return (
    <div>
      {movieList.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <>
          {movieList.map((item, idx) => (
            <div key={idx} onClick={() => handleClickFavorite(item)}>
              {/*각 영화 아이템은 위쪽에 영화 포스터 이미지, 아래쪽에 영화 제목, 연도, 타입이 표시됩니다.*/}
              <img src={item.Poster} alt='img' />
              {item.favorite && <p>즐겨찾기</p>}
              <p>{item.Title}</p>
              <p>{item.Year}</p>
              <p>{item.Type}</p>
            </div>
          ))}
          <div ref={setObservationTarget}></div>
        </>
      )}
      {!isNull(isOpen) && <Modal close={() => setIsOpen(null)} handler={() => setFavoriteListAtom(isOpen)} />}
    </div>
  )
}

export default MovieList
