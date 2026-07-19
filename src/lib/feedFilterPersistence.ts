/**
 * Persistence for feed category filter (localStorage).
 * URL remains source of truth when on feed; localStorage restores selection when returning from other pages.
 */

const STORAGE_KEY = 'baze-feed-category-filter';

export interface StoredCategoryFilter {
  categoryId: string | null;
  subcategoryId: string | null;
}

const DEFAULT: StoredCategoryFilter = {
  categoryId: null,
  subcategoryId: null,
};

export function getStoredCategoryFilter(): StoredCategoryFilter {
  if (typeof window === 'undefined') return DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as StoredCategoryFilter;
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      (parsed.categoryId !== null && typeof parsed.categoryId !== 'string') ||
      (parsed.subcategoryId !== null && typeof parsed.subcategoryId !== 'string')
    ) {
      return DEFAULT;
    }
    return {
      categoryId: parsed.categoryId ?? null,
      subcategoryId: parsed.subcategoryId ?? null,
    };
  } catch {
    return DEFAULT;
  }
}

export function setStoredCategoryFilter(value: StoredCategoryFilter): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // ignore
  }
}
