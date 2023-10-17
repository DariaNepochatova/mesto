export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector) { 
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userInfo.textContent,
    };
  }

  setUserInfo(user) {
    this._userName.textContent = user.name;
    this._userInfo.textContent = user.about;
    this._userAvatar.src = user.avatar
  }
}
