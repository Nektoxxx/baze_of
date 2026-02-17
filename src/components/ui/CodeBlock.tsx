import { useState, useCallback } from 'react';

export interface CodeBlockProps {
  code: string;
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#0b1220',
        borderRadius: '18px',
        padding: '22px 24px',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy'}
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          width: '38px',
          height: '38px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#e2e8f0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 500,
          transition: 'background-color 0.15s, border-color 0.15s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
        }}
        className="code-block-copy-btn"
      >
        {copied ? 'Copied!' : <CopyIcon />}
      </button>
      <pre
        style={{
          margin: 0,
          overflow: 'auto',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#e2e8f0',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
