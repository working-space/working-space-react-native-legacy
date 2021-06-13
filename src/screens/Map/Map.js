import React, { useState, useEffect, useCallback, useRef } from 'react';
import { css } from '@emotion/native';
import { observer } from 'mobx-react-lite';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import api from '~/api';
import { Container, SearchInput, Card, BottomView, MapButton, LoadingContainer, MapContainer } from './Map.styles';
import Header from '~/components/Header/Header';
import CafeListItem from '~/components/CafeListItem/CafeListItem';
import MapMarker from '~/components/MapMarker/MapMarker';
import SelectModal from '~/components/SelectModal/SelectModal';
import ProfileIcon from '~/components/ProfileIcon/ProfileIcon';
import LoadingBar from '~/components/LoadingBar/LoadingBar';
import ListIcon from '~/assets/icons/icon_list.svg';
import LocateActiveIcon from '~/assets/icons/icon_locate_active.svg';
import MapPickerImage from '~/assets/icons/icon_mappicker.png';
import MapPickerSelectImage from '~/assets/icons/icon_mappicker_select.png';
import useGeolocation from '../../hooks/useGeolocation';
import ErrorBox from '../../components/ErrorBox/ErrorBox';

const Map = ({ navigation }) => {
  const { geolocation, geocode, getGeolocation } = useGeolocation();

  const [isError, setError] = useState(false);
  const [currentRegion, setCurrentRegion] = useState({});
  const [cafes, setCafes] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [selectingStatus, setSelectingStatus] = useState({ cafes: [], locationKey: '' });
  const [isSelectModalVisible, setSelectModalVisible] = useState(false);
  const mapRef = useRef();

  const initializeMapScreen = () => {
    setCafes([]);
    setMarkers([]);
    setSelectedMarker({});
    setCurrentRegion({});
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

  const getCafes = useCallback(async (latitude, longitude) => {
    try {
      const response = await api.get(`/cafes/?lat=${latitude}&lon=${longitude}&limit=20`);
      setCafes(response.data.results);
    } catch (error) {
      setError(true);
    }
  }, []);

  const handleRetry = () => {
    setError(false);
    getCafes();
  };

  const handleRegionChange = (region) => {
    if (!cafes || cafes.length <= 0) return;

    setCurrentRegion(region);
  };

  const handleSubmitSelectModal = useCallback(
    (cafe) => {
      setSelectModalVisible(false);
      selectMarker(selectingStatus.locationKey, cafe);
    },
    [selectingStatus],
  );

  const handleSelectMarker = (locationKey, currentCafes) => {
    if (currentCafes.length > 1) {
      setSelectModalVisible(true);
      setSelectingStatus({ cafes: currentCafes, locationKey });

      return;
    }

    selectMarker(locationKey, currentCafes[0]);
  };

  const handleNavigateCafeDetail = () => {
    navigation.navigate('Detail', { cafeId: selectedMarker.cafe.id });
  };

  const handleSearchCurrentPosition = useCallback(() => {
    const { latitude, longitude } = currentRegion;

    if (!(latitude && longitude)) return;

    initializeMapScreen();
    getCafes(latitude, longitude);
  }, [currentRegion, getCafes]);

  const handleGetCurrentLocation = useCallback(() => {
    initializeMapScreen();
    getGeolocation();
  }, [getGeolocation]);

  const fetchCafes = useCallback(async () => {
    const { latitude, longitude } = geolocation;

    if (!(latitude && longitude)) return;

    await getCafes(latitude, longitude);
    mapRef.current?.setCamera({ center: { latitude, longitude } });
  }, [geolocation, getCafes]);

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
          <SearchInput.PlaceHolder>현위치 : {geocode}</SearchInput.PlaceHolder>
        </SearchInput>
        {isError ? (
          <ErrorBox>
            <ErrorBox.Heading>앗!</ErrorBox.Heading>
            <ErrorBox.Message>카페 목록을 불러오지 못했어요!</ErrorBox.Message>
            <ErrorBox.RetryButton onPress={handleRetry}>
              <ErrorBox.RetryText>다시 시도하기</ErrorBox.RetryText>
            </ErrorBox.RetryButton>
          </ErrorBox>
        ) : (
          <>
            <MapContainer>
              {markers.length <= 0 && (
                <LoadingContainer>
                  <LoadingBar />
                </LoadingContainer>
              )}
              <MapView
                cacheEnabled={true}
                loadingEnabled={true}
                showsCompass={true}
                showsUserLocation={true}
                moveOnMarkerPress={false}
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={css`
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  z-index: 1;
                `}
                initialRegion={{
                  latitude: 37.498095,
                  longitude: 127.02761,
                  latitudeDelta: 0.009,
                  longitudeDelta: 0.009,
                }}
                onPress={() => setSelectedMarker({})}
                onRegionChangeComplete={handleRegionChange}>
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
                        onPress={() => handleSelectMarker(locationKey, cafe)}
                        tracksViewChanges={true}
                        stopPropagation={true}
                      />
                    );
                  })}
              </MapView>
            </MapContainer>

            <BottomView>
              <BottomView.Row>
                {currentRegion.latitude && currentRegion.longitude && (
                  <BottomView.RowItem>
                    <MapButton onPress={handleSearchCurrentPosition}>
                      <MapButton.Text>현재 위치에서 검색하기</MapButton.Text>
                    </MapButton>
                  </BottomView.RowItem>
                )}
                <BottomView.RowItem align="right">
                  <MapButton onPress={handleGetCurrentLocation}>
                    <LocateActiveIcon />
                  </MapButton>
                </BottomView.RowItem>
              </BottomView.Row>
              {selectedMarker.cafe && (
                <Card>
                  <CafeListItem noBorder={true} data={selectedMarker.cafe} onCardLinkClick={handleNavigateCafeDetail} />
                </Card>
              )}
            </BottomView>
            <SelectModal cafes={selectingStatus.cafes} isVisible={isSelectModalVisible} onToggle={toggleModal} onSubmit={handleSubmitSelectModal} />
          </>
        )}
      </Container>
    </>
  );
};

export default observer(Map);
