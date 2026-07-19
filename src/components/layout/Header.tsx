import { Button, Input } from '../ui';

export interface HeaderProps {
  /** Текст или ссылка логотипа */
  logo?: React.ReactNode;
  /** Placeholder поля поиска */
  searchPlaceholder?: string;
  /** Контролируемое значение поля поиска (при пустой строке фильтр сбрасывается) */
  searchValue?: string;
  /** Callback при изменении текста поиска (в т.ч. при очистке поля) */
  onSearchChange?: (value: string) => void;
  /** Callback по клику "New post" */
  onNewPost?: () => void;
  /** Callback по клику на иконку профиля */
  onProfileClick?: () => void;
  /** Имя авторизованного пользователя */
  userName?: string;
  /** Callback для выхода из аккаунта */
  onLogout?: () => void;
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

function TagIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2H2v10l9.3 9.3a1 1 0 0 0 1.4 0l8-8a1 1 0 0 0 0-1.4L12 2Z" />
      <circle cx="7" cy="7" r="1" />
    </svg>
  );
}

function HeartIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" />
    </svg>
  );
}

export function Header({
  logo,
  searchPlaceholder = 'Поиск...',
  searchValue = '',
  onSearchChange,
  onNewPost,
  onProfileClick,
  userName,
  onLogout,
  className = '',
}: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-10 border-b border-slate-200 bg-white py-3 px-4 md:px-6 ${className}`.trim()}
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:gap-4">
        {/* Логотип слева */}
        <div className="flex flex-shrink-0 items-center">
          {logo ?? (
            <a
              href="/"
              className="text-lg font-semibold text-slate-900 hover:text-blue-600 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2 rounded"
            >
              Крутой логотип
            </a>
          )}
        </div>

        {/* Поиск на всю ширину между логотипом и кнопками */}
        <div className="order-3 min-w-0 flex-1 md:order-2">
          <div className="relative">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              aria-label="Поиск постов"
              className="w-full pr-32"
              style={{ borderRadius: 8 }}
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--primary)] focus:outline-none  focus:ring-[var(--primary)]"
                aria-label="Теги"
              >
                <TagIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--primary)] focus:outline-none  focus:ring-[var(--primary)]"
                aria-label="Лайки"
              >
                <HeartIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--primary)] focus:outline-none  focus:ring-[var(--primary)]"
                aria-label="Избранное"
              >
                <StarIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* New post + профиль справа */}
        <div className="order-2 flex flex-shrink-0 items-center justify-end gap-2 md:order-3">
          <Button variant="primary" onClick={onNewPost}>
            Новый пост
          </Button>
          {userName && (
            <span className="hidden max-w-[8rem] truncate text-sm text-slate-600 md:inline">
              {userName}
            </span>
          )}
          {onLogout && (
            <Button type="button" variant="ghost" onClick={onLogout}>
              Выйти
            </Button>
          )}
          <button
            type="button"
            onClick={onProfileClick}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2"
            aria-label={userName ? `Профиль: ${userName}` : 'Профиль'}
          >
            <ProfileIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
