import { createContext } from 'react';
import AuthStore from './AuthStore';
import CafeListStore from './CafeListStore';
import GeoLocationStore from './GeoLocationStore';

class RootStore {
  constructor() {
    this.AuthStore = new AuthStore();
    this.CafeListStore = new CafeListStore();
    this.GeoLocationStore = new GeoLocationStore();
  }
}
const RootStoreContext = createContext(new RootStore());

export default RootStoreContext;
