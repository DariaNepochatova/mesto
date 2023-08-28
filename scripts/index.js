//попап с профилем
const popup = document.querySelector("#profile");
const editButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = popup.querySelector(".popup__close-button");

editButton.addEventListener("click", function() {
openPopup(popup)});

//попап с добавлением картинок
const popupPicture = document.querySelector("#picture");
const addPictureButton = document.querySelector(".profile__add-button");
const addPicturePopupCloseButton = popupPicture.querySelector(".popup__close-button");

addPictureButton.addEventListener("click", function() {
  openPopup(popupPicture)});

//функции для открытия и закрытия попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', keyHandlerPopup);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  //через Esc
  document.removeEventListener('keydown', keyHandlerPopup);
}
  
//для закрытия через клик вне окна
 const popupList = Array.from(document.querySelectorAll('.popup')); // найдем все попапы на странице

 popupList.forEach((popup) => { // итерируем массив. объявляя каждый попап в переменную popup
  popup.addEventListener('mouseup', (event) => { // на каждый попап устанавливаем слушателя события
    const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-button')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
      closePopup(popup); // если один из классов присутствует, то закрываем попап
    }
  })
})

//зактытие с помощью Esc
function keyHandlerPopup(evt) {
  if (evt.key === 'Escape') {
  const currentOpenPopup = document.querySelector('.popup_opened');
  closePopup(currentOpenPopup)
  }
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

//валидация формы (validation.js)

const name = document.querySelector(".profile__user-name");
const job = document.querySelector(".profile__about-me");

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
  prependCardToGallery(cardData);
  inactiveButton(placeAddButton, configForm);
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

const picture = document.querySelector(".popup_picture");
const pictureImg = picture.querySelector(".popup__image");
const pictureTitle = picture.querySelector(".popup__image-title");

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
  
  //открытие попапа с картинкой
  card.querySelector(".gallery__image-container").addEventListener("click", function() {
  pictureImg.src = cardData.link;
  pictureImg.alt = cardData.name;
  pictureTitle.textContent = cardData.name;
  
  openPopup(picture)
});
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

