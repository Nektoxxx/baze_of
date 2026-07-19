import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Button, Input } from '../components/ui';
import { AuthError, useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, user, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedConfirm = confirmPassword.trim();

    if (!name.trim() || !email.trim() || !password.trim() || !trimmedConfirm) {
      setError('Заполните все поля');
      return;
    }

    if (password.trim() !== trimmedConfirm) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      register(name, email, password);
      setError(null);
      navigate('/');
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
        return;
      }
      setError('Не удалось зарегистрироваться');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header
        searchPlaceholder="Поиск постов..."
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
          className="mb-4 inline-block text-sm text-slate-500 hover:text-blue-600 hover:underline"
        >
          ← На ленту
        </Link>

        <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Регистрация
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Создайте аккаунт, чтобы публиковать посты и сохранять избранное.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit}
            aria-label="Форма регистрации"
          >
            <Input
              label="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
            />
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Input
              type="password"
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Минимум 8 символов"
            />
            <Input
              type="password"
              label="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
            />

            {error && (
              <p className="ui-input-error" role="alert">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <Button type="submit" variant="primary">
                Зарегистрироваться
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/login')}
              >
                Уже есть аккаунт
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

