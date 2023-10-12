import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import { initialCards, configForm, forms, editButton, addPictureButton, nameInput, jobInput } from "../utils/constants.js";
import "./index.css";

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-77",
  headers:
  {
    authorization: '9185553e-2b7e-47d6-a9e5-898091c4c546',
    'Content-Type': 'application/json'
  }
}

const api = new Api(apiConfig); 

// тут мы загрузили имя, работу и аватар пользователя с сервера
function getProfileName() {
  api.getName()
  .then((item) => {
    const userName = item.name;
    const userJob = item.about;
    const userAvatar = item.avatar;
    document.querySelector('.profile__user-name').textContent = userName;
    document.querySelector('.profile__about-me').textContent = userJob;
    document.querySelector('.profile__user-avatar').src = userAvatar;
  })
}

//вызвали в самом начале, чтобы при открытии страницы отобразилась инфа о пользователе с сервера
getProfileName()

  //тут мы загрузили изначальный массив карточек с сервера
  api.getCard()
  .then((items) => {

    // Создаем экземпляр класса Section
const cardsSection = new Section(
  {
    items: items, // массив данных для отрисовки
    renderer: (item) => {
      // Функция-колбэк для создания и отрисовки элемента
      const cardElement = createNewCard(item);
      cardsSection.addItem(cardElement); // Добавляем элемент в контейнер
    },
  },
  ".gallery__items"
);

const popupAddPicture = new PopupWithForm("#picture", (data) => {
  // const cardData = { name: data["place-name"], link: data["place-link"] };
  // addNewCard(cardData);
  // popupAddPicture.close();

  api.addCard({name: data["place-name"], link:  data["place-link"]})
  .then((item) => {
    console.log(item)
    createNewCard(item)
    cardsSection.addItem(createNewCard(item));
  })

  popupAddPicture.close();

});

addPictureButton.addEventListener("click", function () {
  popupAddPicture.open();
});
popupAddPicture.setEventListeners();



// Вызываем метод отрисовки всех элементов
cardsSection.renderItems();
  })



//добавить фотку
// const popupAddPicture = new PopupWithForm("#picture", (data) => {
//   const cardData = { name: data["place-name"], link: data["place-link"] };
//   addNewCard(cardData);
//   popupAddPicture.close();
// });
// popupAddPicture.setEventListeners();

const imagePopup = new PopupWithImage(".popup_picture");
imagePopup.setEventListeners();
const userInfo = new UserInfo(".profile__user-name", ".profile__about-me");

//изменяем инфу о себе и имя
const popupUserInfo = new PopupWithForm("#profile", (data) => {
  // userInfo.setUserInfo({ name: data.name, job: data.job });
  api.editProfileInfo({name: data.name, about: data.job})
  .then(() => {
    //вызвала еще раз, чтобы инфа в профиле сразу поменялась
    getProfileName()
  })
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
// addPictureButton.addEventListener("click", function () {
//   popupAddPicture.open();
// });


//валидация
forms.forEach((formElement) => {
  const formValidator = new FormValidator(configForm, formElement);
  formValidator.enableValidation();
});
