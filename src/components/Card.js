export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesNumber = data.likes.length;
    this._ID = data._id;
    // this._meID = data.meID; -херня какая-то...
    this._ownerID = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._popupDelete = document.querySelector('.popup_type_delete-a-pic');
    this._popupDeleteButton = this._popupDelete.querySelector('.popup__form-button_delete-a-pic');
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".gallery__item").cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".gallery__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".gallery__title").textContent = this._name;
    this._likeButton = this._element.querySelector(".gallery__like");
    this._setEventListeners();
    this._element.querySelector(".gallery__like-number").textContent = this._likesNumber;
    this._removeCardButton();


    return this._element;
  }

  
  _setEventListeners() {
    this._element.querySelector(".gallery__button").addEventListener("click", (event) => {
      this._handleCardTrash(event);
    });
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._element.querySelector(".gallery__image-container").addEventListener("click", () => {
      this._handleImageClick(this._data, this._data);
    });
  }

  _handleCardTrash() {
    this._popupDelete.classList.add('popup_opened');
    this._popupDeleteButton.addEventListener("click", () => {
       this._element.remove();
       this._element = null;
       this._popupDelete.classList.remove('popup_opened');
    })
  
  }

  _handleCardLike() {
    this._likeButton.classList.toggle("gallery__like_active");
  }

  _removeCardButton () {
   

    if (this._ownerID === 'b3b1618cffa23779e344f468') { //вот тут типа надо, чтобы сам подгружался айдишник с профиля. НО Я ВООБЩЕ ХЗ КАК ЭТО СДЕЛАТЬ
      this._element.querySelector(".gallery__button").style.display = 'block'
    }
    else {
      this._element.querySelector(".gallery__button").style.display = 'none'
    }

  }

  
}
