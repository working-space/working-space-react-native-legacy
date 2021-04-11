import { makeAutoObservable, flow } from 'mobx';
import api from '../api';
import API_STATUS from '../constants/apiStatus';

class CafeListStore {
  status = API_STATUS.INIT;
  fetchedCafeList = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isEmpty() {
    return !!this.fetchedCafeList;
  }

  get isFetching() {
    return this.status === API_STATUS.PENDING;
  }

  fetchCafeList = flow(function* (latitude, longitude, page) {
    if (this.isFetching) return;

    this.status = API_STATUS.PENDING;

    if (page <= 1) {
      this.fetchedCafeList = [];
    }

    try {
      const response = yield api.get(`/cafes/?lat=${latitude}&lon=${longitude}&page=${page}`);
      const newCafeList = response.data.results;

      this.fetchedCafeList = [...this.fetchedCafeList, ...newCafeList];
      this.status = API_STATUS.SUCCESS;
    } catch (error) {
      this.status = API_STATUS.FAILURE;
    }
  }).bind(this);
}

export default CafeListStore;
