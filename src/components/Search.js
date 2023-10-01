import { useSetRecoilState, useRecolValue } from 'recoil'
import { contentStateAtom } from '../services/Atom'
const Search = () => {
  //recoil 사용 선언부
  const setContent = useSetRecoilState(contentStateAtom)
  const content = useRecolValue(contentStateAtom)

  return <div></div>
}

export default Search
