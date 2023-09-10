class Auth {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(path, method, data) {
    let body = data;
    if ((method === "POST") && data) {
      body = JSON.stringify(data);
    }
    return fetch(this._url + path, {
      method,
      headers: this._headers,
      body,
    })
    .then(this._checkResponse);
  }

  register(data) {
    return this._request(`signup`, "POST", data);
  }

  login(data) {
    return this._request(`signin`, "POST", data);
  }

  checkToken(jwt) {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }
}

export const auth = new Auth({
  url: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});