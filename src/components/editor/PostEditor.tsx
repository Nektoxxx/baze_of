import { Button } from '../ui';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TextBlock = { id: string; type: 'text'; content: string };
export type CodeBlock = {
  id: string;
  type: 'code';
  content: string;
  language: string;
  /** Заголовок блока (например, «BSL» или подпись). */
  title?: string;
  /** Имя прикреплённого файла для отображения в шапке код-блока. */
  attachedFileName?: string;
  /** URL прикреплённого файла — при указании блок файла становится кликабельной ссылкой. */
  attachedFileHref?: string;
};
export type FileBlock = {
  id: string;
  type: 'file';
  fileName: string;
  fileSize: number;
  /** Object URL или удалённый URL для скачивания. */
  fileUrl: string;
  /** Необязательное описание файла. */
  description?: string;
};
export type Block = TextBlock | CodeBlock | FileBlock;

const LANGUAGES = [
  'tsx', 'jsx', 'typescript', 'javascript',
  'python', 'bash', 'json', 'css', 'html', 'sql', 'rust', 'go',
  'bsl', // 1C:Enterprise (BSL) — подсветка через кастомную грамматику
];

function genId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function revokeFileUrl(url: string) {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function IconDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function blockTypeLabel(type: Block['type']): string {
  if (type === 'text') return 'Текст';
  if (type === 'code') return 'Код';
  return 'Файл';
}

// ─── Block Card ───────────────────────────────────────────────────────────────

interface BlockCardProps {
  block: Block;
  isFirst: boolean;
  isLast: boolean;
  onChange: (block: Block) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

function BlockCard({ block, isFirst, isLast, onChange, onMoveUp, onMoveDown, onDelete }: BlockCardProps) {
  const labelId = `block-label-${block.id}`;
  const fileInputId = `block-file-${block.id}`;

  const handleFileSelect = (file: File) => {
    if (block.type !== 'file') return;
    revokeFileUrl(block.fileUrl);
    onChange({
      ...block,
      fileName: file.name,
      fileSize: file.size,
      fileUrl: URL.createObjectURL(file),
    });
  };

  const handleClearFile = () => {
    if (block.type !== 'file') return;
    revokeFileUrl(block.fileUrl);
    onChange({ ...block, fileName: '', fileSize: 0, fileUrl: '' });
  };

  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header row */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2">
        <span
          id={labelId}
          className="text-xs font-medium uppercase tracking-wide text-slate-400"
        >
          {blockTypeLabel(block.type)}
        </span>

        <div className="flex items-center gap-1">
          {/* Language selector — code blocks only */}
          {block.type === 'code' && (
            <select
              value={block.language}
              onChange={(e) =>
                onChange({ ...block, language: e.target.value } as CodeBlock)
              }
              aria-label="Язык программирования"
              className="mr-2 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 focus:outline-none  focus:ring-blue-600"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label="Переместить блок вверх"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <IconUp />
          </button>

          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            aria-label="Переместить блок вниз"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <IconDown />
          </button>

          <button
            type="button"
            onClick={onDelete}
            aria-label="Удалить блок"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <IconTrash />
          </button>
        </div>
      </div>

      {/* Content */}
      {block.type === 'text' ? (
        <textarea
          aria-labelledby={labelId}
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder="Введите текст..."
          rows={4}
          className="w-full resize-y rounded-b-2xl bg-white px-4 py-3 text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none  focus:ring-inset focus:ring-blue-600"
        />
      ) : block.type === 'code' ? (
        <textarea
          aria-labelledby={labelId}
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          placeholder={`// Введите код на ${block.language}...`}
          rows={6}
          spellCheck={false}
          className="w-full resize-y rounded-b-2xl bg-[#F1F5F9] px-4 py-3 font-mono text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none  focus:ring-inset focus:ring-blue-600"
          style={{ fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace' }}
        />
      ) : (
        <div className="space-y-3 px-4 py-3">
          <input
            id={fileInputId}
            type="file"
            className="sr-only"
            aria-labelledby={labelId}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
              e.target.value = '';
            }}
          />

          {block.fileName ? (
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <IconFile />
              </span>
              <div className="min-w-0 flex-1">
                {block.fileUrl ? (
                  <a
                    href={block.fileUrl}
                    download={block.fileName}
                    className="truncate text-sm font-medium text-blue-600 hover:underline"
                  >
                    {block.fileName}
                  </a>
                ) : (
                  <p className="truncate text-sm font-medium text-slate-900">{block.fileName}</p>
                )}
                <p className="mt-0.5 text-sm text-slate-500">{formatFileSize(block.fileSize)}</p>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <label
                  htmlFor={fileInputId}
                  className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100"
                >
                  Заменить
                </label>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  Удалить
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor={fileInputId}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('border-blue-300', 'bg-blue-50/40');
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-blue-300', 'bg-blue-50/40');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-blue-300', 'bg-blue-50/40');
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileSelect(file);
              }}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition-colors hover:border-blue-300 hover:bg-blue-50/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                <IconFile />
              </span>
              <span className="mt-3 text-sm font-medium text-slate-700">
                Нажмите, чтобы выбрать файл
              </span>
              <span className="mt-1 text-sm text-slate-500">
                или перетащите его сюда
              </span>
            </label>
          )}

          <textarea
            aria-label="Описание файла"
            value={block.description ?? ''}
            onChange={(e) => onChange({ ...block, description: e.target.value })}
            placeholder="Необязательное описание файла..."
            rows={2}
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      )}
    </div>
  );
}

// ─── Add-block Button Strip ───────────────────────────────────────────────────

interface AddStripProps {
  onAddText: () => void;
  onAddCode: () => void;
  onAddFile: () => void;
}

function AddStrip({ onAddText, onAddCode, onAddFile }: AddStripProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="secondary" onClick={onAddText}>
        + Текстовый блок
      </Button>
      <Button type="button" variant="secondary" onClick={onAddCode}>
        + Кодовый блок
      </Button>
      <Button type="button" variant="secondary" onClick={onAddFile}>
        + Файловый блок
      </Button>
    </div>
  );
}

// ─── PostEditor ───────────────────────────────────────────────────────────────

export interface PostEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

export function PostEditor({ blocks, onChange }: PostEditorProps) {
  const addText = () =>
    onChange([...blocks, { id: genId(), type: 'text', content: '' }]);

  const addCode = () =>
    onChange([...blocks, { id: genId(), type: 'code', content: '', language: 'tsx' }]);

  const addFile = () =>
    onChange([...blocks, { id: genId(), type: 'file', fileName: '', fileSize: 0, fileUrl: '' }]);

  const update = (id: string, updated: Block) =>
    onChange(blocks.map((b) => (b.id === id ? updated : b)));

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...blocks];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const next = [...blocks];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  const remove = (id: string) => {
    const block = blocks.find((b) => b.id === id);
    if (block?.type === 'file' && block.fileUrl) {
      revokeFileUrl(block.fileUrl);
    }
    onChange(blocks.filter((b) => b.id !== id));
  };

  return (
    <div>
      {blocks.length > 0 ? (
        <div className="space-y-6">
          {blocks.map((block, index) => (
            <BlockCard
              key={block.id}
              block={block}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              onChange={(updated) => update(block.id, updated)}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
              onDelete={() => remove(block.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-400">
          Нет блоков. Добавьте текстовый, кодовый или файловый блок.
        </div>
      )}

      <div className="mt-6">
        <AddStrip onAddText={addText} onAddCode={addCode} onAddFile={addFile} />
      </div>
    </div>
  );
}
