import { createHighlighter } from 'shiki';
import bslGrammar from '../syntaxes/1c-bsl.tmLanguage.json';

const THEME = 'github-light';
const LANGS = ['typescript', 'tsx', 'javascript', 'python', 'json', 'bash'] as const;

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

/**
 * Возвращает общий highlighter с поддержкой BSL (1C). Кэшируется.
 */
export async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const highlighter = await createHighlighter({
        themes: [THEME],
        langs: [...LANGS],
      });
      await highlighter.loadLanguage(bslGrammar as Record<string, unknown>);
      return highlighter;
    })();
  }
  return highlighterPromise;
}

export const defaultTheme = THEME;
