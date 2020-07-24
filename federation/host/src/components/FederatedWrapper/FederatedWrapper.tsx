import React from 'react'

type FederatedWrapperProps = {
  error: React.ReactNode
  delayed: React.ReactNode
}

type FederatedWrapperState = {
  hasError: boolean
}

export class FederatedWrapper extends React.Component<
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
      <React.Suspense fallback={this.props.delayed || <div />}>
        {this.props.children}
      </React.Suspense>
    )
  }
}
