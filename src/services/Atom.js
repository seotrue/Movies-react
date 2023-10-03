import { recoilPersist } from 'recoil-persist'
import { atom, selector } from 'recoil'
import axios from 'axios'
import { cloneDeep, findIndex, isEmpty } from 'lodash'
const { persistAtom } = recoilPersist()

//recoil state 생성
export const MovieListAtom = atom({
  key: 'MovieListAtom',
  default: [],
  effects_UNSTABLE: [persistAtom], // 새로고침 유지하고 싶은 atom에 추가
})

export const MovieListQueryAtom = atom({
  key: 'MovieListQueryAtom',
  default: {
    keyword: '',
    page: 1,
  },
})

export const TotalPageAtom = atom({ key: 'TotalPageAtom', default: 1 })

// 서버데이터 즐겨찾기 데이터와 결합
export const FavoriteListAtom = atom({
  key: 'FavoriteListAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const SearchMoviesListAtom = selector({
  key: 'SearchMoviesListAtom',
  get: async ({ get }) => {
    const url = 'http://www.omdbapi.com/?apikey=92e32667'
    const searchParams = get(MovieListQueryAtom)
    const { data } = await axios.get(url, {
      params: {
        s: searchParams.keyword,
        page: searchParams.page,
      },
    })
    console.log('서치 함수')
    //const baseList = get(MovieListAtom)
    if (data.Response === 'True') {
      const pageTotal = data.totalResults
      return { data: data.Search || [], pageTotal }
    } else {
      return []
    }
  },
})

export const JoinFavoriteAndSearchListAtom = selector({
  key: 'JoinFavoriteAndSearchListAtom',
  get: ({ get }) => {
    // 즐겨찾기 데이터 결합 후 movieListAtom 담기
    const getSearchData = cloneDeep(get(MovieListAtom)) // 동기적으로 호출한다.
    const favoriteList = get(FavoriteListAtom) // 동기적으로 호출한다.
    console.log(favoriteList, 'ffff')
    console.log(getSearchData, 'getSearchData Atom')
    const newDate = getSearchData.map(movie => {
      const target = findIndex(favoriteList, { imdbID: movie.imdbID })
      movie.favorite = target > -1 ? true : false
      return movie
    })

    console.log(newDate, 'newDate:::: getg')

    return newDate
  },
  set: ({ set, reset }, newValue) => {
    if (isEmpty(newValue)) {
      reset(MovieListAtom)
    } else {
      set(MovieListAtom, newValue)
    }
  },
})
