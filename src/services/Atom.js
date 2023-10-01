import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()
import { atom, selectorFamily } from 'recoil'

//recoil state 생성
export const contentStateAtom = atom({
  key: 'content',
  default: {
    name: 'test',
    status: false,
    message: '',
  },
  effects_UNSTABLE: [persistAtom], // 새로고침 유지하고 싶은 atom에 추가
})

export const searchMoviesListAtom = selectorFamily({
  key: 'searchMovies',
  get: param => async () => {
    const response = await fetch(``)
    const data = response.json()
    return data
  },
})
