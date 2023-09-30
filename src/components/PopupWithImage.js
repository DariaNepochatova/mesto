import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureImg = this._popup.querySelector(".popup__image");
    this._pictureTitle = this._popup.querySelector(".popup__image-title");
  }

  open = (data) => {
    this._pictureImg.src = data.link;
    this._pictureImg.alt = data.name;
    this._pictureTitle.textContent = data.name;
    super.open();
  };
}
