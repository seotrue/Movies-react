import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const AsyncWrapper = props => {
  // eslint-disable-next-line react/prop-types
  const { children, errorFallback, suspenseFallback } = props

  return (
    <ErrorBoundary FallbackComponent={errorFallback}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default AsyncWrapper
