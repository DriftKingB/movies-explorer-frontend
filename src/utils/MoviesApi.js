import { moviesApiConfig, customErrors } from './constants';

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.json()
      .then(data => {
        return (res.ok) ? Promise.resolve(data) : Promise.reject({ data: customErrors.moviesApiError });
      });
  }

  getMovies() {
    return fetch(`${this._baseUrl}/`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
}

export default new MoviesApi(moviesApiConfig);
