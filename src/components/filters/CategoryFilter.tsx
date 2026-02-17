import { useMemo, useState } from 'react';
import type { Category } from '../../data/categories';
import { CATEGORIES } from '../../data/categories';

export interface CategoryFilterValue {
  categoryId: string | null;
  subcategoryId: string | null;
}

export interface CategoryFilterProps {
  /** Текущее значение (для контролируемого использования). Если не передано — компонент хранит состояние внутри. */
  value?: CategoryFilterValue;
  /** Колбэк при изменении категории или подкатегории */
  onChange?: (value: CategoryFilterValue) => void;
  /** Дополнительные классы для корневого контейнера */
  className?: string;
}

export function CategoryFilter({
  value,
  onChange,
  className = '',
}: CategoryFilterProps) {
  const [internalValue, setInternalValue] = useState<CategoryFilterValue>({
    categoryId: null,
    subcategoryId: null,
  });

  const current = value ?? internalValue;

  const selectedCategory: Category | undefined = useMemo(
    () => CATEGORIES.find((cat) => cat.id === current.categoryId),
    [current.categoryId]
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nextCategoryId = event.target.value || null;
    const nextValue: CategoryFilterValue = {
      categoryId: nextCategoryId,
      // при смене категории всегда сбрасываем подкатегорию
      subcategoryId: null,
    };

    if (!value) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nextSubcategoryId = event.target.value || null;
    const nextValue: CategoryFilterValue = {
      categoryId: current.categoryId,
      subcategoryId: nextSubcategoryId,
    };

    if (!value) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const rootClassName = [
    'flex flex-col gap-3 md:flex-row md:items-end',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <div className="w-full md:w-64">
        <label
          htmlFor="category-select"
          className="ui-input-label"
        >
          Категория
        </label>
        <select
          id="category-select"
          className="ui-input"
          value={current.categoryId ?? ''}
          onChange={handleCategoryChange}
          aria-label="Фильтр по категории"
        >
          <option value="">Все категории</option>
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-64">
        <label
          htmlFor="subcategory-select"
          className="ui-input-label"
        >
          Подкатегория
        </label>
        <select
          id="subcategory-select"
          className="ui-input"
          value={current.subcategoryId ?? ''}
          onChange={handleSubcategoryChange}
          aria-label="Фильтр по подкатегории"
          disabled={!current.categoryId}
        >
          <option value="">
            {current.categoryId ? 'Все подкатегории' : 'Сначала выберите категорию'}
          </option>
          {selectedCategory?.subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

