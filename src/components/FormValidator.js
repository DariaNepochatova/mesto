export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  //показывает ошибку и выделяет область красным
  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._config.formItemErrorClass);

    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.inputErrorClass);
  }

  //убирает показ ошибки
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._config.formItemErrorClass);
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent = "";
  }

  //проверка валидности формы
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //сделать кнопку активной
  _enableButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  //сделать кнопку неактивной
  _disableButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
    hasInvalidInput ? this._disableButton() : this._enableButton();
  }

  //ищет все поля в форме
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", () => {
      this._toggleButtonState();
    });

    this._formElement.addEventListener("reset", () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      this._disableButton();
    });

    this._setEventListeners();
    this._toggleButtonState();
  }
}
