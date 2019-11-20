class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    render() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .catch((err) => {
            console.log(err);
          })
    }
    loadCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET', 
            headers: this.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
              console.log(err)
          })     
    }
    editProfile(nameValue, aboutValue) {
        return fetch(`${this.baseUrl}/users/me`, {
           method: 'PATCH' ,
           headers: this.headers,
           body: JSON.stringify({
               name: nameValue,
               about: aboutValue
           })
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false);
            });
  
    }
    addNewCard(nameValue, linkValue) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST' ,
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
            })
         })
         .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
              console.log(err)
          })          
    }
    deleteCard(cardID) {
        fetch(`${this.baseUrl}/cards/${cardID}`,  {
            method: 'DELETE' ,
            headers: this.headers,  
         })
    }
}

const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort4',
    headers: {
      authorization: 'f2b2d9fc-5bcc-4fee-b5ce-de49f9685c7c',
      'Content-Type': 'application/json'
    }
   });


   /**
    * Здравствуйте
    * 
    * Непонятно, что это такой listCards.innerHTML = ''; и какую роль выполняет, это мой рендер был такой чтобы обновлять инфу через интервалы.
    * 
    * Всё то что должен делать класс  Api вы перенесли и разнесли по другим классам
    * а имеено проверку на данные, ошибку сети и так далее. Надо всё это вернуть в класс, вроде вернул. 
    * 
    * Удаление карточки методом   deleteCard(cardID) происходит независимо от того удалил ли пользователь или нет. сделал
    * 
    * вынести отдельно  'dd676ed20153929086e2fd3c' сделал
    * 
    * В методе function enableButton() и function disableButton() 
    * Можно сделать вот так   elem.setAttribute('disabled', false);  elem.setAttribute('disabled', true);
    * по сути объеденив setButton(isValidForm) = здесь немного не понятно
    * 
    * Лучше конечно если вы сделаете класс валидации, но не обязательно и такие методы как checkPlaceForm() будут вызываться как методы класса
    * 
    * Жду Ваши исправления
    * 
    * 
    */

/**
 * Удалите реализацию из конструктора класса API
 *   this.loadCards(document.querySelector('.places-list'))
     this.render();
 *  Вызывайте из других мест эти методы
 * 
 * Вы пытаетесь передать в метод класса loadCards параметр, а там он не принимается. 
 *    this.loadCards(document.querySelector('.places-list'))
 * Я думаю что этот метод не должен знать о карточках или о DOM
 * 
 * Надо исправить
 *  
 */

/**
 * Отлично, работа принята
 *  
 * @koras
 * 
 */