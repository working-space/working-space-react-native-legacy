import { makeObservable, observable, computed, action } from 'mobx';

class AuthStore {
  constructor() {
    makeObservable(this, {
      userInfo: observable,
      isLoggedIn: computed,
      login: action,
      logout: action,
    });
  }

  userInfo = null;

  get isLoggedIn() {
    return !!this.userInfo;
  }

  login = (email) => {
    console.log('login request :' + email);
    this.userInfo = email;
  };

  logout = () => {
    console.log('logout request :' + this.userInfo);
    this.userInfo = null;
  };
}

export default AuthStore;
