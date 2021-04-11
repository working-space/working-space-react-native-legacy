import Geolocation from 'react-native-geolocation-service';
import { makeObservable, observable, action, runInAction } from 'mobx';
import API_STATUS from '../constants/apiStatus';

class GeoLocationStore {
  constructor() {
    makeObservable(this, {
      latitude: observable,
      longitude: observable,
      status: observable,
      setCoordinates: action,
      getCurrentLocation: action,
    });
  }

  latitude = null;
  longitude = null;
  status = API_STATUS.IDLE;

  setCoordinates = (latitude, longitude) => {
    this.latitude = latitude;
    this.longitude = longitude;
  };

  getCurrentLocation = () => {
    this.status = API_STATUS.PENDING;

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        runInAction(() => this.setCoordinates(latitude, longitude));

        this.status = API_STATUS.SUCCESS;
      },
      (error) => {
        this.status = API_STATUS.FAILURE;
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
}

export default GeoLocationStore;
