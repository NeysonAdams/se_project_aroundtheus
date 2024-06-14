export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameLabel = document.querySelector(nameSelector);
    this._jobLabel = document.querySelector(jobSelector);
    this._avatarSRC = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameLabel.textContent,
      job: this._jobLabel.textContent,
      img: this._avatarSRC.src,
    };
  }
  setUserInfo(name, job) {
    this._nameLabel.textContent = name;
    this._jobLabel.textContent = job;
  }

  setAvatarLink(link) {
    this._avatarSRC.src = link;
  }
}
