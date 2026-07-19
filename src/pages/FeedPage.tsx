import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { PostCard } from "../components/sections";
import { Button } from "../components/ui";
import { MOCK_POSTS } from "../data/posts";
import { CategoryFilter } from "../components/filters/CategoryFilter";
import type { CategoryFilterValue } from "../components/filters/CategoryFilter";
import {
  getStoredCategoryFilter,
  setStoredCategoryFilter,
} from "../lib/feedFilterPersistence";
import { useAuth } from "../context/AuthContext";

export type SortOption = "new" | "top";

function getInitialCategoryFilter(): CategoryFilterValue {
  if (typeof window === "undefined")
    return { categoryId: null, subcategoryId: null };
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("category") || null;
  if (fromUrl) {
    return { categoryId: fromUrl, subcategoryId: null };
  }
  const stored = getStoredCategoryFilter();
  return { categoryId: stored.categoryId, subcategoryId: null };
}

export function FeedPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sortBy, setSortBy] = useState<SortOption>("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterValue>(
    getInitialCategoryFilter
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const { categoryId } = categoryFilter;

    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }

    params.delete("subcategory");

    url.search = params.toString();
    const newUrl =
      url.pathname +
      (url.search ? `?${url.searchParams.toString()}` : "") +
      url.hash;

    window.history.replaceState({}, "", newUrl);
    setStoredCategoryFilter(categoryFilter);
  }, [categoryFilter]);

  const { categoryId } = categoryFilter;

  const filteredAndSortedPosts = useMemo(() => {
    let list = MOCK_POSTS.filter((post) => {
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.preview.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = !categoryId || post.categoryId === categoryId;
      return matchSearch && matchCategory;
    });

    if (sortBy === "new") {
      list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    } else {
      list = [...list].sort((a, b) => b.likesCount - a.likesCount);
    }

    return list;
  }, [sortBy, searchQuery, categoryFilter]);

  const mockTags = [
    { name: "javascript", count: "1,234" },
    { name: "react", count: "987" },
    { name: "nodejs", count: "756" },
    { name: "python", count: "2,143" },
    { name: "css", count: "654" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header
        searchPlaceholder="Поиск постов..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onNewPost={() => navigate("/posts/new")}
        userName={user?.name}
        onLogout={user ? logout : undefined}
        onProfileClick={() => {
          if (!user) navigate("/login");
        }}
      />

      <main className="mx-auto max-w-6xl py-6 md:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Блок слева: визуальная панель тегов (без логики) */}
          <aside
            className="flex-shrink-0 lg:w-80"
            aria-label="Панель тегов"
          >
            <section className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[var(--text)]">
                Filter by Tags
              </h2>

              <div className="mt-6 relative">
                <span
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  aria-hidden
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-white pl-12 pr-4 text-base text-[var(--text)] outline-none  focus:ring-[var(--primary)]"
                  placeholder="Search tags..."
                  aria-label="Поиск тегов"
                  readOnly
                />
              </div>

              <button
                type="button"
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xl font-medium text-[var(--primary)]"
              >
                <span aria-hidden className="text-2xl leading-none">+</span>
                <span>Create New Tag</span>
              </button>

              <ul className="mt-8 space-y-2" aria-label="Список тегов">
                {mockTags.map((tag) => (
                  <li key={tag.name}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base text-[var(--primary)]"
                    >
                      <span>{tag.name}</span>
                      <span className="text-[var(--muted)]">{tag.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* Лента постов */}
          <div className="min-w-0 flex-1">
            {/* Сортировка и категории */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <CategoryFilter
                value={categoryFilter}
                onChange={(next) =>
                  setCategoryFilter({
                    categoryId: next.categoryId,
                    subcategoryId: null,
                  })
                }
                enableSubcategory={false}
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--muted)]">Сортировка:</span>
                {(
                  [
                    ["new", "Новые"],
                    ["top", "Популярные"],
                  ] as const
                ).map(([value, label]) => (
                  <Button
                    key={value}
                    variant={sortBy === value ? "primary" : "ghost"}
                    onClick={() => setSortBy(value)}
                    type="button"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <ul
              className="mt-6 flex flex-col gap-6 md:mt-8 md:gap-3"
              aria-label="Лента постов"
            >
              {filteredAndSortedPosts.length === 0 ? (
                <li className="rounded-2xl border border-[var(--border)] bg-white py-16 text-center text-[var(--muted)]">
                  Нет постов по выбранным фильтрам.
                </li>
              ) : (
                filteredAndSortedPosts.map((post) => (
                  <li key={post.id}>
                    <PostCard
                      href={post.href}
                      title={post.title}
                      preview={post.preview}
                      author={post.author}
                      date={post.date}
                      viewsCount={post.viewsCount}
                      likesCount={post.likesCount}
                      commentsCount={post.commentsCount}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
