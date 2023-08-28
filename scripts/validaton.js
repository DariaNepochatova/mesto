//показывает ошибку и выделяет область красным
const showInputError = (formElement, inputElement, errorMessage, config) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(config.formItemErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.inputErrorClass);
  };
  
  //убирает показ ошибки
  const hideInputError = (formElement, inputElement, config) => {
  
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove(config.formItemErrorClass);
    errorElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };
  
  //проверка валидности формы
  const isValid = (formElement, inputElemen, config) => {
    if (!inputElemen.validity.valid) {
      showInputError(formElement, inputElemen, inputElemen.validationMessage, config);
    }
    else {
      hideInputError(formElement, inputElemen, config);
    }
  };
  
  //ищет все поля в форме
  const setEventListeners = (formElement, config) => {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, config);
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, config)
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  }; 
  
  //проверяем, есть ли невалидные инпуты в формах
  const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }; 
  
  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  const toggleButtonState = (inputList, buttonElement, config) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      inactiveButton(buttonElement, config);
    } else {
      // иначе сделай кнопку активной
      activeButton(buttonElement, config);
    }
  };
  
  //сделат кнопку неактивной
  const inactiveButton = (element, config) => {
    element.classList.add(config.inactiveButtonClass);
    element.setAttribute("disabled", "disabled");
  }
  
  //сдлать кнопку активной
  const activeButton = (element, config) => {
    element.classList.remove(config.inactiveButtonClass);
    element.removeAttribute("disabled", "disabled");
  }
  //ищет все формы на странице
  const enableValidation = (config) => {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
      setEventListeners(formElement, config);
    });
  };

  const configForm = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-item",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_inactive",
    inputErrorClass: "popup__input_error",
    formItemErrorClass: "popup__form-item_error",
  };
  
  // Вызовем функцию
  enableValidation(configForm); 