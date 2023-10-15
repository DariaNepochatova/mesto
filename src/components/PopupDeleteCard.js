import Popup from "./Popup";
export default class PopupDeleteCard extends Popup {
    constructor (popupSelector, submitFunction) {
super(popupSelector);
this._submitFunction = submitFunction;
this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitFunction({card: this._card, cardID: this._cardID});
        })
    }

    open = ({card, cardID}) => {
        super.open();
        this._card = card;
        this._cardID = cardID;
    }
}