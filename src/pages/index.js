import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import Popup from "../components/Popup.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import { initialCards, configForm, forms, editButton, addPictureButton, nameInput, jobInput, avatarButton } from "../utils/constants.js";
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
    // console.log(item)
  })
}



    // Создаем экземпляр класса Section
    const cardsSection = new Section((item) => {
      const cardElement = createNewCard(item);
      cardsSection.addItemAppend(cardElement); // Добавляем элемент в контейнер
      // console.log(item)
    },
  
  ".gallery__items"
);

//вызвали в самом начале, чтобы при открытии страницы отобразилась инфа о пользователе с сервера
getProfileName()

  //тут мы загрузили изначальный массив карточек с сервера
  // api.getCard()
  // .then((item) => {

   




//создаем карточку через запрос на сервер
const popupAddPicture = new PopupWithForm("#picture", (data) => {

  Promise.all([api.getName(), api.addCard({name: data["place-name"], link:  data["place-link"]})])
  .then(([dataUser, dataCard]) => {
    dataCard.meID = dataUser._id;
    cardsSection.addItemPrepend(createNewCard(dataCard));
    // console.log(dataCard)
  })

  popupAddPicture.close();

});

//открываем попап для добавления карточки
addPictureButton.addEventListener("click", function () {
  popupAddPicture.open();
});
popupAddPicture.setEventListeners();



// Вызываем метод отрисовки всех элементов
// cardsSection.renderItems(item);
  // })

// //попап удаления карточки
// const popupDeletePicture = new Popup('.popup_type_delete-a-pic');
// popupDeletePicture.setEventListeners();

//попап смены аватара
const popupChangeAvatar = new Popup('.popup_type_change-avatar');
popupChangeAvatar.setEventListeners();

//открыли попап при клике на аватар
avatarButton.addEventListener("click", () => {
  PopupAvatar.open();
})

// api.changeAvatar({avatar: 'https://w.forfun.com/fetch/bc/bc0fbeedfbf7444454f68762c6160fd3.jpeg'})

const PopupAvatar = new PopupWithForm('.popup_type_change-avatar', (data) => {
  api.changeAvatar({avatar: data["avatar-link"]})
  .then(() => {
    getProfileName();
  })
  PopupAvatar.close()
})
PopupAvatar.setEventListeners()
// .then((item) => {
//   console.log(item);
// })

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

const popupDeleteCard = new PopupDeleteCard('.popup_type_delete-a-pic', ({card, cardID}) => {
  api.deleteCard(cardID)
  .then(() => {
    card.cardTrash();
    popupDeleteCard.close();
  })
})
popupDeleteCard.setEventListeners();



//функция создания карточки
function createNewCard(data) {
  const card = new Card(data, "#cards", imagePopup.open, popupDeleteCard.open);
  return card.createCard();
}

// //Функция создания новой карточки
// function addNewCard(cardData) {
//   cardsSection.addItem(createNewCard(cardData));
// }

//слушаетели событий открытия форм
//для профиля
editButton.addEventListener("click", editUserInfo);

//для картинки
// addPictureButton.addEventListener("click", function () {
//   popupAddPicture.open();
// });

// api.deleteCard('652bb9b3dd024310eba05e23')
// .then((item) => {
//   console.log(item)
// })

//валидация
forms.forEach((formElement) => {
  const formValidator = new FormValidator(configForm, formElement);
  formValidator.enableValidation();
});

Promise.all([api.getName(), api.getCard()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.meID = dataUser._id);
    // userInfo.setUserInfo({name: dataUser.name, job: dataUser.about, ava: dataUser.avatar});
    cardsSection.renderItems(dataCard)
    // console.log(dataCard)
 
  })
  .catch(error => console.error(`Ошибка при попытке загрузить карточки ${error}`))