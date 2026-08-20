import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  info: string | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, info: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error);
    this.setState({ info: info.componentStack ?? null });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'monospace', color: '#fecaca', background: '#1e1b1b' }}>
          <h1 style={{ color: '#f87171', fontSize: 18 }}>Erro ao renderizar a página</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', opacity: 0.7 }}>{this.state.error.stack}</pre>
          {this.state.info && <pre style={{ whiteSpace: 'pre-wrap', opacity: 0.5 }}>{this.state.info}</pre>}
        </div>
      );
    }
    return this.props.children;
  }
}
