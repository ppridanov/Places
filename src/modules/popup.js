import {validator} from "./validate.js";
export default class Popup {
  constructor() {
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup__close')) this.close(event);
    });
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('user-info_button')) {
        this.open(event);
      }
      if (event.target.classList.contains('user-info__add-button')) validator.checkPlaceForm;
      if (event.target.classList.contains('user-info__edit-button')) validator.checkEditForm;
    });
  }
  open(event) {
    this.target = event.target;
    const modalId = this.target.dataset.target;
    const modal = document.getElementById(modalId);
    validator.checkEditForm;
    validator.checkPlaceForm;
    modal.classList.add('popup_is-opened');
  }
  close(event) {
    this.target = event.target.parentNode.parentNode;
    this.target.classList.remove('popup_is-opened');
    if (this.target.classList.contains('popup__big-image')) {
      const popupImageContainer = document.querySelector('.popup__image-container');
      const popupImage = document.querySelector('.popup__image');
      popupImageContainer.removeChild(popupImage);
    }
  }
}
export const popup = new Popup;
  