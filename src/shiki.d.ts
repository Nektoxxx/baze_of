declare module 'shiki' {
  export function codeToHtml(
    code: string,
    options: { lang: string; theme: string }
  ): Promise<string>;

  export function createHighlighter(options: {
    themes: string[];
    langs: string[];
  }): Promise<{
    codeToHtml(code: string, options: { lang: string; theme: string }): string;
    loadLanguage(lang: string | Record<string, unknown>): Promise<void>;
  }>;
}
