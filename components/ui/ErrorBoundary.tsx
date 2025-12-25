import React, { ReactNode, ErrorInfo } from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, ArrowLeft, Home, HelpCircle } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

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
        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20 font-sans selection:bg-coral selection:text-white transition-colors duration-500">
          <div className="container mx-auto px-6 pt-4 md:pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Error
                </span>
              </div>

              {/* Main Content Card */}
              <div className="bg-white dark:bg-surface rounded-[2rem] p-8 md:p-12">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-coral/10 dark:bg-coral/20 flex items-center justify-center"
                  >
                    <AlertTriangle className="w-10 h-10 text-coral" />
                  </motion.div>
                </div>

                {/* Heading */}
                <AnimatedHeading
                  as="h1"
                  className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-4 text-center"
                  delay={0.3}
                >
                  Something went wrong
                </AnimatedHeading>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-text-secondary text-center mb-8 max-w-lg mx-auto"
                >
                  We're sorry, but something unexpected happened. Don't worry, we're here to help you get back on track.
                </motion.p>

                {/* Help Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-black/5 dark:bg-white/5 rounded-[2rem] p-6 mb-8"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <HelpCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                    <h3 className="font-display text-lg font-semibold text-text-primary">
                      What you can do:
                    </h3>
                  </div>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Try refreshing the page - this often resolves temporary issues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Check your internet connection and try again</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Clear your browser cache if the problem persists</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Go back to the previous page and try a different path</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    onClick={() => {
                      this.setState({ hasError: false, error: null });
                      window.location.reload();
                    }}
                    size="lg"
                    variant="primary"
                    className="group"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Refresh Page
                  </Button>
                  <Button
                    onClick={() => {
                      this.setState({ hasError: false, error: null });
                      window.history.back();
                    }}
                    size="lg"
                    variant="outline"
                    className="group"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Go Back
                  </Button>
                  <Button
                    onClick={() => {
                      this.setState({ hasError: false, error: null });
                      window.location.href = '/';
                    }}
                    size="lg"
                    variant="outline"
                    className="group"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </motion.div>

                {/* Error Details (Dev Only) */}
                {isDev && this.state.error && (
                  <motion.details
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8"
                  >
                    <summary className="cursor-pointer text-sm font-semibold text-text-secondary mb-3 hover:text-coral transition-colors">
                      Error Details (Development Only)
                    </summary>
                    <div className="bg-black/5 dark:bg-white/5 rounded-[2rem] p-6 mt-3 overflow-auto">
                      <p className="text-xs font-mono text-red-600 dark:text-red-400 mb-3 font-semibold">
                        {this.state.error.toString()}
                      </p>
                      {this.state.error.stack && (
                        <pre className="text-xs text-text-secondary whitespace-pre-wrap font-mono leading-relaxed">
                          {this.state.error.stack}
                        </pre>
                      )}
                    </div>
                  </motion.details>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
