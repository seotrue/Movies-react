import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = callback => {
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
    return () => {
      if (currentTarget) {
        currentObserver.unobserve(currentTarget)
        //currentObserver.disconnect()
      }
    }
  }, [observationTarget])

  return setObservationTarget
}
