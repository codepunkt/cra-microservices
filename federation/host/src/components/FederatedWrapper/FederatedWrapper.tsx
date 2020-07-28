import React from 'react'

type FederatedWrapperProps = {
  error: React.ReactNode
  fallback: React.ReactNode
}

type FederatedWrapperState = {
  hasError: boolean
}

class FederatedWrapper extends React.Component<
  FederatedWrapperProps,
  FederatedWrapperState
> {
  constructor(props: FederatedWrapperProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.error || <div>Something went wrong.</div>
    }

    return (
      <React.Suspense fallback={this.props.fallback || ''}>
        {this.props.children}
      </React.Suspense>
    )
  }
}

export default FederatedWrapper
