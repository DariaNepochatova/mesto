const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__input_error",
  formItemErrorClass: "popup__form-item_error",
};

const forms = document.querySelectorAll(".popup__form");
//попап с профилем
const popupProfile = document.querySelector("#profile");
const editButton = document.querySelector(".profile__edit-button");
//попап с добавлением картинок
const addPictureButton = document.querySelector(".profile__add-button");
//находим форму для имени и работы
const profileFormElement = popupProfile.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#job");

//кнопка для аватара

const avatarButton = document.querySelector('.profile__user-avatar-button');

export { initialCards, configForm, forms, editButton, addPictureButton, nameInput, jobInput, avatarButton };
