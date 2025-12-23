import React, { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Vite env types
    const isDev = import.meta.env?.DEV;
    
    // Log error
    if (isDev) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Track error in analytics (if available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', 'exception', {
          description: error.toString(),
          fatal: false,
        });
      } catch (e) {
        // Ignore analytics errors
      }
    }

    // Optional: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example for Sentry:
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, { contexts: { react: errorInfo } });
    // }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - Vite env types
      const isDev = import.meta.env?.DEV;

      return (
        <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-black p-6">
          <div className="max-w-md w-full text-center">
            <h1 className="font-display text-4xl font-semibold text-text-primary mb-4">
              Something went wrong
            </h1>
            <p className="text-text-secondary mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-3 bg-coral text-white rounded-xl font-bold hover:bg-coral-dark transition-colors"
            >
              Refresh Page
            </button>
            {isDev && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-text-secondary mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs bg-black/5 dark:bg-white/5 p-4 rounded overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
