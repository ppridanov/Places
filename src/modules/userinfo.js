import {connection} from "../modules/api.js";
export default class Userinfo {
  constructor() {
    connection.render()
      .then((result) => {
      const name = result.name;
      const about = result.about;
      const avatar = result.avatar;
      this.render(name, about)
      this.renderAvatar(avatar)
    });
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
  renderAvatar(avatarValue) {
    const avatar = document.querySelector('.user-info__photo');
    avatar.setAttribute('style', `background-image: url(${avatarValue})`);
  }
}
  const userInfo = new Userinfo;


  