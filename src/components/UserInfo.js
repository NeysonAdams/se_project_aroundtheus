export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameLabel = document.querySelector(nameSelector);
    this._jobLabel = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return {
      name: this._nameLabel.textContent,
      job: this._jobLabel.textContent,
    };
  }
  setUserInfo(name, job) {
    this._nameLabel.textContent = name;
    this._jobLabel.textContent = job;
  }
}
