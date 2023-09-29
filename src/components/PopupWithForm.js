import Popup from "./Popup.js";

 export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._formElement = this._popup.querySelector('.popup__form');
    }
  
    _getInputValues() {
      const inputValues = {};
      const inputs = Array.from(this._formElement.querySelectorAll('.popup__form-item'));
  
      inputs.forEach(input => {
        inputValues[input.name] = input.value;
      });
  
      return inputValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
  
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
      },
      {once: true}
      );
    }
  
    close() {
      super.close();
      this._formElement.reset();
    }
  }