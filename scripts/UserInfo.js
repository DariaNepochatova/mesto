export default class UserInfo {
    constructor(userNameSelector, userInfoSelector) {
this._userName = document.querySelector(userNameSelector);
this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userInfo.textContent
          };
    }

    setUserInfo({ name, job }) {
        this._userName.textContent = name;
        this._userInfo.textContent = job;
    }
}