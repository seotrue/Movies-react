import { recoilPersist } from 'recoil-persist'
import { atom, selector } from 'recoil'
import axios from 'axios'
import { find } from 'lodash'
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

export const MaxPageAtom = atom({ key: 'MaxPageAtom', default: 1 })

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
    const baseList = get(MovieListAtom)
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
      const favoriteList = get(FavoriteListAtom) // 동기적으로 호출한다.
      const newDate = data.Search.map(movie => {
        //"imdbID":
        const target = find(favoriteList, { imdbID: movie.imdbID }) || false
        movie.favorite = !target ? false : true
        return movie
      })
      return [...baseList, ...newDate]
    } else {
      return baseList
    }
  },
  // set: ({ set, get }, newValue) => {
  //   // 원본훼손O
  //   // set(Aatom, newValue) // Aatom = newValue 이런식으로, 기존값 무시하고 재할당된다.
  //   set(MovieListAtom, newValue) // B 버튼 2번) Aatom = Aatom + newValue 이런식으로, count = count + 1 의 방식을 유지할 수 있다.
  // },
})
