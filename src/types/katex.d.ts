// Type definitions for KaTeX
interface KaTeXOptions {
  delimiters?: Array<{
    left: string;
    right: string;
    display: boolean;
  }>;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: Record<string, string>;
  fleqn?: boolean;
  leqno?: boolean;
  output?: string;
  trust?: boolean;
  strict?: boolean | string;
}

interface Window {
  renderMathInElement(element: HTMLElement, options?: KaTeXOptions): void;
}
