const placeList = document.querySelector('.places-list');
const listCard = new ListCard(placeList);
const placeCard = document.querySelectorAll('.place-card__image')
listCard.render();
const userInfo = new Userinfo;
const popup = new Popup;

function renderLoading(isLoading) {
  const popupButton = document.querySelector('.popup__button');
  if (isLoading) {
    popupButton.textContent = 'Загрузка...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}
api.loadCards();
api.render();
//Уважаемый ревьер, если вдруг есть какие то недочеты в моей работе, прошу указать их все сразу. В прошлый раз при 1 сдаче была одна ошибка а потом как оказалось надо было переделывать и совсем не одну ошибку. Заранее спасибо=)
