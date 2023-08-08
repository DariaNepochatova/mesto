//открыть.закрыть попап с профилем
const popup = document.querySelector("#profile");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = popup.querySelector(".popup__close-button");

function editClick() {
  popup.classList.add("popup_opened");
}

function closeClick() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", editClick);
closeButton.addEventListener("click", closeClick);

//открыть/закрыть попап с добавлением картинок
const popupPicture = document.querySelector("#picture");
const addPictureButton = document.querySelector(".profile__add-button");
const closePictureButton = popupPicture.querySelector(".popup__close-button");

function addPictureClick() {
  popupPicture.classList.add("popup_opened");
}

function closePictureClick() {
  popupPicture.classList.remove("popup_opened");
}

addPictureButton.addEventListener("click", addPictureClick);
closePictureButton.addEventListener("click", closePictureClick);

//находим форму для имени и работы
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const addButton = document.querySelector(".popup__form-button");

//меняем имя и работу
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector(".profile__user-name");
  const job = document.querySelector(".profile__about-me");
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}

formElement.addEventListener("submit", handleFormSubmit);
addButton.addEventListener("click", closeClick);

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

const placePictureForm = popupPicture.querySelector(".popup__form");
const placeName = popupPicture.querySelector("#place-name");
const placeLink = popupPicture.querySelector("#place-link");
const placeAddButton = popupPicture.querySelector(".popup__form-button");

function addPicForm(evt) {
  evt.preventDefault();
  const cardData = { name: placeName.value, link: placeLink.value };
  initialCards.unshift(cardData);
  evt.target.reset();
  prependCardToGallery(cardData);
}
placePictureForm.addEventListener("submit", (event) => addPicForm(event));
placeAddButton.addEventListener("click", closePictureClick);

//template
const galleryCards = document.querySelector("#cards").content;
const gallery = document.querySelector(".gallery__items");
// template для открытия картинок
const image = document.querySelector("#popup-pic").content;
const body = document.querySelector(".body");

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

  //вылазит картинка попап
  const picture = image.querySelector(".popup_picture").cloneNode(true);
  card.querySelector(".gallery__image-container").addEventListener("click", function() {
      picture.querySelector(".popup__image").src = cardData.link;
      picture.querySelector(".popup__image").alt = cardData.name;
      picture.querySelector(".popup__image-title").textContent = cardData.name;
      body.append(picture);
  });

  //удаляется картинка попап
  picture.querySelector(".popup__close-button").addEventListener("click", function() {
      picture.remove();
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