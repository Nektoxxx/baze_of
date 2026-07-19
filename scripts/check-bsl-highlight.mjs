/**
 * Проверка подсветки BSL: загружает highlighter и подсвечивает фрагмент 1С.
 * Запуск: node scripts/check-bsl-highlight.mjs
 */
import { createHighlighter } from 'shiki';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const grammarPath = join(__dirname, '../src/syntaxes/1c-bsl.tmLanguage.json');
const bslGrammar = JSON.parse(readFileSync(grammarPath, 'utf8'));

const snippet = `Процедура Пример(Параметр1, Параметр2) Экспорт
  Если Параметр1 = Истина Тогда
    Сообщить("Привет");
  КонецЕсли;
КонецПроцедуры`;

async function main() {
  console.log('Создание highlighter...');
  const highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: ['javascript'],
  });
  console.log('Загрузка грамматики BSL...');
  await highlighter.loadLanguage(bslGrammar);
  console.log('Подсветка фрагмента BSL...');
  const html = highlighter.codeToHtml(snippet, {
    lang: 'bsl',
    theme: 'github-light',
  });
  const hasSpans = /<span style="[^"]*color:[^"]*">/.test(html);
  const hasProcedura = html.includes('Процедура') || html.includes('Procedure');
  console.log(hasSpans ? '✓ HTML содержит подсвеченные span' : '✗ Нет span с цветом');
  console.log(hasProcedura ? '✓ Код сохранён в выводе' : '✗ Код потерян');
  console.log(html.length > 200 ? '✓ Вывод достаточной длины' : '✗ Вывод подозрительно короткий');
  if (!hasSpans || !hasProcedura) {
    console.log('\nФрагмент HTML:', html.slice(0, 500));
    process.exit(1);
  }
  console.log('\nПодсветка BSL работает.');
}

main().catch((err) => {
  console.error('Ошибка:', err);
  process.exit(1);
});
