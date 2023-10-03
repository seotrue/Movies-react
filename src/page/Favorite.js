import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { FavoriteListAtom } from '../services/Atom'
import { CardView } from '../components/styledComponents'
import { cloneDeep, findIndex, isEmpty, isNull } from 'lodash'
import MovieItem from '../components/MovieItem'
import Modal from '../components/Modal'

const Favorite = () => {
  const [favoriteList, setFavoriteListAtom] = useRecoilState(FavoriteListAtom)
  const [isOpen, setIsOpen] = useState(null)

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
    <>
      <h1>내 즐겨찾기</h1>
      <CardView>
        {isEmpty(favoriteList)
          ? '즐겨찾기 한 영화가 없습니다.'
          : favoriteList.map((item, idx) => (
              <MovieItem item={item} key={idx} refTarget={null} onOpenFavoriteModal={handleOpenFavoriteModal} />
            ))}
        {!isNull(isOpen) && (
          <Modal open={isOpen} close={() => setIsOpen(null)} onFavoriteToggle={handleFavoriteToggle} />
        )}
      </CardView>
    </>
  )
}

export default Favorite
