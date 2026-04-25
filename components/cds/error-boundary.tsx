'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showDetails?: boolean;
  module?: string;
}

export class CDSErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
    
    // Log to console for debugging
    console.error('[v0] CDSErrorBoundary caught error:', error);
    console.error('[v0] Error info:', errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <Card className="max-w-lg w-full border-destructive/50 bg-destructive/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-destructive font-mono">
                <AlertTriangle className="w-6 h-6" />
                SYSTEM ERROR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-mono text-sm text-foreground">
                  {this.props.module && (
                    <span className="text-muted-foreground">Module: </span>
                  )}
                  {this.props.module || 'Component'} encountered an error.
                </p>
                
                {this.props.showDetails && this.state.error && (
                  <div className="p-3 rounded-md bg-background/50 border border-border overflow-auto max-h-32">
                    <p className="font-mono text-xs text-destructive">
                      {this.state.error.message}
                    </p>
                  </div>
                )}
                
                {this.props.showDetails && this.state.errorInfo && (
                  <details className="text-xs">
                    <summary className="font-mono text-muted-foreground cursor-pointer hover:text-foreground">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 p-3 rounded-md bg-background/50 border border-border overflow-auto max-h-40 text-muted-foreground">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={this.handleRetry}
                  className="font-mono text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-2" />
                  Retry
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/'}
                  className="font-mono text-xs"
                >
                  <Home className="w-3 h-3 mr-2" />
                  Return Home
                </Button>
                {this.props.showDetails && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (this.state.error) {
                        navigator.clipboard.writeText(
                          `Error: ${this.state.error.message}\n\nStack: ${this.state.errorInfo?.componentStack || 'N/A'}`
                        );
                      }
                    }}
                    className="font-mono text-xs"
                  >
                    <Bug className="w-3 h-3 mr-2" />
                    Copy Debug Info
                  </Button>
                )}
              </div>

              <p className="font-mono text-[10px] text-muted-foreground pt-2 border-t border-border">
                DG77.77X ERROR HANDLER | PERPETUAL GROOVE RECOVERY
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for easier use
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <CDSErrorBoundary {...options}>
        <Component {...props} />
      </CDSErrorBoundary>
    );
  };
}

// Hook for error reporting
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return React.useCallback((error: Error) => {
    setError(error);
  }, []);
}
