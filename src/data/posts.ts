export interface Post {
  id: string;
  href: string;
  title: string;
  preview: string;
  body: string;
  /** Опциональный фрагмент кода для CodeBlock */
  code?: string;
  /** Идентификатор категории (из CATEGORIES) */
  categoryId?: string;
  /** Идентификатор подкатегории (из CATEGORIES) */
  subcategoryId?: string;
  author: string;
  date: string;
  likesCount: number;
  commentsCount: number;
  createdAt: number;
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    href: '/posts/1',
    title: 'Как настроить Tailwind в Vite',
    preview: 'Краткая инструкция по установке и настройке Tailwind CSS в проекте на Vite.',
    body: 'Добавьте плагин Tailwind в конфиг Vite и импортируйте Tailwind в главный CSS-файл. После этого можно сразу использовать утилитарные классы в разметке.',
    code: 'npm install -D tailwindcss @tailwindcss/vite',
    categoryId: 'frontend',
    subcategoryId: 'react',
    author: 'Alex',
    date: '7 Feb 2025',
    likesCount: 24,
    commentsCount: 5,
    createdAt: 1,
  },
  {
    id: '2',
    href: '/posts/2',
    title: 'TypeScript: типы для компонентов React',
    preview: 'Правильные интерфейсы для props, ref и событий в функциональных компонентах.',
    body: 'Расширяйте встроенные типы через React.ComponentProps, чтобы не дублировать атрибуты. Для ref используйте дженерик HTMLButtonElement и forwardRef.',
    code: `interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, ...props }, ref) => <button ref={ref} {...props} />
);`,
    categoryId: 'frontend',
    subcategoryId: 'typescript-frontend',
    author: 'Maria',
    date: '6 Feb 2025',
    likesCount: 42,
    commentsCount: 12,
    createdAt: 2,
  },
  {
    id: '3',
    href: '/posts/3',
    title: 'Дизайн-система на CSS-переменных',
    preview: 'Один файл переменных для темы, акцента и отступов. Без препроцессоров.',
    body: 'Задайте переменные в :root и подключайте один globals.css. В компонентах обращайтесь к ним через var(). Так проще менять тему и держать отступы единообразными.',
    code: `:root {
  --primary: #2563EB;
  --text: #0F172A;
  --spacing: 0.5rem;
}
.button { color: var(--primary); padding: var(--spacing); }`,
    categoryId: 'frontend',
    subcategoryId: 'css',
    author: 'Alex',
    date: '5 Feb 2025',
    likesCount: 18,
    commentsCount: 3,
    createdAt: 3,
  },
  {
    id: '4',
    href: '/posts/4',
    title: 'React 19 и use()',
    preview: 'Новый хук use() для асинхронных ресурсов и контекста.',
    body: 'Хук use() читает промисы и контекст прямо в рендере. Не нужны useState и useEffect для загрузки — React сам приостанавливает компонент и показывает fallback.',
    code: `function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUser(userId));
  return <div>{user.name}</div>;
}`,
    categoryId: 'frontend',
    subcategoryId: 'react',
    author: 'Ivan',
    date: '4 Feb 2025',
    likesCount: 56,
    commentsCount: 22,
    createdAt: 4,
  },
  {
    id: '5',
    href: '/posts/5',
    title: 'Доступность форм: label и aria',
    preview: 'Как связать подписи с полями и сообщать об ошибках скринридерам.',
    body: 'Связывайте label с полем через htmlFor и id. Ошибки выводите с role="alert" и связывайте с полем через aria-describedby — так скринридеры зачитают подсказку при фокусе.',
    code: `<label htmlFor="email">Email</label>
<input id="email" aria-describedby="email-error" />
<span id="email-error" role="alert">{error}</span>`,
    categoryId: 'frontend',
    subcategoryId: 'testing-frontend',
    author: 'Maria',
    date: '3 Feb 2025',
    likesCount: 11,
    commentsCount: 4,
    createdAt: 5,
  },
  {
    id: '6',
    href: '/posts/6',
    title: 'OData: шаблон GET-запроса к справочнику',
    preview: 'Структура URL и параметры для выборки данных из 1С через OData.',
    body: 'URL состоит из домена, имени публикации, константы odata/standard.odata и имени каталога. Параметры $format и $select задают формат ответа и список полей. Используйте $filter для фильтрации.',
    code: `http://server_name.ru/ib_name/odata/standard.odata/Catalog_Контрагенты?$format=json&$select=Ref_Key,Description,DeletionMark,ИНН,КПП,Parent_Key`,
    categoryId: 'one-c',
    subcategoryId: 'one-c-integration',
    author: 'Maria',
    date: '2 Feb 2025',
    likesCount: 31,
    commentsCount: 8,
    createdAt: 6,
  },
  {
    id: '7',
    href: '/posts/7',
    title: '1С: запрос к справочнику с отбором',
    preview: 'Типичный запрос на выборку элементов справочника с условиями.',
    body: 'Используйте ВЫБРАТЬ для чтения данных. Связывайте таблицы через ЛЕВОЕ СОЕДИНЕНИЕ по Ссылка. Для отбора — ГДЕ с проверкой ПометкаУдаления и нужных реквизитов.',
    code: `ВЫБРАТЬ
  Контрагенты.Ссылка КАК Контрагент,
  Контрагенты.Наименование,
  Контрагенты.ИНН
ИЗ
  Справочник.Контрагенты КАК Контрагенты
ГДЕ
  НЕ Контрагенты.ПометкаУдаления
  И Контрагенты.Владелец = &Владелец`,
    categoryId: 'one-c',
    subcategoryId: 'one-c-config',
    author: 'Dmitry',
    date: '1 Feb 2025',
    likesCount: 28,
    commentsCount: 6,
    createdAt: 7,
  },
  {
    id: '8',
    href: '/posts/8',
    title: '1С: обход блокировок при массовой обработке',
    preview: 'Как избежать взаимоблокировок при пакетной обработке документов.',
    body: 'Используйте УстановитьБлокировку(Истина) перед циклом и СнятьБлокировку() после. Обрабатывайте элементы в порядке возрастания ссылки — это снижает риск deadlock. При ошибке не забывайте снять блокировку в обработчике исключения.',
    code: `УстановитьБлокировку(Истина);
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
    categoryId: 'one-c',
    subcategoryId: 'one-c-performance',
    author: 'Dmitry',
    date: '31 Jan 2025',
    likesCount: 19,
    commentsCount: 4,
    createdAt: 8,
  },
  {
    id: '9',
    href: '/posts/9',
    title: '1С: регистр сведений — запись и чтение',
    preview: 'Работа с регистром сведений в коде: запись остатков и срез последних.',
    body: 'Для записи используйте МенеджерЗаписи с установкой измерений, ресурсов и периода. Для среза последних — запрос к виртуальной таблице РегистрСведений.Имя.СрезПоследних с указанием даты среза.',
    code: `// Запись
МенеджерЗаписи = РегистрыСведений.ОстаткиТоваров.СоздатьМенеджерЗаписи();
МенеджерЗаписи.Период = ТекущаяДата();
МенеджерЗаписи.Склад = Склад;
МенеджерЗаписи.Номенклатура = Номенклатура;
МенеджерЗаписи.Количество = 100;
МенеджерЗаписи.Записать();`,
    categoryId: 'one-c',
    subcategoryId: 'one-c-config',
    author: 'Maria',
    date: '30 Jan 2025',
    likesCount: 22,
    commentsCount: 5,
    createdAt: 9,
  },
  {
    id: '10',
    href: '/posts/10',
    title: '1С: обработка печатной формы',
    preview: 'Внешняя обработка для печати: табличный документ, заполнение макета и вывод на печать или в файл.',
    body: 'Создайте внешнюю обработку с реквизитом типа ТабличныйДокумент. В модуле объекта реализуйте процедуру заполнения: получите данные запросом или из переданного объекта, обойдите макет табличного документа и заполните области. Для вывода используйте ТабличныйДокумент.Показать() или Записать(Поток, ТипФайла). Связь с документом — через параметр в команде открытия или через реквизит с типом ДокументСсылка.',
    code: `// В модуле обработки печатной формы
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
    categoryId: 'one-c',
    subcategoryId: 'one-c-config',
    author: 'Dmitry',
    date: '13 Feb 2025',
    likesCount: 0,
    commentsCount: 0,
    createdAt: 10,
  },
];

export function getPostById(id: string): Post | undefined {
  return MOCK_POSTS.find((p) => p.id === id);
}
