class Api {
  constructor(options) {
    this._url = options.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json())
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(response)
  }

  async setUserInfo(data) {
    const response = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    return this._checkResponse(response)
  }

  async getItems() {
    const response = await fetch(`${this._url}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(response)
  }

  async setAvatar(data) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    return this._checkResponse(response)
  }

  async addCard(data) {
    const response = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    })
    return this._checkResponse(response)
  }

  async deleteCard(id) {
    const response = await fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(response)
  }

  async changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
        const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        return this._checkResponse(response)
    } else {
      const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      return this._checkResponse(response)
    }
  }
}

export const api = new Api({
  url: "http://localhost:3000",
  //url: "https://api.mesto.darlene.nomoredomainsicu.ru",
});