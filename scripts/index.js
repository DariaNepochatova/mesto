import  Card  from "./card.js";
import FormValidator from "./FormValidator.js";

const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__input_error",
  formItemErrorClass: "popup__form-item_error",
};

const gallery = document.querySelector(".gallery__items");
const picture = document.querySelector(".popup_picture");
const pictureImg = picture.querySelector(".popup__image");
const pictureTitle = picture.querySelector(".popup__image-title");
const forms = document.querySelectorAll('.popup__form');
//попап с профилем
const popup = document.querySelector("#profile");
const editButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = popup.querySelector(".popup__close-button");
//попап с добавлением картинок
const popupPicture = document.querySelector("#picture");
const addPictureButton = document.querySelector(".profile__add-button");
const addPicturePopupCloseButton = popupPicture.querySelector(".popup__close-button");
//находим форму для имени и работы
const profileFormElement = popup.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#job");
const addButton = popup.querySelector(".popup__form-button");
const name = document.querySelector(".profile__user-name");
const job = document.querySelector(".profile__about-me");
//находим форму для добавления карточки
const placePictureForm = popupPicture.querySelector(".popup__form");
const placeName = popupPicture.querySelector("#place-name");
const placeLink = popupPicture.querySelector("#place-link");
const placeAddButton = popupPicture.querySelector(".popup__form-button");

//функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', keyHandlerPopup);
}

//функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  //через Esc
  document.removeEventListener('keydown', keyHandlerPopup);
}

//функия закрытия попапа через клик вне окна
const popupList = Array.from(document.querySelectorAll('.popup')); // найдем все попапы на странице

popupList.forEach((popup) => { // итерируем массив. объявляя каждый попап в переменную popup
 popup.addEventListener('mouseup', (event) => { // на каждый попап устанавливаем слушателя события
   const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
   if (targetClassList.contains('popup') || targetClassList.contains('popup__close-button')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
     closePopup(popup); // если один из классов присутствует, то закрываем попап
   }
 })
});

//функия закрытия попапа с помощью Esc
function keyHandlerPopup(evt) {
  if (evt.key === 'Escape') {
  const currentOpenPopup = document.querySelector('.popup_opened');
  closePopup(currentOpenPopup)
  }
}

//слушаетели событий открытия форм
editButton.addEventListener("click", function() {
  openPopup(popup)});

addPictureButton.addEventListener("click", function() {
  openPopup(popupPicture)});

//функция создания карточки
function createNewCard(data) {
  const card = new Card(data, '#cards', handleOpenPopup);
  return card.createCard();
}

//создать 6 карточек из массива
initialCards.forEach((item) => {
  const cardElement = createNewCard(item);
  gallery.append(cardElement);
}); 

//Функция создания новой карточки
function addNewCard(cardData) {
  const cardElement = createNewCard(cardData);
  gallery.prepend(cardElement);
}

//функция открытия изображения в полном размере
function handleOpenPopup(imgSrc, imgCaption) {
  pictureImg.src = imgSrc;
  pictureImg.alt = imgCaption;
  pictureTitle.textContent = imgCaption;
  openPopup(picture)
}

//функция редактирования имени и работы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
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
  addNewCard(cardData);
}

//вызов функции по добавлени карточки и закрытие формы
placePictureForm.addEventListener("submit", addPicForm);
placeAddButton.addEventListener("click", function() {
  closePopup(popupPicture)});


//валидация
  forms.forEach((formElement) => {
    const formValidator = new FormValidator(configForm, formElement);
    formValidator.enableValidation();
  
    if (formElement.id === 'profile') {
      formElement.addEventListener('submit', handleFormSubmitEditPopup);
    } else if (formElement.id === 'add-picture') {
      formElement.addEventListener('submit', handleFormSubmitAddPopup);
    }
  });