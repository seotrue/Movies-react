import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MovieListAtom, TotalPageAtom } from '../services/Atom'

export const useIntersectionObserver = callback => {
  const totalPage = useRecoilValue(TotalPageAtom)
  const [movieList] = useRecoilState(MovieListAtom)

  const [observationTarget, setObservationTarget] = useState(null)
  const observer = useRef(
    new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return
        callback()
        observer.unobserve(entry.target)
      },
      { threshold: 1 },
    ),
  )

  useEffect(() => {
    const currentTarget = observationTarget
    const currentObserver = observer.current
    if (currentTarget) {
      currentObserver.observe(currentTarget)
    }
    if (movieList.length >= Number(totalPage)) {
      currentObserver.unobserve(currentTarget)
    }
    return () => {
      if (currentTarget) {
        currentObserver.unobserve(currentTarget)
        //currentObserver.disconnect()
      }
    }
  }, [observationTarget])

  return setObservationTarget
}
