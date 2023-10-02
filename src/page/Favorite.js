import { useRecoilState } from 'recoil'
import { FavoriteListAtom } from '../services/Atom'
import { CardView } from '../components/styledComponents'
import { findIndex, isEmpty } from 'lodash'

const Favorite = () => {
  const [favoriteList, setFavoriteListAtom] = useRecoilState(FavoriteListAtom)

  const handleClickFavorite = movie => {
    console.log('~')
    setFavoriteListAtom(prevState => {
      const target = findIndex(prevState, { imdbID: movie.imdbID })
      return target > -1 ? [...prevState, movie] : prevState.filter(v => v.imdbID !== movie.imdbID)
    })
  }
  return (
    <CardView>
      <h1>내 즐겨찾기</h1>
      {isEmpty(favoriteList)
        ? '즐겨찾기 한 영화가 없습니다.'
        : favoriteList.map((item, idx) => (
            <div className={'card'} key={idx} onClick={() => handleClickFavorite(item)}>
              {/*각 영화 아이템은 위쪽에 영화 포스터 이미지, 아래쪽에 영화 제목, 연도, 타입이 표시됩니다.*/}
              <img src={item.Poster} alt='img' />
              {item.favorite && <p>즐겨찾기</p>}
              <p>{item.Title}</p>
              <p>{item.Year}</p>
              <p>{item.Type}</p>
            </div>
          ))}
    </CardView>
  )
}

export default Favorite
