import  Card  from "./card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__input_error",
  formItemErrorClass: "popup__form-item_error",
};

const gallery = document.querySelector(".gallery__items");
const forms = document.querySelectorAll('.popup__form');
//попап с профилем
const popup = document.querySelector("#profile");
const editButton = document.querySelector(".profile__edit-button");
//попап с добавлением картинок
const popupPicture = document.querySelector("#picture");
const addPictureButton = document.querySelector(".profile__add-button");
//находим форму для имени и работы
const profileFormElement = popup.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#job");


//добавить фотку
const popupAddPicture = new PopupWithForm("#picture", (data) => {
  const cardData = { name: data["place-name"], link: data["place-link"] };
  addNewCard(cardData);
});

const openImage = new PopupWithImage('.popup_picture');
const userInfo = new UserInfo('.profile__user-name', '.profile__about-me');


//изменяем инфу о себе и имя
const popupUserInfo = new PopupWithForm('#profile', (data) => {
  userInfo.setUserInfo({ name: data.name, job: data.job })
})

//слушаетели событий открытия форм
editButton.addEventListener("click", function() {
  popupUserInfo.open();
  userInfo.getUserInfo();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
});

addPictureButton.addEventListener("click", function() {
  popupAddPicture.open();
});

//функция создания карточки
function createNewCard(data) {
  const card = new Card(data, '#cards',  openImage.open);
  return card.createCard();
}

// Создаем экземпляр класса Section
const section = new Section({
  items: initialCards, // массив данных для отрисовки
  renderer: (item) => {
      // Функция-колбэк для создания и отрисовки элемента
      const cardElement = createNewCard(item);
      section.addItem(cardElement); // Добавляем элемент в контейнер
  }
}, '.gallery__items');

// Вызываем метод отрисовки всех элементов
section.renderItems();

//Функция создания новой карточки
function addNewCard(cardData) {
  const cardElement = createNewCard(cardData);
  gallery.prepend(cardElement);
}

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