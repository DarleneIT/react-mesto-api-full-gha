class Api {
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
    if((method === "PATCH" || method === "POST") && data) {
      body = JSON.stringify(data);
    }
    return fetch(this._url + path, {
      method,
      headers: this._headers,
      body,
    })
    .then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`users/me`, "GET");
  }

  getItems() {
    return this._request(`cards`, "GET");
  }

  setUserInfo(data) {
    return this._request(`users/me`, "PATCH", data);
  }

  setAvatar(data) {
    return this._request(`users/me/avatar`, "PATCH", data);
  }

  addCard(data) {
    return this._request(`cards`, "POST", data);
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, "DELETE");
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`cards/${cardId}/likes`, "PUT");
    } else {
      return this._request(`cards/${cardId}/likes`, "DELETE");
    }
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-66/",
  headers: {
    authorization: "c9ca397d-f5a3-459e-b811-61b33e0fdb3e",
    "Content-Type": "application/json",
  },
});