//попап с профилем
const popup = document.querySelector("#profile");
const editButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = popup.querySelector(".popup__close-button");

editButton.addEventListener("click", function() {
openPopup(popup)});
profilePopupCloseButton.addEventListener("click", function() {
closePopup(popup)});

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
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

//находим форму для имени и работы
const ProfileFormElement = popup.querySelector(".popup__form");
const nameInput = ProfileFormElement.querySelector("#name");
const jobInput = ProfileFormElement.querySelector("#job");
const addButton = popup.querySelector(".popup__form-button");

//функция редактирования имени и работы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector(".profile__user-name");
  const job = document.querySelector(".profile__about-me");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}

//вызов функции по редактированию имени и работы и закрытие формы
ProfileFormElement.addEventListener("submit", handleProfileFormSubmit);
addButton.addEventListener("click", function() {
  closePopup(popup)});

//находим форму для добавления карточки
const placePictureForm = popupPicture.querySelector(".popup__form");
const placeName = popupPicture.querySelector("#place-name");
const placeLink = popupPicture.querySelector("#place-link");
const placeAddButton = popupPicture.querySelector(".popup__form-button");

//функция по добавлению карточки
function addPicForm(evt) {
  evt.preventDefault();
  const cardData = { name: placeName.value, link: placeLink.value };
  evt.target.reset();
  prependCardToGallery(cardData);
}

//вызов функции по добавлени карточки и закрытие формы
placePictureForm.addEventListener("submit", addPicForm);
placeAddButton.addEventListener("click", function() {
  closePopup(popupPicture)});

//template
const galleryCards = document.querySelector("#cards").content;
const gallery = document.querySelector(".gallery__items");

//создание карточки
function createCardElement(cardData) {
  const card = galleryCards.querySelector(".gallery__item").cloneNode(true);
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
