import Geolocation from 'react-native-geolocation-service';
import { makeObservable, observable, action, runInAction } from 'mobx';
import API_STATUS from '../constants/apiStatus';
import api from '~/api';

class GeoLocationStore {
  constructor() {
    makeObservable(this, {
      geolocation: observable,
      geocode: observable,
      status: observable,
      setCoordinates: action,
      setGeocode: action,
      getGeolocation: action,
      getGeocode: action,
    });
  }

  geolocation = {
    latitude: null,
    longitude: null,
  };

  geocode = '';

  status = API_STATUS.IDLE;

  setStatus = (status) => {
    this.status = status;
  };

  setCoordinates = (latitude, longitude) => {
    this.geolocation = {
      latitude,
      longitude,
    };
  };

  setGeocode = (address) => {
    this.geocode = address;
  };

  getGeocode = async ({ latitude, longitude }) => {
    if (!latitude || !longitude) return;

    runInAction(() => this.setStatus(API_STATUS.PENDING));

    try {
      const response = await api.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ko`);
      const addressComponents = response.data.localityInfo.administrative;

      const city = addressComponents.find((item) => item.order === 4);
      const district = addressComponents.find((item) => item.order === 5);
      const dong = addressComponents.find((item) => item.order === 6);

      const address = `${city.name} ${district.name} ${dong.name}`;

      runInAction(() => this.setGeocode(address));

      runInAction(() => this.setStatus(API_STATUS.SUCCESS));
    } catch (error) {
      runInAction(() => this.setStatus(API_STATUS.FAILURE));
    }
  };

  getGeolocation = async () => {
    this.setStatus(API_STATUS.PENDING);

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        runInAction(() => this.setCoordinates(latitude, longitude));
        runInAction(async () => await this.getGeocode({ latitude, longitude }));

        runInAction(() => this.setStatus(API_STATUS.SUCCESS));
      },
      (error) => {
        runInAction(() => this.setStatus(API_STATUS.FAILURE));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
}

export default GeoLocationStore;
