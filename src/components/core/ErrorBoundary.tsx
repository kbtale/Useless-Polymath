import { Component, type ErrorInfo, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h3 className={styles.errorTitle}>
              {this.props.fallbackMessage || 'Something went wrong'}
            </h3>
            <p className={styles.errorDescription}>An error occurred while loading this module.</p>
            <button type="button" className={styles.retryButton} onClick={this.handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}