import { css } from '@emotion/native';
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapMarker from '~/components/MapMarker/MapMarker';
import { DetailLocationWrapper, DetailLocationBox, Title, LocationMap } from './DetailLocation.styles';
import MapPickerSelectImage from '~/assets/icons/icon_mappicker_select.png';

const DetailLocation = ({ latitude, longitude }) => {
  return (
    <DetailLocationWrapper>
      <DetailLocationBox>
        <Title>위치</Title>
        <LocationMap>
          <MapView
            cacheEnabled={true}
            loadingEnabled={true}
            moveOnMarkerPress={false}
            pitchEnabled={false}
            rotateEnabled={false}
            zoomEnabled={false}
            scrollEnabled={false}
            provider={PROVIDER_GOOGLE}
            style={css`
              flex: 1;
            `}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <MapMarker coordinate={{ latitude, longitude }} image={MapPickerSelectImage} tracksViewChanges={true} stopPropagation={true} />
          </MapView>
        </LocationMap>
      </DetailLocationBox>
    </DetailLocationWrapper>
  );
};

export default DetailLocation;
