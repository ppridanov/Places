class Card {
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
      api.deleteCard(card.getAttribute('_id'));
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

class ListCard {
  constructor(container) {
    this.container = container;
    this.arrayCard = [];
  }
  add(nameValue, linkValue) {
    api.addNewCard(nameValue, linkValue)
    .then((result) => {
        let name = result.name;
        let link = result.link;
        let id = result._id;
        const cardElement = new Card(name, link, id);
        this.arrayCard.push(cardElement);
        this.container.appendChild(cardElement.cardContainer);
    });
  }
  render() {
    placeList.innerHTML = '';
    api.loadCards()
      .then((cards) => {
          this.arrayCard = cards; 
          this.arrayCard.forEach(function(item) {
            const cardElement = new Card(item.name, item.link, item._id, item.owner._id);
            placeList.appendChild(cardElement.cardContainer)
          })
      })
  }
}


class Popup {
  constructor() {
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup__close')) this.close(event);
    });
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('user-info_button')) {
        this.open(event);
      }
      if (event.target.classList.contains('user-info__add-button')) checkPlaceForm();
      if (event.target.classList.contains('user-info__edit-button')) checkEditForm();
    });
  }
  open(event) {
    this.target = event.target;
    const modalId = this.target.dataset.target;
    const modal = document.getElementById(modalId);
    checkEditForm();
    checkPlaceForm();
    modal.classList.add('popup_is-opened');
  }
  close(event) {
    this.target = event.target.parentNode.parentNode;
    this.target.classList.remove('popup_is-opened');
    if (this.target.classList.contains('popup__big-image')) {
      const popupImageContainer = document.querySelector('.popup__image-container');
      const popupImage = document.querySelector('.popup__image')
      popupImageContainer.removeChild(popupImage);
    }
  
  }
}


class Userinfo {
  constructor() {
    api.render()
    .then((result) => {
      const name = result.name;
      const about = result.about;
      this.render(name, about)
    })
  }
  render(nameValue, aboutValue) {
    const profileForm1 = document.forms.edit;
    const author = profileForm1.elements.author;
    const job = profileForm1.elements.job;
    author.value = nameValue;
    job.value = aboutValue;
    const authorText = document.querySelector('.user-info__name');
    const jobText = document.querySelector('.user-info__job');
    authorText.textContent = nameValue;
    jobText.textContent = aboutValue;
  }
}
