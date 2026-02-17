import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { PostCard } from "../components/sections";
import { Button, Pagination } from "../components/ui";
import { MOCK_POSTS } from "../data/posts";
import { CategoryFilter } from "../components/filters/CategoryFilter";
import type { CategoryFilterValue } from "../components/filters/CategoryFilter";

export type SortOption = "new" | "top" | "discussed";

const POSTS_PER_PAGE = 4;

export function FeedPage() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<string | null>(null);

  // Инициализация фильтра из query-параметров
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get("category");
    const initialSubcategory = params.get("subcategory");
    setCategoryId(initialCategory || null);
    setSubcategoryId(initialSubcategory || null);
  }, []);

  // Синхронизация фильтра с URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }

    // если нет категории, подкатегория не имеет смысла
    if (subcategoryId && categoryId) {
      params.set("subcategory", subcategoryId);
    } else {
      params.delete("subcategory");
    }

    url.search = params.toString();
    const newUrl =
      url.pathname +
      (url.search ? `?${url.searchParams.toString()}` : "") +
      url.hash;

    window.history.replaceState({}, "", newUrl);
  }, [categoryId, subcategoryId]);

  const filteredAndSortedPosts = useMemo(() => {
    let list = MOCK_POSTS.filter((post) => {
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.preview.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = !categoryId || post.categoryId === categoryId;
      const matchSubcategory =
        !subcategoryId || post.subcategoryId === subcategoryId;

      return matchSearch && matchCategory && matchSubcategory;
    });

    if (sortBy === "new") {
      list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === "top") {
      list = [...list].sort((a, b) => b.likesCount - a.likesCount);
    } else {
      list = [...list].sort((a, b) => b.commentsCount - a.commentsCount);
    }

    return list;
  }, [sortBy, searchQuery, categoryId, subcategoryId]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = useMemo(
    () =>
      filteredAndSortedPosts.slice(
        (safePage - 1) * POSTS_PER_PAGE,
        safePage * POSTS_PER_PAGE,
      ),
    [filteredAndSortedPosts, safePage],
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header
        searchPlaceholder="Поиск постов..."
        onSearch={handleSearch}
        onNewPost={() => navigate("/posts/new")}
        onProfileClick={() => navigate("/login")}
      />

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        {/* Сортировка и категории */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <CategoryFilter
            value={{ categoryId, subcategoryId } as CategoryFilterValue}
            onChange={(next) => {
              setCategoryId(next.categoryId);
              setSubcategoryId(next.subcategoryId);
              setCurrentPage(1);
            }}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Сортировка:</span>
            {(
              [
                ["new", "Новые"],
                ["top", "Популярные"],
                ["discussed", "Обсуждаемые"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                variant={sortBy === value ? "primary" : "ghost"}
                onClick={() => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
                type="button"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Список постов */}
        <ul
          className="mt-6 flex flex-col gap-4 md:mt-8 md:gap-6"
          aria-label="Лента постов"
        >
          {paginatedPosts.length === 0 ? (
            <li className="rounded-2xl border border-slate-200 bg-white py-12 text-center text-sm text-slate-500">
              Нет постов по выбранным фильтрам.
            </li>
          ) : (
            paginatedPosts.map((post) => (
              <li key={post.id}>
                <PostCard
                  href={post.href}
                  title={post.title}
                  preview={post.preview}
                  author={post.author}
                  date={post.date}
                  likesCount={post.likesCount}
                  commentsCount={post.commentsCount}
                />
              </li>
            ))
          )}
        </ul>

        {/* Пагинация */}
        <div className="mt-8 md:mt-10">
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
