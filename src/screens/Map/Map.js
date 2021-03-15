import React, { useState, useEffect, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import api from '~/api';
import Header from '~/components/Header/Header';
import FloatingActionButton from '~/components/FloatingActionButton/FloatingActionButton';
import { Container, SearchInput, Card } from './Map.styles';
import MenuIcon from '~/assets/icons/icon_menu.svg';
import ListIcon from '~/assets/icons/icon_list.svg';
import LocateActiveIcon from '~/assets/icons/icon_locate_active.svg';
import MapPickerIcon from '~/assets/icons/icon_mappicker.svg';
import MapPickerSelectIcon from '~/assets/icons/icon_mappicker_select.svg';
import CafeListItem from '../../components/CafeListItem/CafeListItem';

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const mapRef = useRef();

  const handleClickMarker = ({ id, name, distance, road_addr }) => {
    const cafe = {
      id: id,
      title: name,
      distance,
      address: road_addr,
    };
    setSelectedCafe(cafe);
  };

  const handleGetLocation = useCallback(() => {
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
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.498095,
            longitude: 127.02761,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          onPress={() => setSelectedCafe(null)}>
          {cafes.length > 0 &&
            cafes.map((cafe) => {
              const { id, name, road_addr, location, dist } = cafe;
              const [longitude, latitude] = location.coordinates;
              const distance = dist.calculated;

              return (
                <Marker key={id} coordinate={{ latitude, longitude }} onPress={() => handleClickMarker(cafe)}>
                  {selectedCafe && selectedCafe.id === id ? <MapPickerSelectIcon /> : <MapPickerIcon />}
                </Marker>
              );
            })}
        </MapView>
        <FloatingActionButton onPress={() => handleGetLocation()}>
          <LocateActiveIcon />
        </FloatingActionButton>
        {selectedCafe && (
          <Card>
            <CafeListItem data={selectedCafe} />
          </Card>
        )}
      </Container>
    </>
  );
};

export default observer(Map);
