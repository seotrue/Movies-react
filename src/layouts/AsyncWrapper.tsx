import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const AsyncWrapper = props => {
  const { children, errorFallback, suspenseFallback, resetErrorBoundary } = props

  return (
    <ErrorBoundary FallbackComponent={errorFallback} onReset={resetErrorBoundary}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default AsyncWrapper
