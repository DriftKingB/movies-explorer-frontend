export const apiConfig = {
  baseUrl: 'https://api.removie.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const moviesBaseUrl = 'https://api.nomoreparties.co';

export const moviesApiConfig = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const customErrors = {
  namePatternValidation: 'Некорректный формат: имя может состоять только из букв латиницы и кириллицы, дефиса и пробела',
  emailPatternValidation: 'Некорректный формат электронной почты',
  moviesApiError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  movieNotFound: 'Ничего не найдено'
};

export const popupMessages = {
  cardLike: 'Фильм добавлен в избранные',
  cardDislike: 'Фильм удалён из избранных',
  profileEdit: 'Профиль сохранён',
  signout: 'Для выхода из аккаунта перейдите на страницу "Аккаунт"',
};

export const shortsMaxDuration = 40;

export const cardsRenderConfig = {
  windowMax: {
    width: 1280,
    cardLimit: 12,
    loadNumber: 3,
  },
  windowMedium: {
    width: 1058,
    cardLimit: 8,
    loadNumber: 2,
  },
  windowMin: {
    width: 622,
    cardLimit: 5,
    loadNumber: 2,
  },
};