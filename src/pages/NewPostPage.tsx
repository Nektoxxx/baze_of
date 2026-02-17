import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Button, Input } from '../components/ui';
import { CategoryFilter } from '../components/filters/CategoryFilter';
import type { CategoryFilterValue } from '../components/filters/CategoryFilter';

export function NewPostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<string | null>(null);

  const [titleError, setTitleError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const hasTitleError = trimmedTitle.length === 0;
    const hasCategoryError = !categoryId || !subcategoryId;

    setTitleError(hasTitleError ? 'Введите заголовок поста' : null);
    setCategoryError(
      hasCategoryError ? 'Выберите категорию и подкатегорию' : null
    );

    if (hasTitleError || hasCategoryError) {
      return;
    }

    const payload = {
      title: trimmedTitle,
      preview: preview.trim(),
      body: body.trim(),
      categoryId,
      subcategoryId,
    };

    // Здесь в реальном приложении можно отправить payload на API.
    // Для демо просто выведем в консоль и вернёмся на ленту.
    console.log('Новый пост опубликован', payload);

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header
        searchPlaceholder="Поиск постов..."
        onNewPost={() => navigate('/posts/new')}
        onProfileClick={() => navigate('/login')}
      />

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <Link
          to="/"
          className="mb-4 inline-block text-sm text-slate-500 hover:text-blue-600 hover:underline"
        >
          ← На ленту
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Новый пост
          </h1>

          <form
            className="mt-6 space-y-4 md:space-y-6"
            onSubmit={handleSubmit}
            aria-label="Форма создания нового поста"
          >
            <Input
              label="Заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Как настроить Tailwind в Vite"
              error={titleError ?? undefined}
            />

            <Input
              label="Краткое описание"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              placeholder="Одно-два предложения, о чём пост"
            />

            <div>
              <label htmlFor="post-body" className="ui-input-label">
                Текст поста
              </label>
              <textarea
                id="post-body"
                className="ui-input min-h-[160px]"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Основной текст поста, можно с кодом и пояснениями"
              />
            </div>

            <div>
              <CategoryFilter
                value={{ categoryId, subcategoryId } as CategoryFilterValue}
                onChange={(next) => {
                  setCategoryId(next.categoryId);
                  setSubcategoryId(next.subcategoryId);
                }}
              />
              {categoryError && (
                <p className="ui-input-error mt-1" role="alert">
                  {categoryError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Отмена
              </Button>
              <Button type="submit" variant="primary">
                Сохранить пост
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

