import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { CodeBlock } from '../components/ui';
import { getPostById } from '../data/posts';

export function PostPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Header
          onNewPost={() => navigate('/posts/new')}
          onProfileClick={() => navigate('/login')}
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
        onProfileClick={() => navigate('/login')}
      />
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <Link
          to="/"
          className="mb-6 inline-block text-sm text-slate-500 hover:text-blue-600 hover:underline"
        >
          ← На ленту
        </Link>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
            {post.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>
              {post.likesCount} likes · {post.commentsCount} comments
            </span>
          </div>
          <div className="mt-6">
            <p className="text-slate-700 leading-relaxed">{post.body}</p>
          </div>
          {post.code && (
            <div className="mt-6">
              <CodeBlock code={post.code} />
            </div>
          )}
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
