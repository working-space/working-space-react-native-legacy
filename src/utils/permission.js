// Note: 현재 사용하지 않는 코드 파일. 추후 삭제 예정
import { requestMultiple, checkMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

const permissions = [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

export const requestPermissions = () => {
  requestMultiple(permissions).then((statuses) => {
    console.log('ACCESS_COARSE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
    console.log('ACCESS_FINE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
  });
};

export const checkPermissions = () => {
  checkMultiple(permissions)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;
        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      console.warn(error);
    });
};
