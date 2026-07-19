import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { CodeBlock } from '../components/ui';
import { getPostById } from '../data/posts';
import { useAuth } from '../context/AuthContext';

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

export function PostPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : undefined;
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Header
          onNewPost={() => navigate('/posts/new')}
          userName={user?.name}
          onLogout={user ? logout : undefined}
          onProfileClick={() => {
            if (!user) navigate('/login');
          }}
        />
        <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
          <p className="text-slate-600">Пост не найден.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            ← На ленту
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header
        onNewPost={() => navigate('/posts/new')}
        userName={user?.name}
        onLogout={user ? logout : undefined}
        onProfileClick={() => {
          if (!user) navigate('/login');
        }}
      />
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <Link
          to="/"
          className="mb-6 inline-block text-sm text-slate-500 hover:text-blue-600 hover:underline"
        >
          ← На ленту
        </Link>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
                {post.title}
              </h1>
              {post.preview && (
                <p className="mt-2 text-slate-600 leading-relaxed">
                  {post.preview}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.viewsCount} {post.viewsCount === 1 ? 'просмотр' : post.viewsCount >= 2 && post.viewsCount <= 4 ? 'просмотра' : 'просмотров'}</span>
                <span>·</span>
                <span>
                  {post.likesCount} likes · {post.commentsCount} comments
                </span>
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => setIsLiked((v) => !v)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2 ${isLiked ? 'text-blue-600' : 'text-slate-500'}`}
                aria-label={isLiked ? 'Убрать лайк' : 'Лайк'}
              >
                <HeartIcon filled={isLiked} />
              </button>
              <button
                type="button"
                onClick={() => setIsFavorited((v) => !v)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 focus:outline-none  focus:ring-blue-600 focus:ring-offset-2 ${isFavorited ? 'text-blue-600' : 'text-slate-500'}`}
                aria-label={isFavorited ? 'Убрать из избранного' : 'В избранное'}
              >
                <StarIcon filled={isFavorited} />
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            {post.blocks.map((block) => {
              if (block.type === 'text') {
                return (
                  <p key={block.id} className="text-slate-700 leading-relaxed">
                    {block.content}
                  </p>
                );
              }

              if (block.type === 'file') {
                return (
                  <div
                    key={block.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        {block.fileUrl ? (
                          <a
                            href={block.fileUrl}
                            download={block.fileName}
                            className="text-sm font-medium text-blue-600 hover:underline"
                          >
                            {block.fileName}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-slate-900">{block.fileName}</p>
                        )}
                        <p className="mt-0.5 text-sm text-slate-500">
                          {block.fileSize >= 1024 * 1024
                            ? `${(block.fileSize / (1024 * 1024)).toFixed(1)} МБ`
                            : block.fileSize >= 1024
                              ? `${(block.fileSize / 1024).toFixed(1)} КБ`
                              : `${block.fileSize} Б`}
                        </p>
                        {block.description && (
                          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                            {block.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <CodeBlock
                  key={block.id}
                  code={block.content}
                  language={block.language}
                  title={block.title}
                  attachedFileName={block.attachedFileName}
                  attachedFileHref={block.attachedFileHref}
                />
              );
            })}
          </div>
        </article>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-label="Комментарии">
          <h2 className="text-lg font-semibold text-slate-900">Комментарии</h2>
          <p className="mt-2 text-sm text-slate-500">
            Пока комментариев нет.
          </p>
        </section>
      </main>
    </div>
  );
}
