import {authorInput, jobInput, nameInput, linkInput, submitButton, validator, renderLoading, userInfo, popup, listCard} from "./script.js"
import {connection} from "./api.js"
export default class Validate {
  constructor() {
    let editForm = document.forms.edit;
    let newForm = document.forms.new;  

    authorInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkEditForm(editForm, submitButton);
    });
    jobInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkEditForm(editForm, submitButton);
    });
    nameInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkPlaceForm(newForm);
    });
    linkInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkPlaceForm(newForm);
    });
    editForm.addEventListener('submit', this.submitForm);
    newForm.addEventListener('submit', this.submitForm);
  }
  handleValidate (event) {
    this.resetError(event.target);
  }
  validate(element) { 
    let submitButton = document.querySelectorAll('.popup__button');
      const errorMessages = {
        isempty: 'Это обязательное поле',
        little: 'Должно быть от 2 до 30 символов',
        notlink: 'Здесь должна быть ссылка'
      }   
      const errorElement = document.querySelector(`.error__${element.name}`);
      if (!element.checkValidity()) {
        errorElement.textContent = errorMessages.isempty;
        this.activateError(element);
        return false;
      } else if (!this.linkValidate(element)) {
        errorElement.textContent = errorMessages.notlink;
        this.activateError(element);
        return false;
      } 
      if (element.name != submitButton[0].name && element.name === nameInput.name) {
        if (element.value.length <= 1 || element.value.length >= 30) {
        errorElement.textContent = errorMessages.little;
        this.activateError(element);
        return false; 
      }
    }
    this.enableButton();
    return true;
  }
  linkValidate(element) {
    if (element.name != linkInput.name) {
      return true;
    }
    let linkValidateRes = element.value.match(/http/);
    if (linkValidateRes) {
      this.resetError(linkInput);
      return true;
    }
    return false;
  }
  activateError(element) {
    element.parentNode.classList.add('popup__input-container_invalid');
  }
  resetError(element) {
    element.parentNode.classList.remove('popup__input-container_invalid');
    element.textContent = '';
  }
  enableButton() {
    submitButton.forEach(elem => {
      elem.classList.add('popup__save-button');
      elem.removeAttribute('disabled');
    });
  }
  disableButton() {
    submitButton.forEach(elem => {
      elem.classList.remove('popup__save-button');
      elem.setAttribute('disabled', true);
    });
  }
  checkPlaceForm(form) {
    let isValidForm = true; 
    console.log(form)
    const inputs1 = Array.from(form.elements);
    inputs1.forEach(elem => {
      if (!this.validate(elem)) {
          isValidForm = false;
        }
    });
    if (isValidForm) {
      this.enableButton();
      return true;
    }
    else {
      this.disableButton();
      return false;
    }
  }
  checkEditForm(form, button) {
    let isValidForm = true;
    const inputs2 = Array.from(form.elements);
    inputs2.forEach(elem => {
      if (elem != button) {
        if (!this.validate(elem)) {
          isValidForm = false;
        }
      }
    });
    if (isValidForm) {
      this.enableButton();
      return true;
    } else {
      this.disableButton();
      return false;
    }
  }
  submitForm(event) {
    event.preventDefault();
    let editForm = document.forms.edit;
    let newForm = document.forms.new; 
    let checkFormClass = event.target.className;
    if (checkFormClass == newForm.className) {
      if (validator.checkPlaceForm) {
        listCard.add(newForm.elements.name.value, newForm.elements.link.value);
        popup.close(event);
      }
    } else {
      if (validator.checkEditForm) {
        renderLoading(true);
        connection.editProfile(editForm.elements.author.value, editForm.elements.job.value)
          .then((result) => {
              popup.close(event)
          })
        userInfo.render(editForm.elements.author.value, editForm.elements.job.value)         
      };
    }
  }
}