import { useState, useCallback, useEffect } from 'react';
import api from '../api';

const useGeocode = (geolocation) => {
  const [geocode, setGeocode] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const getGeocode = useCallback(async () => {
    if (!geolocation.latitude || !geolocation.longitude) return;

    setLoading(true);

    try {
      const response = await api.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&localityLanguage=ko`);
      const addressComponents = response.data.localityInfo.administrative;

      const city = addressComponents.find((item) => item.order === 4);
      const district = addressComponents.find((item) => item.order === 5);
      const dong = addressComponents.find((item) => item.order === 6);

      const address = `${city.name} ${district.name} ${dong.name}`;
      setGeocode(address);
    } catch (error) {
      console.warn(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [geolocation.latitude, geolocation.longitude]);

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      getGeocode();
    }
  }, [geolocation.latitude, geolocation.longitude, getGeocode]);

  return {
    geocode,
    isLoading,
    isError,
    getGeocode,
  };
};

// Note: Google Geocoding API
// const useGeocode = (geolocation) => {
//   const [geocode, setGeocode] = useState(null);
//   const [isLoading, setLoading] = useState(false);
//   const [isError, setError] = useState(null);

//   const getGeocode = useCallback(async () => {
//     if (!geolocation.latitude || !geolocation.longitude) return;
//     setLoading(true);

//     try {
//       const response = await Geocoder.from(geolocation);
//       const [, roadAddressComponent] = response.results;
//       const [road, , gu, city] = roadAddressComponent.address_components;
//       const address = `${city.short_name} ${gu.short_name} ${road.short_name}`;

//       setGeocode(address);
//     } catch (error) {
//       console.warn(error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [geolocation]);

//   useEffect(() => {
//     Geocoder.init(Config.GOOGLE_API_KEY, { language: 'ko' });
//   }, []);

//   return {
//     geocode,
//     isLoading,
//     isError,
//     getGeocode,
//   };
// };

export default useGeocode;
