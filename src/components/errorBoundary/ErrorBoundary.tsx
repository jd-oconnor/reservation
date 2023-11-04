/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  fallback?: any // TODO: type this properly
}

interface State {
  hasError: boolean
}

// TODO: remove and implement Rollbar
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    console.error(error)
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, info: { componentStack: any }) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack)
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
