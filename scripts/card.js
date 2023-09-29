export default class Card {
    constructor(data, templateSelector, handlerCardOpen) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handlerCardOpen = handlerCardOpen;
    } 

    _getTemplate() {
        return document 
        .querySelector(this._templateSelector)
        .content.querySelector('.gallery__item')
        .cloneNode(true);
    }

    createCard() {
        this._element = this._getTemplate();
        const cardImage = this._element.querySelector('.gallery__image');
        const buttonDeleteCard = this._element.querySelector('.gallery__button');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.gallery__title').textContent = this._name;
        this._setEventListener();

        return this._element;
    }

    _setEventListener() {
        this._element.querySelector('.gallery__button').addEventListener('click', (event) => {
          this._handleCardTrash(event);
        });
        this._element.querySelector('.gallery__like').addEventListener('click', (event) => {
          this._handleCardLike(event);
        });
        this._element.querySelector('.gallery__image-container').addEventListener('click', () => {
          this._handlerCardOpen(this._data, this._data);
        });
      }
    
      _handleCardTrash() {
        this._element.remove();
      }
    
      _handleCardLike(evt) {
        evt.target.classList.toggle("gallery__like_active");
      }
}