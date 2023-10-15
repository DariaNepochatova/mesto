
export default class Card {
  constructor(data, templateSelector, handleImageClick, openDeletePopup) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesNumber = data.likes.length;
    this._ID = data._id;
    this._meID = data.meID; 
    this._ownerID = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._openDeletePopup = openDeletePopup;
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
    this._showCardButton();


    return this._element;
  }

  
  _setEventListeners() {
    this._element.querySelector(".gallery__button").addEventListener("click", () => {
      this._handleCardTrash();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._element.querySelector(".gallery__image-container").addEventListener("click", () => {
      this._handleImageClick(this._data, this._data);
    });
  }

  _handleCardTrash() {
       this._openDeletePopup({card: this, cardID: this._ID})
  }

  cardTrash() {
    this._element.remove();
    this._element = null;
}

  _handleCardLike() {
    this._likeButton.classList.toggle("gallery__like_active");
  }

  _showCardButton () {
    if (this._ownerID === this._meID) { //вот тут типа надо, чтобы сам подгружался айдишник с профиля. НО Я ВООБЩЕ ХЗ КАК ЭТО СДЕЛАТЬ
      this._element.querySelector(".gallery__button").style.display = 'block'
    }
    else {
      this._element.querySelector(".gallery__button").style.display = 'none'
    }

  }


  
}
