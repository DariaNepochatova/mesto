let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function editClick() {
    popup.classList.add('popup_opened');
}

function closeClick() {
    popup.classList.remove('popup_opened');
    }

editButton.addEventListener('click', editClick); 
closeButton.addEventListener('click', closeClick); 

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');
let addButton = document.querySelector('.popup__form-button');

function handleFormSubmit (evt) {
    evt.preventDefault();
    let name = document.querySelector('.profile__user-name');
    let job = document.querySelector('.profile__about-me');
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

}

formElement.addEventListener('submit', handleFormSubmit); 
addButton.addEventListener('click', closeClick); 

