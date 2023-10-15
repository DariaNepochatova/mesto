const onError = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
    }
  }

export default class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl; //https://mesto.nomoreparties.co/v1/cohort-77
        this._headers = headers;
    }

    // /users/me инфа о себе с сервера
    getName() {
        return fetch(`${this._url}/users/me `, {
            headers: this._headers,
            method: 'GET',
          })

          .then((response) => onError(response))
    }

    // /cards массив карточек с сервера
    getCard() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'GET',
        })
        .then((response) => onError(response))
    }

    // /users/me с божьей помощью пытаемся поменять инфу в профиле
    editProfileInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name,
                about
              })
        })
        .then((response) => onError(response))
    }

 // /cards добавляем карточку
 addCard(data) {
  return fetch(`${this._url}/cards`, {
    headers: this._headers,
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then((response) => onError(response))
}

  // /users/me/avatar   меняем аватар
  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
          avatar: data.avatar
        })
  })
  .then((response) => onError(response))
  }


  // /cards/cardId удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId} `, {
      headers: this._headers,
      method: 'DELETE',
    })

    .then((response) => onError(response))
  }
}