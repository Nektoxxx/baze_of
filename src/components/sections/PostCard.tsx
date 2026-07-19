import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface PostCardProps {
  href: string;
  title: string;
  preview: string;
  author: string;
  date: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  className?: string;
}

function viewsLabel(n: number): string {
  if (n === 1) return 'просмотр';
  if (n >= 2 && n <= 4) return 'просмотра';
  return 'просмотров';
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function PostCard({
  href,
  title,
  preview,
  author,
  date,
  viewsCount,
  likesCount,
  commentsCount,
  className = '',
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div
      className={`flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 ${className}`.trim()}
    >
      <Link
        to={href}
        className="min-w-0 flex-1 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2 rounded-lg -m-1 p-1"
      >
        <h3 className="text-base font-semibold text-slate-900 line-clamp-1">
          {title}
        </h3>
        {preview && (
          <p className="mt-1 text-sm text-slate-600 line-clamp-2">{preview}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>
            {author}
            <span className="mx-1.5">·</span>
            {date}
            <span className="mx-1.5">·</span>
            {viewsCount} {viewsLabel(viewsCount)}
          </span>
          <span>
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
            <span className="mx-1.5">·</span>
            {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
          </span>
        </div>
      </Link>
      <div className="flex flex-shrink-0 flex-col items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked((v) => !v);
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2 ${isLiked ? 'text-blue-600' : 'text-slate-500'}`}
          aria-label={isLiked ? 'Убрать лайк' : 'Лайк'}
        >
          <HeartIcon filled={isLiked} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorited((v) => !v);
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2 ${isFavorited ? 'text-blue-600' : 'text-slate-500'}`}
          aria-label={isFavorited ? 'Убрать из избранного' : 'В избранное'}
        >
          <StarIcon filled={isFavorited} />
        </button>
      </div>
    </div>
  );
}
