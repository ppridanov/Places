import {renderLoading} from "./validate.js";
export class Api {
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
              console.log(err);
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
              console.log(err);
            })          
    }
    deleteCard(cardID) {
        fetch(`${this.baseUrl}/cards/${cardID}`,  {
            method: 'DELETE' ,
            headers: this.headers,  
        })
    }
    putLike(cardID) {
        return fetch(`${this.baseUrl}/cards/like/${cardID}`,  {
            method: 'PUT' ,
            headers: this.headers, 
        })
        .then((res) => {
            if (res.ok) {
                return res.json(); 
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })     
    }
    deleteLike(cardID) {
        return fetch(`${this.baseUrl}/cards/like/${cardID}`,  {
            method: 'DELETE' ,
            headers: this.headers, 
        })
        .then((res) => {
            if (res.ok) {
                return res.json(); 
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })  
    }
}
function serverUrl() {
    const serverUrl = process.env.NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4';
    return serverUrl;
}
console.log(serverUrl())
export const connection = new Api({
    baseUrl: serverUrl(),
    headers: {
      authorization: 'f2b2d9fc-5bcc-4fee-b5ce-de49f9685c7c',
      'Content-Type': 'application/json'
    }
});

connection.loadCards();
connection.render();

