import { makeAutoObservable, flow } from 'mobx';
import api from '../api';
import API_STATUS from '../constants/apiStatus';

class DetailCafeDataStore {
  status = API_STATUS.INIT;

  fetchedDetailCafeData = null;
  cafeLikeCountData = null;
  fetchedCommentsList = null;
  hasNextComments = null;

  userPreferredTags = null;
  userToggleLike = null;
  userToggleBookmark = null;
  userComments = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isFetching() {
    return this.status === API_STATUS.PENDING;
  }

  get isLoading() {
    return this.status === API_STATUS.LOADING;
  }

  fetchDetailCafeData = flow(function* (cafeId, userId, latitude, longitude, page) {
    if (this.isFetching) return;

    this.status = API_STATUS.PENDING;

    try {
      const responseDetailCafeData = yield api.get(`/cafes/${cafeId}/?lat=${latitude}&lon=${longitude}`);
      this.fetchedDetailCafeData = responseDetailCafeData.data;
      const responseCafeLikeData = yield api.get(`/ratings/?cafe_id=${cafeId}`);
      this.cafeLikeCountData = responseCafeLikeData.data.count;
      this.fetchCommentsList(cafeId, page);

      const responseUserPreferredTags = yield api.get(`/tags/?id=${cafeId}&name=${userId}`);
      this.userPreferredTags = responseUserPreferredTags.data.results;
      const responseUserToggleLike = yield api.get(`/ratings/?cafe_id=${cafeId}&user_id=${userId}`);
      this.userToggleLike = responseUserToggleLike.data.count;
      const responseUserToggleBookmark = yield api.get(`/bookmarks/?user_id=${userId}`);
      this.userToggleBookmark = responseUserToggleBookmark.data.count;
      const responseUserComments = yield api.get(`/comments/?cafe_id=${cafeId}&user_id=${userId}`);
      this.userComments = responseUserComments.data.results;

      this.status = API_STATUS.SUCCESS;
    } catch (error) {
      this.status = API_STATUS.FAILURE;
      console.log(error);
    }
  }).bind(this);

  fetchCommentsList = flow(function* (cafeId, page) {
    if (this.isLoading) return;

    this.status = API_STATUS.LOADING;

    if (page <= 0) {
      this.fetchedCommentsList = [];
    }

    try {
      const response = yield api.get(`/comments/?cafe_id=${cafeId}&offset=${page}&limit=5`);
      const newCommentsList = response.data.results;

      this.hasNextComments = response.data.next;
      this.fetchedCommentsList = [...this.fetchedCommentsList, ...newCommentsList];

      this.status = API_STATUS.SUCCESS;
    } catch (error) {
      this.status = API_STATUS.FAILURE;
    }
  }).bind(this);
}

export default DetailCafeDataStore;
