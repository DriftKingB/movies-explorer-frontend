import { apiConfig } from './constants';

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.json()
      .then(data => {
        return (res.ok) ? Promise.resolve(data) : Promise.reject({ data, res });
      });
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })
      .then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }
}

export default new Auth(apiConfig);
