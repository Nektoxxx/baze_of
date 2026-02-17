import { Button, Input } from '../ui';

export interface HeaderProps {
  /** Текст или ссылка логотипа */
  logo?: React.ReactNode;
  /** Placeholder поля поиска */
  searchPlaceholder?: string;
  /** Callback при отправке поиска (например Enter) */
  onSearch?: (value: string) => void;
  /** Callback по клику "New post" */
  onNewPost?: () => void;
  /** Callback по клику на иконку профиля */
  onProfileClick?: () => void;
  className?: string;
}

function ProfileIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="2.5" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
}

export function Header({
  logo,
  searchPlaceholder = 'Поиск...',
  onSearch,
  onNewPost,
  onProfileClick,
  className = '',
}: HeaderProps) {
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch((e.target as HTMLInputElement).value.trim());
    }
  };

  return (
    <header
      className={`border-b border-slate-200 bg-white py-3 px-4 md:px-6 ${className}`.trim()}
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:gap-4">
        {/* Логотип слева */}
        <div className="flex flex-shrink-0 items-center">
          {logo ?? (
            <a
              href="/"
              className="text-lg font-semibold text-slate-900 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
            >
              Крутой логотип
            </a>
          )}
        </div>

        {/* Поиск на всю ширину между логотипом и кнопками */}
        <div className="order-3 min-w-0 flex-1 md:order-2">
          <Input
            type="search"
            placeholder={searchPlaceholder}
            onKeyDown={handleSearchKeyDown}
            aria-label="Поиск постов"
            className="w-full"
            style={{ borderRadius: 8 }}
          />
        </div>

        {/* New post + профиль справа */}
        <div className="order-2 flex flex-shrink-0 items-center justify-end gap-2 md:order-3">
          <Button variant="primary" onClick={onNewPost}>
            Новый пост
          </Button>
          <button
            type="button"
            onClick={onProfileClick}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Профиль"
          >
            <ProfileIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
