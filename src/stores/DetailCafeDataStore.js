import { makeAutoObservable, flow } from 'mobx';
import api from '../api';
import API_STATUS from '../constants/apiStatus';

class DetailCafeDataStore {
  status = API_STATUS.INIT;
  fetchedDetailCafeData = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isFetching() {
    return this.status === API_STATUS.PENDING;
  }

  fetchDetailCafeData = flow(function* (cafeId) {
    if (this.isFetching) return;

    this.status = API_STATUS.PENDING;

    try {
      const response = yield api.get(`/cafes/${cafeId}`);
      const newDetailCafeData = response.data;
      this.fetchedDetailCafeData = newDetailCafeData;
      this.status = API_STATUS.SUCCESS;
    } catch (error) {
      this.status = API_STATUS.FAILURE;
      console.log(error);
    }
  }).bind(this);
}

export default DetailCafeDataStore;
