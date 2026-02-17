import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const getVisiblePages = (): number[] => {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: number[] = [];
    let l: number | undefined;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }
    for (const i of range) {
      if (l !== undefined && i - l !== 1) rangeWithDots.push(-1);
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const pages = getVisiblePages();

  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`.trim()}
      aria-label="Пагинация"
    >
      <Button
        variant="secondary"
        onClick={() => prevPage !== null && onPageChange(prevPage)}
        disabled={prevPage === null}
        type="button"
      >
        Назад
      </Button>
      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === -1 ? (
            <span key={`ellipsis-${i}`} className="px-2 text-slate-400">
              …
            </span>
          ) : (
            <Button
              key={p}
              variant={p === currentPage ? 'primary' : 'ghost'}
              onClick={() => onPageChange(p)}
              type="button"
              aria-current={p === currentPage ? 'page' : undefined}
              aria-label={`Страница ${p}`}
            >
              {p}
            </Button>
          )
        )}
      </div>
      <Button
        variant="secondary"
        onClick={() => nextPage !== null && onPageChange(nextPage)}
        disabled={nextPage === null}
        type="button"
      >
        Вперёд
      </Button>
    </nav>
  );
}
