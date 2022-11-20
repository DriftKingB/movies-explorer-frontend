import { apiConfig } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.json()
      .then(data => {
        return (res.ok) ? Promise.resolve(data) : Promise.reject(`Ошибка: ${data.message.toLowerCase()}`);
      });
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(movie),
    })
      .then(this._checkResponse);
  }

  removeMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  updateUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, email }),
    })
      .then(this._checkResponse);
  }
}

export default new Api(apiConfig);
