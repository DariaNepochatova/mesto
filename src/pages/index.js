import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, configForm, forms, editButton, addPictureButton, nameInput, jobInput } from "../utils/constants.js";
import "./index.css";

//добавить фотку
const popupAddPicture = new PopupWithForm("#picture", (data) => {
  const cardData = { name: data["place-name"], link: data["place-link"] };
  addNewCard(cardData);
  popupAddPicture.close();
});
popupAddPicture.setEventListeners();

const imagePopup = new PopupWithImage(".popup_picture");
imagePopup.setEventListeners();
const userInfo = new UserInfo(".profile__user-name", ".profile__about-me");

//изменяем инфу о себе и имя
const popupUserInfo = new PopupWithForm("#profile", (data) => {
  userInfo.setUserInfo({ name: data.name, job: data.job });
  popupUserInfo.close();
});
popupUserInfo.setEventListeners();

//функция изменения инфы в профиле через попап
function editUserInfo() {
  popupUserInfo.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

//функция создания карточки
function createNewCard(data) {
  const card = new Card(data, "#cards", imagePopup.open);
  return card.createCard();
}

//Функция создания новой карточки
function addNewCard(cardData) {
  cardsSection.addItem(createNewCard(cardData));
}

//слушаетели событий открытия форм
//для профиля
editButton.addEventListener("click", editUserInfo);

//для картинки
addPictureButton.addEventListener("click", function () {
  popupAddPicture.open();
});

// Создаем экземпляр класса Section
const cardsSection = new Section(
  {
    items: initialCards, // массив данных для отрисовки
    renderer: (item) => {
      // Функция-колбэк для создания и отрисовки элемента
      const cardElement = createNewCard(item);
      cardsSection.addItem(cardElement); // Добавляем элемент в контейнер
    },
  },
  ".gallery__items"
);

// Вызываем метод отрисовки всех элементов
cardsSection.renderItems();

//валидация
forms.forEach((formElement) => {
  const formValidator = new FormValidator(configForm, formElement);
  formValidator.enableValidation();
});
