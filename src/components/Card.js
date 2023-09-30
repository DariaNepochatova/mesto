export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
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
    this._likeButton = this._element.querySelector('.gallery__like');
    this._setEventListeners();
    

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
    this._element.remove();
    this._element = null;
  }

  _handleCardLike() {
    this._likeButton.classList.toggle("gallery__like_active");
  }
}
