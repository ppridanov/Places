import {listCard} from "../modules/script.js"
import renderLoadnig from  "../modules/script.js";
import initialCards from "../modules/initialcards.js";
import {connection, Api} from "../modules/api.js";
import ListCard from "../modules/listcard.js";
import Popup from "../modules/popup.js";
import Userinfo from "../modules/userinfo.js";
import Validate from "../modules/validate.js";
import {placeList} from "../modules/script.js";
connection.loadCards();
connection.render();
listCard.render();