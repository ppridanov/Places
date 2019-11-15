import {connection} from "../modules/api.js";
import {placeList} from "./script.js";
import {listCard} from "../modules/script.js";
import Card from "./card.js";
export default class ListCard {
    constructor(container) {
      this.container = container;
      this.arrayCard = [];
    }
    add(nameValue, linkValue) {
      connection.addNewCard(nameValue, linkValue)
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
      connection.loadCards()
        .then((cards) => {
            this.arrayCard = cards; 
            this.arrayCard.forEach(function(item) {
              const cardElement = new Card(item.name, item.link, item._id, item.owner._id, item.likes);
              placeList.appendChild(cardElement.cardContainer)
            })
        })
    }
    }

  