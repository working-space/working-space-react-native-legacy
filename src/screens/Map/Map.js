import React, { useState, useEffect, useCallback, useRef } from 'react';
import { css } from '@emotion/native';
import { observer } from 'mobx-react-lite';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import api from '~/api';
import { Container, SearchInput, Card, BottomView } from './Map.styles';
import Header from '~/components/Header/Header';
import FloatingActionButton from '~/components/FloatingActionButton/FloatingActionButton';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import MapMarker from '~/components/MapMarker/MapMarker';
import SelectModal from '~/components/SelectModal/SelectModal';
import ProfileIcon from '~/components/ProfileIcon/ProfileIcon';
import ListIcon from '~/assets/icons/icon_list.svg';
import LocateActiveIcon from '~/assets/icons/icon_locate_active.svg';
import MapPickerImage from '~/assets/icons/icon_mappicker.png';
import MapPickerSelectImage from '~/assets/icons/icon_mappicker_select.png';

const Map = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [selectingStatus, setSelectingStatus] = useState({ cafes: [], locationKey: '' });
  const [isSelectModalVisible, setSelectModalVisible] = useState(false);
  const mapRef = useRef();

  const initializeMapScreen = () => {
    setCurrentLocation(null);
    setCafes([]);
    setMarkers([]);
    setSelectedMarker({});
  };

  const selectMarker = (locationKey, currentCafe) => {
    const { id, name, dist, road_addr, tags, location } = currentCafe;
    const distance = `${Math.floor(dist.calculated)}m`;
    const [longitude, latitude] = location.coordinates;

    const cafe = {
      id: id,
      title: name,
      distance,
      address: road_addr,
      tags,
    };

    setSelectedMarker({
      locationKey,
      cafe,
    });

    mapRef.current.animateCamera({ center: { latitude: latitude - 0.0007, longitude } });
  };

  const handleSubmitSelectModal = useCallback(
    (cafe) => {
      setSelectModalVisible(false);
      selectMarker(selectingStatus.locationKey, cafe);
    },
    [selectingStatus],
  );

  const toggleModal = () => {
    setSelectModalVisible((prevState) => !prevState);
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

  const handlePressMarker = (locationKey, currentCafes) => {
    if (currentCafes.length > 1) {
      setSelectModalVisible(true);
      setSelectingStatus({ cafes: currentCafes, locationKey });
      return;
    }

    selectMarker(locationKey, currentCafes[0]);
  };

  const handlePressCafeListItem = useCallback(
    (card) => {
      navigation.navigate('Detail', { cardData: card });
    },
    [navigation],
  );

  const handleGetLocation = useCallback(() => {
    initializeMapScreen();

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
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
    if (!currentLocation) {
      return;
    }

    const { latitude, longitude } = currentLocation;
    const response = await api.get(`/cafes/?lat=${latitude}&lon=${longitude}&page=1`);
    setCafes(response.data.results);
  }, [currentLocation]);

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
          <Header.Button onPress={() => navigation.navigate('ProfileMenu')}>
            <ProfileIcon />
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
          cacheEnabled={true}
          loadingEnabled={true}
          showsCompass={true}
          showsUserLocation={true}
          moveOnMarkerPress={false}
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
          {markers &&
            Object.entries(markers).map((currentMarker) => {
              const [locationKey, currentCafes] = currentMarker;
              const [longitude, latitude] = locationKey.split(',').map(Number);
              const cafe = currentCafes;

              return (
                <MapMarker
                  key={locationKey}
                  coordinate={{ latitude, longitude }}
                  image={selectedMarker.locationKey === locationKey ? MapPickerSelectImage : MapPickerImage}
                  onPress={() => handlePressMarker(locationKey, cafe)}
                  tracksViewChanges={true}
                  stopPropagation={true}
                />
              );
            })}
        </MapView>
        <BottomView>
          <FloatingActionButton onPress={handleGetLocation}>
            <LocateActiveIcon />
          </FloatingActionButton>
          {selectedMarker.cafe && (
            <Card>
              <CafeListItem noBorder={true} data={selectedMarker.cafe} onCardLinkClick={() => handlePressCafeListItem(selectedMarker.cafe)} />
            </Card>
          )}
        </BottomView>
        <SelectModal cafes={selectingStatus.cafes} isVisible={isSelectModalVisible} onToggle={toggleModal} onSubmit={handleSubmitSelectModal} />
      </Container>
    </>
  );
};

export default observer(Map);
