export default class Popup {
constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
}

open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._keyHandlerPopup);
    this.setEventListeners();
  }

close() {
    this._popup.classList.remove("popup_opened");
    //через Esc
    document.removeEventListener('keydown', this._keyHandlerPopup);
  }

//функия закрытия попапа с помощью Esc
_keyHandlerPopup = (evt) => {
    if (evt.key === 'Escape') {
    this.close()
    }
  }

setEventListeners() {
    this._popup.addEventListener('mouseup', (event) => { // на каждый попап устанавливаем слушателя события
   const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
   if (targetClassList.contains('popup') || targetClassList.contains('popup__close-button')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
    this.close(); // если один из классов присутствует, то закрываем попап
   }
 })
}
}