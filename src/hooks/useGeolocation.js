import { useState, useCallback, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import useGeocode from './useGeocode';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

const permissions = [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

const useGeolocation = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [geolocation, setGeolocation] = useState({
    latitude: null,
    longitude: null,
  });

  const { geocode, isLoading: isGeocodeLoading, isError: isGeocodeError } = useGeocode(geolocation);

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

  const getCurrentPosition = useCallback(() => {
    setLoading(true);
    setError(false);

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setGeolocation({ latitude, longitude });
        setLoading(false);
        setError(false);
      },
      (err) => {
        console.log(err.code, err.message);
        setLoading(false);
        setError(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const getGeolocation = useCallback(async () => {
    await requestPermissions();
    getCurrentPosition();
  }, [getCurrentPosition, requestPermissions]);

  useEffect(() => {
    getGeolocation();
  }, [getGeolocation]);

  return { geolocation, isLoading, isError, geocode, isGeocodeLoading, isGeocodeError, permissionStatus, getGeolocation };
};

export default useGeolocation;
