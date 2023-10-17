export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl; //https://mesto.nomoreparties.co/v1/cohort-77
    this._headers = headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
    }
  }

  // /users/me инфа о себе с сервера
  getName() {
    return fetch(`${this._url}/users/me `, {
      headers: this._headers,
      method: "GET",
    }).then((response) => this._checkResponse(response));
  }

  // /cards массив карточек с сервера
  getCard() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => this._checkResponse(response));
  }

  // /users/me с божьей помощью пытаемся поменять инфу в профиле
  editProfileInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((response) => this._checkResponse(response));
  }

  // /cards добавляем карточку
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((response) => this._checkResponse(response));
  }

  // /users/me/avatar   меняем аватар
  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((response) => this._checkResponse(response));
  }

  // /cards/cardId удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId} `, {
      headers: this._headers,
      method: "DELETE",
    }).then((response) => this._checkResponse(response));
  }

  // /cards/{cardId}/likes поставить лайк
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      headers: this._headers,
      method: "PUT",
    }).then((response) => this._checkResponse(response));
  }

  // /cards/{cardId}/likes убрать лайк
  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      headers: this._headers,
      method: "DELETE",
    }).then((response) => this._checkResponse(response));
  }
}
