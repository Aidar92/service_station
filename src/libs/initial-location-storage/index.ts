/*
  При переходе в приложение, пользователь может зайти со ссылкой вида
  app.domain/app/some-route?someParam=123
  То есть пользователь изначально хочет попасть на какую-то страницу,
  возможно с определенными параметрами.
  В случае если пользователь не авторизован, произойдет редирект на страницу
  авторизации.
  После того как пользователь войдет в систему, нужно перевести его на страницу,
  куда он изначально хотел зайти.
  Данный функционал реализовывает хранение изначально указанного адреса.
  Используется в:
  1. Корневом файле приложения - сохраняет изначальный адрес
  2. Странице авторизации - получает изначальный адрес
  3. Контексте авторизации - очищает изначальный адрес
*/

const STORAGE_KEY = 'initialLocation';

const store = (): void => {
  const { pathname, search } = document.location;
  if (pathname === '/' || pathname === '/auth') {
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, `${pathname}${search}`);
};

const get = (): string | null => {
  return sessionStorage.getItem(STORAGE_KEY);
};

const remove = (): void => {
  sessionStorage.removeItem(STORAGE_KEY);
};

export const initialLocationStorage = { get, store, remove };
