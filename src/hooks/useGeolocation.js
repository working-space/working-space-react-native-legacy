import { useState, useCallback, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import useGeocode from './useGeocode';
import { requestPermissions } from '~/utils/permission';

const useGeolocation = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [geolocation, setGeolocation] = useState({
    latitude: null,
    longitude: null,
  });

  const { geocode, isLoading: isGeocodeLoading, isError: isGeocodeError } = useGeocode(geolocation);

  const getGeolocation = useCallback(() => {
    setLoading(true);

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setGeolocation({ latitude, longitude });
        setLoading(false);
      },
      (err) => {
        console.log(err.code, err.message);
        setLoading(false);
        setError(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  useEffect(() => {
    requestPermissions();
    getGeolocation();
  }, [getGeolocation]);

  return { geolocation, isLoading, isError, geocode, isGeocodeLoading, isGeocodeError, getGeolocation };
};

export default useGeolocation;
