export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getRequest(endPoint, method = "GET") {
    return fetch(this._baseUrl + endPoint, {
      method: method,
      headers: this._headers,
    }).then(this._checkSuccessResponce);
  }

  _checkSuccessResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _requestWithBody(endPoint, body, method = "POST") {
    return fetch(this._baseUrl + endPoint, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then(this._checkSuccessResponce)
      .catch((err) => {
        console.log(err);
      });
  }

  getUserData() {
    return this._getRequest("/users/me");
  }

  editProfile(body) {
    return this._requestWithBody("/users/me", body, "PATCH");
  }

  editAvatar(body) {
    return this._requestWithBody("/users/me/avatar", body, "PATCH");
  }

  getInitialCards() {
    return this._getRequest("/cards");
  }

  addCard(body) {
    return this._requestWithBody("/cards", body);
  }

  like(isLike, cardId) {
    const method = isLike ? "DELETE" : "PUT";
    return this._getRequest(`/cards/${cardId}/likes`, method);
  }

  removeCard(cardId) {
    return this._getRequest(`/cards/${cardId}`, "DELETE");
  }
}
