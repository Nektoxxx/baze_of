import { useState, useCallback, useEffect } from 'react';
import { getHighlighter, defaultTheme } from '../../lib/shikiHighlighter';

export interface CodeBlockProps {
  code: string;
  /** Язык для подсветки: ts, tsx, js, python, json, bash, bsl (1C). Без указания — plaintext. */
  language?: string;
  /** Заголовок блока (например, язык или подпись). */
  title?: string;
  /** Имя прикреплённого файла — справа от заголовка показываются иконка, название и расширение. */
  attachedFileName?: string;
  /** URL прикреплённого файла — при указании блок файла становится кликабельной ссылкой. */
  attachedFileHref?: string;
}

const SHIKI_LANG_MAP: Record<string, string> = {
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  json: 'json',
  bash: 'bash',
  bsl: 'bsl',
  '1c': 'bsl',
};

function toShikiLang(lang: string | undefined): string {
  if (!lang) return 'text';
  const normalized = lang.toLowerCase().trim();
  return SHIKI_LANG_MAP[normalized] ?? 'text';
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function parseFileName(fileName: string): { name: string; extension: string } {
  const lastDot = fileName.lastIndexOf('.');
  if (lastDot === -1) return { name: fileName, extension: '' };
  return {
    name: fileName.slice(0, lastDot),
    extension: fileName.slice(lastDot + 1),
  };
}

export function CodeBlock({ code, language, title, attachedFileName, attachedFileHref }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const shikiLang = toShikiLang(language);
  const hasHeader = title ?? attachedFileName;
  const fileParts = attachedFileName ? parseFileName(attachedFileName) : null;

  useEffect(() => {
    let cancelled = false;
    setError(false);
    setHighlightedHtml(null);

    async function highlight() {
      try {
        const highlighter = await getHighlighter();
        const html = highlighter.codeToHtml(code, {
          lang: shikiLang,
          theme: defaultTheme,
        });
        if (!cancelled) setHighlightedHtml(html);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, shikiLang]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }, [code]);

  const showPlain = error || highlightedHtml === null;
  const containerBg = '#F6F8FA'; // github-light background
  const copyBtnBg = 'rgba(255, 255, 255, 0.9)';
  const copyBtnBorder = 'rgba(31, 35, 40, 0.12)';
  const copyBtnColor = '#24292f';

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
      style={{
        backgroundColor: containerBg,
        padding: '22px 24px',
      }}
    >
      {hasHeader ? (
        <div className="mb-3 flex min-h-[2.25rem] items-center justify-between gap-4">
          {title && (
            <span className="text-sm font-medium text-slate-600" style={{ color: '#57606a' }}>
              {title}
            </span>
          )}
          <div className={`flex items-center gap-2 ${!title ? 'ml-auto' : ''}`}>
            {fileParts && (attachedFileHref ? (
                <a
                  href={attachedFileHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-2 rounded-lg border px-3 py-1.5 transition-colors hover:bg-slate-100 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: copyBtnBorder,
                    color: copyBtnColor,
                  }}
                  title={attachedFileName}
                >
                  <span className="flex items-center" style={{ color: '#57606a' }} aria-hidden>
                    <FileIcon />
                  </span>
                  <span className="truncate max-w-[180px] font-medium" style={{ color: copyBtnColor }}>
                    {fileParts.name}
                  </span>
                  {fileParts.extension && (
                    <span
                      className="shrink-0 rounded px-1.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: 'rgba(31, 35, 40, 0.08)',
                        color: '#57606a',
                      }}
                    >
                      .{fileParts.extension}
                    </span>
                  )}
                </a>
              ) : (
                <div
                  className="flex shrink-0 items-center gap-2 rounded-lg border px-3 py-1.5"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: copyBtnBorder,
                    color: copyBtnColor,
                  }}
                  title={attachedFileName}
                >
                  <span className="flex items-center" style={{ color: '#57606a' }} aria-hidden>
                    <FileIcon />
                  </span>
                  <span className="truncate max-w-[180px] font-medium" style={{ color: copyBtnColor }}>
                    {fileParts.name}
                  </span>
                  {fileParts.extension && (
                    <span
                      className="shrink-0 rounded px-1.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: 'rgba(31, 35, 40, 0.08)',
                        color: '#57606a',
                      }}
                    >
                      .{fileParts.extension}
                    </span>
                  )}
                </div>
              ))}
            <button
              type="button"
              onClick={handleCopy}
              title={copied ? '✔' : 'Копировать'}
              aria-label={copied ? '✔' : 'Копировать код'}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2"
              style={{
                backgroundColor: copyBtnBg,
                borderColor: copyBtnBorder,
                color: copyBtnColor,
              }}
            >
              {copied ? '✔' : <CopyIcon />}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleCopy}
          title={copied ? '✔' : 'Копировать'}
          aria-label={copied ? '✔' : 'Копировать код'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2"
          style={{
            backgroundColor: copyBtnBg,
            borderColor: copyBtnBorder,
            color: copyBtnColor,
          }}
        >
          {copied ? '✔' : <CopyIcon />}
        </button>
      )}

      {showPlain ? (
        <pre
          className="m-0 overflow-auto font-mono text-sm leading-relaxed"
          style={{
            color: '#24292f', 
            fontFamily: 'ui-monospace, monospace',
            minHeight: '1.5rem',
          }}
        >
          <code>{code}</code>
        </pre>
      ) : (
        <div
          className="code-block-shiki overflow-auto [&_pre]:m-0 [&_pre]:overflow-visible [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedHtml ?? '' }}
        />
      )}
    </div>
  );
}
