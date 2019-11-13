import ListCard from "./listcard.js";
import Userinfo from "./userinfo.js";
import Popup from "./popup.js";
import Validate from "./validate.js";
export default function renderLoading(isLoading) {
  const popupButton = document.querySelector('.popup__button');
  if (isLoading) {
    popupButton.textContent = 'Загрузка...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}

const placeList = document.querySelector('.places-list');
const placeCard = document.querySelectorAll('.place-card__image')
const authorInput = document.querySelector('.popup__input_type_author');
const jobInput = document.querySelector('.popup__input_type_job');
const nameInput = document.querySelector('.popup__input_type_name');
const linkInput = document.querySelector('.popup__input_type_link');
const submitButton = document.querySelectorAll('.popup__button');
const listCard = new ListCard(placeList);
const userInfo = new Userinfo;
const popup = new Popup;
const validator = new Validate;

export {placeList, placeCard, authorInput, jobInput, nameInput, linkInput, submitButton, listCard, userInfo, popup, validator, renderLoading}
