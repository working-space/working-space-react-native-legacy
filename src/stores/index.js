import { createContext } from 'react';
import AuthStore from './AuthStore';

class RootStore {
  constructor() {
    this.AuthStore = new AuthStore();
  }
}
const RootStoreContext = createContext(new RootStore());

export default RootStoreContext;
