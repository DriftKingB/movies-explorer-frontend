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
  moviesApiError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  movieNotFound: 'Ничего не найдено'
}