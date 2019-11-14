export default function  serverUrl() {
    const serverUrl = process.env.NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4'
    return serverUrl;
}
import './style.css'
import {listCard} from "../modules/script.js";
import renderLoadnig from  "../modules/script.js";
import initialCards from "../modules/initialcards.js";
import ListCard from "../modules/listcard.js";
import Popup from "../modules/popup.js";
import Userinfo from "../modules/userinfo.js";
import Validate from "../modules/validate.js";
import {placeList} from "../modules/script.js";
import {connection} from '../modules/api.js';

