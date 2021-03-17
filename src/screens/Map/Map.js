import React, { useState, useEffect, useCallback, useRef } from 'react';
import { css } from '@emotion/native';
import { observer } from 'mobx-react-lite';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import api from '~/api';
import { Container, SearchInput, Card } from './Map.styles';
import Header from '~/components/Header/Header';
import FloatingActionButton from '~/components/FloatingActionButton/FloatingActionButton';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import MenuIcon from '~/assets/icons/icon_menu.svg';
import ListIcon from '~/assets/icons/icon_list.svg';
import LocateActiveIcon from '~/assets/icons/icon_locate_active.svg';
import MapPickerIcon from '~/assets/icons/icon_mappicker.svg';
import MapPickerSelectIcon from '~/assets/icons/icon_mappicker_select.svg';

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const mapRef = useRef();

  const initialize = () => {
    setLocation(null);
    setCafes([]);
    setMarkers([]);
    setSelectedMarker({});
  };

  const getMarkers = useCallback(() => {
    if (!cafes || cafes.length <= 0) {
      return;
    }

    const newMarkers = {};

    cafes.forEach((cafe) => {
      const [longitude, latitude] = cafe.location.coordinates;
      const locationKey = `${longitude},${latitude}`;

      if (Object.keys(newMarkers).includes(locationKey)) {
        newMarkers[locationKey].push(cafe);
      } else {
        newMarkers[locationKey] = [cafe];
      }
    });

    setMarkers(newMarkers);
  }, [cafes]);

  const handlePressMarker = (locationKey, { id, name, dist, road_addr }) => {
    const distance = `${Math.floor(dist.calculated)}m`;

    const cafe = {
      id: id,
      title: name,
      distance,
      address: road_addr,
    };

    setSelectedMarker({
      locationKey,
      cafe,
    });
  };

  const handleGetLocation = useCallback(() => {
    initialize();

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        mapRef.current.setCamera({ center: { latitude, longitude } });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const fetchCafes = useCallback(async () => {
    if (!location) {
      return;
    }

    const { latitude, longitude } = location;
    const response = await api.get(`/cafes/?lat=${latitude}&lon=${longitude}&page=1`);

    setCafes(response.data.results);
  }, [location]);

  useEffect(() => {
    handleGetLocation();
  }, [handleGetLocation]);

  useEffect(() => {
    fetchCafes();
  }, [fetchCafes]);

  useEffect(() => {
    getMarkers();
  }, [getMarkers]);

  return (
    <>
      <Header
        left={
          <Header.Button onPress={navigation.openDrawer}>
            <MenuIcon />
          </Header.Button>
        }
        right={
          <Header.Button onPress={() => navigation.navigate('Main')}>
            <ListIcon />
          </Header.Button>
        }
      />
      <Container>
        <SearchInput onPress={() => navigation.navigate('Search')}>
          <SearchInput.PlaceHolder>현위치 : 서울시 서초구 양재천로 131 4층</SearchInput.PlaceHolder>
        </SearchInput>

        <MapView
          showsUserLocation
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={css`
            flex: 1;
          `}
          initialRegion={{
            latitude: 37.498095,
            longitude: 127.02761,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          onPress={() => setSelectedMarker({})}>
          {Object.entries(markers).length > 0 &&
            Object.entries(markers).map((currentMarker) => {
              const [locationKey, currentCafes] = currentMarker;
              const [longitude, latitude] = locationKey.split(',').map(Number);

              /*
               * TODO: 동일한 위치에 카페가 존재할 때, 마커 선택 시 카페를 선택하는 Modal이 나타나도록 구현해야 함
               * 기능 구현 시, 바로 아래 코드를 활성화시킬 것
               */
              // const cafe = currentCafes.length === 1 ? currentCafes[0] : currentCafes;
              const cafe = currentCafes[0];

              return (
                <Marker key={locationKey} coordinate={{ latitude, longitude }} onPress={() => handlePressMarker(locationKey, cafe)}>
                  {selectedMarker.locationKey === locationKey ? <MapPickerSelectIcon /> : <MapPickerIcon />}
                </Marker>
              );
            })}
        </MapView>
        <FloatingActionButton onPress={() => handleGetLocation()}>
          <LocateActiveIcon />
        </FloatingActionButton>
        {selectedMarker.cafe && (
          <Card>
            <CafeListItem data={selectedMarker.cafe} />
          </Card>
        )}
      </Container>
    </>
  );
};

export default observer(Map);
