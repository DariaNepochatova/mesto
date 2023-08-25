//попап с профилем
const popup = document.querySelector("#profile");
const editButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = popup.querySelector(".popup__close-button");

editButton.addEventListener("click", function() {
openPopup(popup)});
profilePopupCloseButton.addEventListener("click", function() {
closePopup(popup)});

//закрытие с помощью клика вне окна
function popupCloseOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

//зактытие с помощью Esc
function keyHandlerPopup(evt) {
  if (evt.key === 'Escape') {
  const currentOpenPopup = document.querySelector('.popup_opened');
  closePopup(currentOpenPopup)
  }
}

//попап с добавлением картинок
const popupPicture = document.querySelector("#picture");
const addPictureButton = document.querySelector(".profile__add-button");
const addPicturePopupCloseButton = popupPicture.querySelector(".popup__close-button");

addPictureButton.addEventListener("click", function() {
  openPopup(popupPicture)});
addPicturePopupCloseButton.addEventListener("click", function() { 
  closePopup(popupPicture)});

//функции для открытия и закрытия попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', keyHandlerPopup);
  //для закрытия через клик вне окна
  popupElement.addEventListener('mousedown', popupCloseOverlay)
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  //через Esc
  document.removeEventListener('keydown', keyHandlerPopup);
}

//находим форму для имени и работы
const profileFormElement = popup.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#job");
const addButton = popup.querySelector(".popup__form-button");

//находим форму для добавления карточки
const placePictureForm = popupPicture.querySelector(".popup__form");
const placeName = popupPicture.querySelector("#place-name");
const placeLink = popupPicture.querySelector("#place-link");
const placeAddButton = popupPicture.querySelector(".popup__form-button");

//валидация формы

//показывает ошибку и выделяет область красным
const showImputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__form-item_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error');
};

//убирает показ ошибки
const hideImputError = (formElement, inputElement) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__form-item_error');
  errorElement.classList.remove('popup__input-error');
  errorElement.textContent = '';
};

//проверка валидности формы
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showImputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideImputError(formElement, inputElement);
  }
};

//ищет все поля в форме
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-item'));

  const buttonElement = formElement.querySelector(".popup__form-button");

  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
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
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__form-button_inactive');
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__form-button_inactive');
    buttonElement.removeAttribute("disabled", "disabled");
  }
};

//ищет все формы на странице
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation(); 

//функция редактирования имени и работы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector(".profile__user-name");
  const job = document.querySelector(".profile__about-me");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}

//вызов функции по редактированию имени и работы и закрытие формы
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addButton.addEventListener("click", function() {
  closePopup(popup)});

//функция по добавлению карточки
function addPicForm(evt) {
  evt.preventDefault();
  const cardData = { name: placeName.value, link: placeLink.value };
  evt.target.reset();
  prependCardToGallery(cardData);
  placeAddButton.setAttribute("disabled", "disabled");
  placeAddButton.classList.add('popup__form-button_inactive');
}

//вызов функции по добавлени карточки и закрытие формы
placePictureForm.addEventListener("submit", addPicForm);
placeAddButton.addEventListener("click", function() {
  closePopup(popupPicture)});

//template
const galleryCardTemplate = document.querySelector("#cards").content;
const gallery = document.querySelector(".gallery__items");

//создание карточки
function createCardElement(cardData) {
  const card = galleryCardTemplate.querySelector(".gallery__item").cloneNode(true);
  card.querySelector(".gallery__image").src = cardData.link;
  card.querySelector(".gallery__image").alt = cardData.name;
  card.querySelector(".gallery__title").textContent = cardData.name;

  addListenersToCard(card, cardData);
  return card;
}

//добавление карточки в конец списка
function appendCardToGallery(cardData) {
  //создаем карточку
  const cardElement = createCardElement(cardData);

  //добавляем карточку в галерею
  gallery.append(cardElement);
}

//добавление карточки в начало списка
function prependCardToGallery(cardData) {
  //создаем карточку
  const cardElement = createCardElement(cardData);

  //добавляем карточку в галерею
  gallery.prepend(cardElement);
}

// функциональность карточек
function addListenersToCard(card, cardData) {
  //лайки
  card.querySelector(".gallery__like").addEventListener("click", function(event) {
      event.target.classList.toggle("gallery__like_active");
  });

  //удаление карточки
  card.querySelector(".gallery__button").addEventListener("click", function() {
      card.remove();
  });

  const picture = document.querySelector(".popup_picture");
  
  //открытие попапа с картинкой
  card.querySelector(".gallery__image-container").addEventListener("click", function() {
  picture.querySelector(".popup__image").src = cardData.link;
  picture.querySelector(".popup__image").alt = cardData.name;
  picture.querySelector(".popup__image-title").textContent = cardData.name;
  
  openPopup(picture)
});

  //закрытие попапа с картинкой
  picture.querySelector(".popup__close-button").addEventListener("click", function() {closePopup(picture)});
  //picture.querySelector(".popup__overlay").addEventListener("click", function() {closePopup(picture)});
}

//создание первоначального списка карточек
function renderInitialCards() {
  //для кадого эллемента массива
  initialCards.forEach((cardData) => {
      //создаем карточку
      appendCardToGallery(cardData);
  });
}

renderInitialCards();


//валидация формы

