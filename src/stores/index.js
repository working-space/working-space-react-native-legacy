import { createContext } from 'react';
import AuthStore from './AuthStore';
import CafeListStore from './CafeListStore';
import GeoLocationStore from './GeoLocationStore';
import DetailCafeDataStore from './DetailCafeDataStore';

class RootStore {
  constructor() {
    this.AuthStore = new AuthStore();
    this.CafeListStore = new CafeListStore();
    this.GeoLocationStore = new GeoLocationStore();
    this.DetailCafeDataStore = new DetailCafeDataStore();
  }
}
const RootStoreContext = createContext(new RootStore());

export default RootStoreContext;
