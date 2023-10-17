import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._formElement.querySelectorAll(".popup__form-item"));
    this._submitButton = this._popup.querySelector('.popup__form-button');
    this._submitButtonText = this._submitButton.textContent
  }

renderLoading(isLoading, loadingText='Сохранение...') {
  if (isLoading) {
    this._submitButton.textContent = loadingText;
  } else {
    this._submitButton.textContent = this._submitButtonText;
  }
}

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
