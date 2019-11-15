const editForm = document.forms.edit;
const newForm = document.forms.new;
const submitButton = document.querySelectorAll('.popup__button');

const authorInput = document.querySelector('.popup__input_type_author');
const jobInput = document.querySelector('.popup__input_type_job');
const nameInput = document.querySelector('.popup__input_type_name');
const linkInput = document.querySelector('.popup__input_type_link');


const errorMessages = {
  isempty: 'Это обязательное поле',
  little: 'Должно быть от 2 до 30 символов  ',
  notlink: 'Здесь должна быть ссылка'
}

function handleValidate (event) {
  resetError(event.target);
}

function validate(element) {
  const errorElement = document.querySelector(`.error__${element.name}`);
  if (!element.checkValidity()) {
    errorElement.textContent = errorMessages.isempty;
    activateError(element);
    return false;
  } else if (!linkValidate(element)) {
    errorElement.textContent = errorMessages.notlink;
    activateError(element);
    return false;
  } 
  if (element.name != submitButton[0].name && element.name === nameInput.name) {
    if (element.value.length <= 1 || element.value.length >= 30) {
    errorElement.textContent = errorMessages.little;
    activateError(element);
    return false; 
  }
}
enableButton();
return true;
}

function linkValidate(element) {
  if (element.name != linkInput.name) {
    return true;
  }
  let linkValidateRes = element.value.match(/http/);
  if (linkValidateRes) {
    resetError(linkInput);
    return true;
  }
  return false;
}

function activateError(element) {
  element.parentNode.classList.add('popup__input-container_invalid');
}

function resetError(element) {
  element.parentNode.classList.remove('popup__input-container_invalid');
  element.textContent = '';
}

function enableButton() {
  submitButton.forEach(elem => {
    elem.classList.add('popup__save-button');
    elem.removeAttribute('disabled');
  });
}

function disableButton() {
  submitButton.forEach(elem => {
    elem.classList.remove('popup__save-button');
    elem.setAttribute('disabled', true);
  });
}

function checkPlaceForm() {
  let isValidForm = true; 
  const inputs1 = Array.from(newForm.elements);
  inputs1.forEach(elem => {
    if (!validate(elem)) {
        isValidForm = false;
      }
  });
  if (isValidForm) {
    enableButton();
    return true;
  }
  else {
    disableButton();
    return false;
  }
}

function checkEditForm() {
  let isValidForm = true;
  const inputs2 = Array.from(editForm.elements);
  inputs2.forEach(elem => {
    if (elem != submitButton) {
      if (!validate(elem)) {
        isValidForm = false;
      }
    }
  });
  if (isValidForm) {
    enableButton();
    return true;
  } else {
    disableButton();
    return false;
  }
}


function submitForm(event) {
  event.preventDefault();
  let checkFormClass = event.target.className;
  if (checkFormClass == newForm.className) {
    if (checkPlaceForm()) {
      listCard.add(newForm.elements.name.value, newForm.elements.link.value);
      popup.close(event);
    }
  } else {
    if (checkEditForm()) {
      renderLoading(true);
      api.editProfile(editForm.elements.author.value, editForm.elements.job.value)
        .then((result) => {
            popup.close(event)
        })
      userInfo.render(editForm.elements.author.value, editForm.elements.job.value);
        
    };
  }
}

document.forms.edit.addEventListener('submit', submitForm);
document.forms.new.addEventListener('submit', submitForm);

class Validate {
  constructor() {
    const editForm = document.forms.edit;
    const newForm = document.forms.new;
    const submitButton = document.querySelectorAll('.popup__button');   
    const authorInput = document.querySelector('.popup__input_type_author');
    const jobInput = document.querySelector('.popup__input_type_job');
    const nameInput = document.querySelector('.popup__input_type_name');
    const linkInput = document.querySelector('.popup__input_type_link');    
 
  }
  handleValidate (event) {
    this.resetError(event.target);
  }
  validate(element) { 
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
      } else if (!linkValidate(element)) {
        errorElement.textContent = errorMessages.notlink;
        this.activateError(element);
        return false;
      } 
      if (element.name != submitButton[0].name && element.name === nameInput.name) {
        if (element.value.length <= 1 || element.value.length >= 30) {
        errorElement.textContent = errorMessages.little;
        activateError(element);
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
  checkPlaceForm() {
    let isValidForm = true; 
    const inputs1 = Array.from(newForm.elements);
    inputs1.forEach(elem => {
      if (!validate(elem)) {
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
  
  checkEditForm() {
    let isValidForm = true;
    const inputs2 = Array.from(editForm.elements);
    inputs2.forEach(elem => {
      if (elem != submitButton) {
        if (!validate(elem)) {
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
    let checkFormClass = event.target.className;
    if (checkFormClass == newForm.className) {
      if (this.checkPlaceForm()) {
        listCard.add(newForm.elements.name.value, newForm.elements.link.value);
        popup.close(event);
      }
    } else {
      if (this.checkEditForm()) {
        renderLoading(true);
        api.editProfile(editForm.elements.author.value, editForm.elements.job.value)
          .then((result) => {
              popup.close(event)
          })
        userInfo.render(editForm.elements.author.value, editForm.elements.job.value);
          
      };
    }
  }
}
  authorInput.addEventListener('input', (event) => {
    handleValidate(event);
    checkEditForm();
  });
  jobInput.addEventListener('input', (event) => {
    handleValidate(event);
    checkEditForm();
  });
  nameInput.addEventListener('input', (event) => {
    handleValidate(event);
    checkPlaceForm();
  });
  linkInput.addEventListener('input', (event) => {
    handleValidate(event);
    checkPlaceForm();
  });
