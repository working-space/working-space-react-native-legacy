import { useState, useCallback, useEffect } from 'react';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import useStore from './useStore';
import API_STATUS from '~/constants/apiStatus';

const permissions = [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

const useGeolocation = () => {
  const { GeoLocationStore } = useStore();
  const { geolocation, geocode, status, getGeolocation } = GeoLocationStore;

  const [permissionStatus, setPermissionStatus] = useState(null);

  const requestPermissions = useCallback(
    () =>
      requestMultiple(permissions)
        .then((statuses) => {
          console.log('ACCESS_COARSE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
          console.log('ACCESS_FINE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
          setPermissionStatus(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
        })
        .catch((error) => {
          setPermissionStatus('unavailable');
          console.log(error);
        }),
    [],
  );

  const fetchGeolocation = useCallback(async () => {
    await requestPermissions();
    await getGeolocation();
  }, [requestPermissions, getGeolocation]);

  useEffect(() => {
    if (!geolocation.latitude || !geolocation.longitude) {
      fetchGeolocation();
    }
  }, [fetchGeolocation, geolocation.latitude, geolocation.longitude]);

  return { geolocation, geocode, permissionStatus, isError: status === API_STATUS.FAILURE, getGeolocation };
};

export default useGeolocation;
