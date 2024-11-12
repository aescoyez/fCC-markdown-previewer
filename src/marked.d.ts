import 'marked';

declare module 'marked' {
  export interface MarkedOptions {
    highlight?: (code: string, language: string) => string;
  }
}