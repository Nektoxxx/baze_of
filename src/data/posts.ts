import type { Block } from "../components/editor/PostEditor";

export interface Post {
  id: string;
  href: string;
  title: string;
  preview: string;
  /** Содержимое поста: массив текстовых и кодовых блоков */
  blocks: Block[];
  /** Идентификатор категории (из CATEGORIES) */
  categoryId?: string;
  /** Идентификатор подкатегории (из CATEGORIES) */
  subcategoryId?: string;
  author: string;
  date: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  createdAt: number;
}

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    href: "/posts/1",
    title: "Как настроить Tailwind в Vite",
    preview:
      "Краткая инструкция по установке и настройке Tailwind CSS в проекте на Vite.",
    blocks: [
      {
        id: "1-t",
        type: "text",
        content:
          "Добавьте плагин Tailwind в конфиг Vite и импортируйте Tailwind в главный CSS-файл. После этого можно сразу использовать утилитарные классы в разметке.",
      },
      {
        id: "1-c",
        type: "code",
        content: "npm install -D tailwindcss @tailwindcss/vite",
        language: "bash",
      },
      {
        id: "1-t",
        type: "text",
        content:
          "Добавьте плагин Tailwind в конфиг Vite и импортируйте Tailwind в главный CSS-файл. После этого можно сразу использовать утилитарные классы в разметке.",
      },
      {
        id: "1-c",
        type: "code",
        content: "npm install -D tailwindcss @tailwindcss/vite",
        language: "bash",
      },
    ],
    categoryId: "frontend",
    subcategoryId: "react",
    author: "Alex",
    date: "7 Feb 2025",
    viewsCount: 312,
    likesCount: 24,
    commentsCount: 5,
    createdAt: 1,
  },
  {
    id: "2",
    href: "/posts/2",
    title: "TypeScript: типы для компонентов React",
    preview:
      "Правильные интерфейсы для props, ref и событий в функциональных компонентах.",
    blocks: [
      {
        id: "2-t",
        type: "text",
        content:
          "Расширяйте встроенные типы через React.ComponentProps, чтобы не дублировать атрибуты. Для ref используйте дженерик HTMLButtonElement и forwardRef.",
      },
      {
        id: "2-c",
        type: "code",
        content: `interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, ...props }, ref) => <button ref={ref} {...props} />
);`,
        language: "tsx",
      },
    ],
    categoryId: "frontend",
    subcategoryId: "typescript-frontend",
    author: "Maria",
    date: "6 Feb 2025",
    viewsCount: 589,
    likesCount: 42,
    commentsCount: 12,
    createdAt: 2,
  },
  {
    id: "3",
    href: "/posts/3",
    title: "Дизайн-система на CSS-переменных",
    preview:
      "Один файл переменных для темы, акцента и отступов. Без препроцессоров.",
    blocks: [
      {
        id: "3-t",
        type: "text",
        content:
          "Задайте переменные в :root и подключайте один globals.css. В компонентах обращайтесь к ним через var(). Так проще менять тему и держать отступы единообразными.",
      },
      {
        id: "3-c",
        type: "code",
        content: `:root {
  --primary: #2563EB;
  --text: #0F172A;
  --spacing: 0.5rem;
}
.button { color: var(--primary); padding: var(--spacing); }`,
        language: "css",
      },
    ],
    categoryId: "frontend",
    subcategoryId: "css",
    author: "Alex",
    date: "5 Feb 2025",
    viewsCount: 156,
    likesCount: 18,
    commentsCount: 3,
    createdAt: 3,
  },
  {
    id: "4",
    href: "/posts/4",
    title: "React 19 и use()",
    preview: "Новый хук use() для асинхронных ресурсов и контекста.",
    blocks: [
      {
        id: "4-t",
        type: "text",
        content:
          "Хук use() читает промисы и контекст прямо в рендере. Не нужны useState и useEffect для загрузки — React сам приостанавливает компонент и показывает fallback.",
      },
      {
        id: "4-c",
        type: "code",
        content: `function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUser(userId));
  return <div>{user.name}</div>;
}`,
        language: "tsx",
      },
    ],
    categoryId: "frontend",
    subcategoryId: "react",
    author: "Ivan",
    date: "4 Feb 2025",
    viewsCount: 1204,
    likesCount: 56,
    commentsCount: 22,
    createdAt: 4,
  },
  {
    id: "5",
    href: "/posts/5",
    title: "Доступность форм: label и aria",
    preview: "Как связать подписи с полями и сообщать об ошибках скринридерам.",
    blocks: [
      {
        id: "5-t",
        type: "text",
        content:
          'Связывайте label с полем через htmlFor и id. Ошибки выводите с role="alert" и связывайте с полем через aria-describedby — так скринридеры зачитают подсказку при фокусе.',
      },
      {
        id: "5-c",
        type: "code",
        content: `<label htmlFor="email">Email</label>
<input id="email" aria-describedby="email-error" />
<span id="email-error" role="alert">{error}</span>`,
        language: "jsx",
      },
    ],
    categoryId: "frontend",
    subcategoryId: "testing-frontend",
    author: "Maria",
    date: "3 Feb 2025",
    viewsCount: 87,
    likesCount: 11,
    commentsCount: 4,
    createdAt: 5,
  },
  {
    id: "6",
    href: "/posts/6",
    title: "OData: шаблон GET-запроса к справочнику",
    preview: "Структура URL и параметры для выборки данных из 1С через OData.",
    blocks: [
      {
        id: "6-t",
        type: "text",
        content:
          "URL состоит из домена, имени публикации, константы odata/standard.odata и имени каталога. Параметры $format и $select задают формат ответа и список полей. Используйте $filter для фильтрации.",
      },
      {
        id: "6-c",
        type: "code",
        content:
          "http://server_name.ru/ib_name/odata/standard.odata/Catalog_Контрагенты?$format=json&$select=Ref_Key,Description,DeletionMark,ИНН,КПП,Parent_Key",
        language: "text",
      },
    ],
    categoryId: "one-c",
    subcategoryId: "one-c-integration",
    author: "Maria",
    date: "2 Feb 2025",
    viewsCount: 445,
    likesCount: 31,
    commentsCount: 8,
    createdAt: 6,
  },
  {
    id: "7",
    href: "/posts/7",
    title: "1С: запрос к справочнику с отбором",
    preview: "Типичный запрос на выборку элементов справочника с условиями.",
    blocks: [
      {
        id: "7-t",
        type: "text",
        content:
          "Используйте ВЫБРАТЬ для чтения данных. Связывайте таблицы через ЛЕВОЕ СОЕДИНЕНИЕ по Ссылка. Для отбора — ГДЕ с проверкой ПометкаУдаления и нужных реквизитов.",
      },
      {
        id: "7-c",
        type: "code",
        content: `вася = 7;
        
        ВЫБРАТЬ
  Контрагенты.Ссылка КАК Контрагент,
  Контрагенты.Наименование,
  Контрагенты.ИНН
ИЗ
  Справочник.Контрагенты КАК Контрагенты
ГДЕ
  НЕ Контрагенты.ПометкаУдаления
  И Контрагенты.Владелец = &Владелец`,
        language: "bsl",
        title: "Запрос 1С",
        attachedFileName: "ЗапросКонтрагенты.bsl",
        attachedFileHref: "#",
      },
    ],
    categoryId: "one-c",
    subcategoryId: "one-c-config",
    author: "Dmitry",
    date: "1 Feb 2025",
    viewsCount: 678,
    likesCount: 28,
    commentsCount: 6,
    createdAt: 7,
  },
  {
    id: "8",
    href: "/posts/8",
    title: "1С: обход блокировок при массовой обработке",
    preview: "Как избежать взаимоблокировок при пакетной обработке документов.",
    blocks: [
      {
        id: "8-t",
        type: "text",
        content:
          "Используйте УстановитьБлокировку(Истина) перед циклом и СнятьБлокировку() после. Обрабатывайте элементы в порядке возрастания ссылки — это снижает риск deadlock. При ошибке не забывайте снять блокировку в обработчике исключения.",
      },
      {
        id: "8-c",
        type: "code",
        content: `УстановитьБлокировку(Истина);
Попытка
  Для Каждого Док Из Документы Для Обработки Цикл
    ОбработатьДокумент(Док);
  КонецЦикла;
Исключение
  ЗаписатьВЖурналРегистрации(ОписаниеОшибки());
  СнятьБлокировку();
  ВызватьИсключение;
КонецПопытки;
СнятьБлокировку();`,
        language: "bsl",
      },
    ],
    categoryId: "one-c",
    subcategoryId: "one-c-performance",
    author: "Dmitry",
    date: "31 Jan 2025",
    viewsCount: 234,
    likesCount: 19,
    commentsCount: 4,
    createdAt: 8,
  },
  {
    id: "9",
    href: "/posts/9",
    title: "1С: регистр сведений — запись и чтение",
    preview:
      "Работа с регистром сведений в коде: запись остатков и срез последних.",
    blocks: [
      {
        id: "9-t",
        type: "text",
        content:
          "Для записи используйте МенеджерЗаписи с установкой измерений, ресурсов и периода. Для среза последних — запрос к виртуальной таблице РегистрСведений.Имя.СрезПоследних с указанием даты среза.",
      },
      {
        id: "9-c",
        type: "code",
        content: `// Запись
МенеджерЗаписи = РегистрыСведений.ОстаткиТоваров.СоздатьМенеджерЗаписи();
МенеджерЗаписи.Период = ТекущаяДата();
МенеджерЗаписи.Склад = Склад;
МенеджерЗаписи.Номенклатура = Номенклатура;
МенеджерЗаписи.Количество = 100;
МенеджерЗаписи.Записать();`,
        language: "bsl",
      },
    ],
    categoryId: "one-c",
    subcategoryId: "one-c-config",
    author: "Maria",
    date: "30 Jan 2025",
    viewsCount: 521,
    likesCount: 22,
    commentsCount: 5,
    createdAt: 9,
  },
  {
    id: "10",
    href: "/posts/10",
    title: "1С: обработка печатной формы",
    preview:
      "Внешняя обработка для печати: табличный документ, заполнение макета и вывод на печать или в файл.",
    blocks: [
      {
        id: "10-t",
        type: "text",
        content:
          "Создайте внешнюю обработку с реквизитом типа ТабличныйДокумент. В модуле объекта реализуйте процедуру заполнения: получите данные запросом или из переданного объекта, обойдите макет табличного документа и заполните области. Для вывода используйте ТабличныйДокумент.Показать() или Записать(Поток, ТипФайла). Связь с документом — через параметр в команде открытия или через реквизит с типом ДокументСсылка.",
      },
      {
        id: "10-c",
        type: "code",
        content: `// В модуле обработки печатной формы
Процедура ЗаполнитьПечатнуюФорму(ДокументСсылка) Экспорт
  Запрос = Новый Запрос;
  Запрос.Текст = "ВЫБРАТЬ Наименование, Количество, Сумма ИЗ Документ.РеализацияТоваров.Товары ГДЕ Ссылка = &Ссылка";
  Запрос.УстановитьПараметр("Ссылка", ДокументСсылка);
  Выборка = Запрос.Выполнить().Выбрать();
  
  ОбластьШапка = ТабличныйДокумент.ПолучитьОбласть("Шапка");
  ОбластьСтрока = ТабличныйДокумент.ПолучитьОбласть("Строка");
  
  Пока Выборка.Следующий() Цикл
    ОбластьСтрока.Параметры.Наименование = Выборка.Наименование;
    ОбластьСтрока.Параметры.Количество = Выборка.Количество;
    ОбластьСтрока.Параметры.Сумма = Выборка.Сумма;
    ТабличныйДокумент.Вывести(ОбластьСтрока);
  КонецЦикла;
  
  ТабличныйДокумент.Показать();
КонецПроцедуры`,
        language: "bsl",
      },
    ],
    categoryId: "one-c",
    subcategoryId: "one-c-config",
    author: "Dmitry",
    date: "13 Feb 2025",
    viewsCount: 45,
    likesCount: 0,
    commentsCount: 0,
    createdAt: 10,
  },
  {
    id: "11",
    href: "/posts/11",
    title: "React: кастомный хук useDebounce",
    preview: "Как написать хук для отложенного обновления значения с несколькими примерами использования.",
    blocks: [
      {
        id: "11-t1",
        type: "text",
        content:
          "Часто нужно «подтормаживать» обновление значения, например поискового запроса или фильтра, чтобы не дергать API на каждый символ. Для этого удобно вынести логику в хук useDebounce.",
      },
      {
        id: "11-c1",
        type: "code",
        content: `function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`,
        language: "typescript",
      },
      {
        id: "11-t2",
        type: "text",
        content:
          "В компоненте передаём в хук текущее значение и задержку в миллисекундах. Хук возвращает значение, которое обновится только после того, как пользователь перестанет вводить на заданное время.",
      },
      {
        id: "11-c2",
        type: "code",
        content: `function SearchForm() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) return;
    fetchResults(debouncedQuery).then(setResults);
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Поиск..."
    />
  );
}`,
        language: "tsx",
      },
      {
        id: "11-t3",
        type: "text",
        content:
          "Таким образом запрос на сервер уйдёт только когда пользователь сделает паузу 300 мс. Для фильтров и поиска обычно достаточно 200–400 мс.",
      },
    ],
    categoryId: "frontend",
    subcategoryId: "react",
    author: "Alex",
    date: "24 Feb 2025",
    viewsCount: 198,
    likesCount: 12,
    commentsCount: 3,
    createdAt: 11,
  },
  {
    id: "12",
    href: "/posts/12",
    title: "1С: обход табличной части и запись документа",
    preview: "Типичный сценарий: чтение данных из табличной части, расчёт и запись документа в коде 1С.",
    blocks: [
      {
        id: "12-t1",
        type: "text",
        content:
          "Часто в обработках или при программном создании документа нужно обойти табличную часть, выполнить расчёты и записать результат. Ниже — базовый пример для документа с табличной частью «Товары».",
      },
      {
        id: "12-c1",
        type: "code",
        content: `// Создаём документ и заполняем шапку
Док = Документы.РеализацияТоваровУслуг.СоздатьДокумент();
Док.Дата = ТекущаяДата();
Док.Контрагент = Справочники.Контрагенты.НайтиПоРеквизиту("ИНН", "7707123456", Истина);
Док.СуммаДокумента = 0;`,
        language: "bsl",
      },
      {
        id: "12-t2",
        type: "text",
        content:
          "Добавляем строки в табличную часть в цикле. Для каждой строки задаём номенклатуру, количество, цену и считаем сумму строки. Итог по документу удобно накапливать в переменной.",
      },
      {
        id: "12-c2",
        type: "code",
        content: `Для Каждого СтрокаИсходнойТаблицы Из ИсходныеДанные Цикл
  НоваяСтрока = Док.Товары.Добавить();
  НоваяСтрока.Номенклатура = СтрокаИсходнойТаблицы.Номенклатура;
  НоваяСтрока.Количество = СтрокаИсходнойТаблицы.Количество;
  НоваяСтрока.Цена = СтрокаИсходнойТаблицы.Цена;
  НоваяСтрока.Сумма = СтрокаИсходнойТаблицы.Количество * СтрокаИсходнойТаблицы.Цена;
  Док.СуммаДокумента = Док.СуммаДокумента + НоваяСтрока.Сумма;
КонецЦикла;`,
        language: "bsl",
      },
      {
        id: "12-t3",
        type: "text",
        content:
          "Перед записью имеет смысл вызвать проверку заполнения и проведение, если документ должен проводиться. Запись выполняем через Записать() с нужными параметрами.",
      },
      {
        id: "12-c3",
        type: "code",
        content: `Док.ЗаполнитьПроверкуЗаполнения(МассивОшибок);
Если МассивОшибок.Количество() > 0 Тогда
  Для Каждого ТекстОшибки Из МассивОшибок Цикл
    Сообщить(ТекстОшибки);
  КонецЦикла;
  Возврат;
КонецЕсли;

Док.Записать(РежимЗаписиДокумента.Проведение);`,
        language: "bsl",
      },
    ],
    categoryId: "one-c",
    subcategoryId: "one-c-config",
    author: "Dmitry",
    date: "24 Feb 2025",
    viewsCount: 76,
    likesCount: 8,
    commentsCount: 2,
    createdAt: 12,
  },
];

export function getPostById(id: string): Post | undefined {
  return MOCK_POSTS.find((p) => p.id === id);
}
