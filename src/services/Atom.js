import { recoilPersist } from 'recoil-persist'
import { atom, selector } from 'recoil'
import axios from 'axios'
const { persistAtom } = recoilPersist()

//recoil state 생성
export const movieListAtom = atom({
  key: 'movieList',
  default: [],
  effects_UNSTABLE: [persistAtom], // 새로고침 유지하고 싶은 atom에 추가
})

export const movieListQueryAtom = atom({
  key: 'movieListQueryAtom',
  default: {
    keyword: '',
    page: 1,
  },
})

// 서버데이터 즐겨찾기 데이터와 결화
export const FavoriteListAtom = atom({
  key: 'FavoriteListAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const searchMoviesListAtom = selector({
  key: 'searchMovies',
  get: async ({ get }) => {
    const url = 'http://www.omdbapi.com/?apikey=92e32667'
    const searchParams = get(movieListQueryAtom)
    console.log(searchParams, 'api 호출 전:::::::')
    const { data } = await axios.get(url, {
      params: {
        s: searchParams.keyword,
        page: searchParams.page,
      },
    })
    console.log(data, 'response')
    if (data.Response === 'True') {
      // 즐겨찾기 데이터 결합 후 movieListAtom 담기
      //const FavoriteList = get(FavoriteListAtom) // 동기적으로 호출한다.
      return data.Search
    } else {
      return []
    }
  },
})
