import { Link } from 'react-router-dom';

export interface PostCardProps {
  href: string;
  title: string;
  preview: string;
  author: string;
  date: string;
  likesCount: number;
  commentsCount: number;
  className?: string;
}

export function PostCard({
  href,
  title,
  preview,
  author,
  date,
  likesCount,
  commentsCount,
  className = '',
}: PostCardProps) {
  return (
    <Link
      to={href}
      className={`block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${className}`.trim()}
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
        </span>
        <span>
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          <span className="mx-1.5">·</span>
          {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
        </span>
      </div>
    </Link>
  );
}
