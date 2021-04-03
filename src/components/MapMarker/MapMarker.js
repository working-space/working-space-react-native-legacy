import React from 'react';
import { Marker } from 'react-native-maps';

const MapMarker = React.memo((props) => {
  return <Marker {...props}>{props.children}</Marker>;
});

export default MapMarker;
