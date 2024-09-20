export const periods = [
  { title: '3 дня', period: '3days' },
  { title: 'Неделя', period: 'week' },
  { title: 'Месяц', period: 'month' },
  { title: 'Год', period: 'year' },
];

export const types = [
  { title: 'Все типы', type: undefined },
  { title: 'Исходящие', type: 1 },
  { title: 'Входящие', type: 0 },
];

export const source = [
  'Rabota.ru',
  'Санкт-Петербург',
  'Google',
  'Yandex',
  'Санкт-Петербург',
  'Санкт-Петербург источник в три строки, кто-то так пишет, ну ладно, но некрасиво',
  undefined,
];

export type EvaluationType = 'Отлично' | 'Хорошо' | 'Плохо' | 'Скрипт не использован';

export const evaluation: EvaluationType[] = ['Отлично', 'Хорошо', 'Плохо', 'Скрипт не использован'];
