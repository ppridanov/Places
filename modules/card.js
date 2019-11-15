import {placeList} from "./script.js"
import {connection} from "../modules/api.js"
export default class Card {
  constructor(name, link, id, ownerId) {
    this.cardContainer = this.create(name, link, id);
    this.cardContainer.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardContainer.querySelector('.place-card__delete-icon').addEventListener('click', (event) => {
      if (ownerId == myOwnerId) {
        this.remove(event)
      }
    })
    this.cardContainer.querySelector('.place-card__image').addEventListener('click', this.image);
    const myOwnerId = 'dd676ed20153929086e2fd3c';
    if (ownerId != myOwnerId) {
      const removeButton = this.cardContainer.querySelector('.place-card__delete-icon');
      removeButton.classList.remove('place-card__delete-icon');
      removeButton.classList.add('place-card__delete-icon_not-my');
    }
  }
  create(nameValue, linkValue, idValue) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('place-card');
    const templateCards = `
      <div class='place-card__container-image' _id='${idValue}'>
      <div class='place-card__image' style='background-image: url(${linkValue})'></div>
        <button class='place-card__delete-icon'></button>
      </div>
      <div class='place-card__description'>
        <h3 class='place-card__name'>${nameValue}</h3>
        <button class='place-card__like-icon'></button>
      </div>
    `;
    cardContainer.innerHTML = templateCards;
    return cardContainer; 
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  remove(event) {
    let confirmDelete = confirm('Вы уверены что хотите удалить файл?')
    if (confirmDelete) {
      let card = event.target.closest('.place-card__container-image');
      connection.deleteCard(card.getAttribute('_id'));
      placeList.removeChild(event.target.closest('.place-card'));
    }
  }
  image(event) {
    const bigImage = document.querySelector('.popup__big-image');
    const popupImageContainer = document.querySelector('.popup__image-container');
    const linkValue = event.target.getAttribute('style').slice(22, -1);
    const openImage = document.createElement("img");
    openImage.setAttribute('src', `${linkValue}`);
    openImage.classList.add('popup__image');
    const popupCloseButton = document.createElement('button');
    popupCloseButton.classList.add('popup__close');
    popupImageContainer.appendChild(openImage, popupCloseButton);
    bigImage.classList.add('popup_is-opened')
  }
}