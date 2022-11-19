import { apiConfig } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.json()
      .then(data => {
        return (res.ok) ? Promise.resolve(data) : Promise.reject(`Ошибка ${res.status} - ${data.message}`);
      });
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        ...this._headers,
      },
    })
      .then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        ...this._headers,
      },
      body: JSON.stringify(movie),
    })
      .then(this._checkResponse);
  }

  removeMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        ...this._headers,
      },
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        ...this._headers,
      },
    })
      .then(this._checkResponse);
  }

  updateUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        ...this._headers,
      },
      body: JSON.stringify({ name, email }),
    })
      .then(this._checkResponse);
  }
}

export default new Api(apiConfig);
