import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { parseReportCoordinates, type ReportLocationProps } from './reportLocation';

export default function ReportLocationMap({ location, onPick }: ReportLocationProps) {
  const map = useRef<MapView>(null);
  const coordinate = parseReportCoordinates(location);
  useEffect(() => {
    const point = parseReportCoordinates(location);
    if (point)
      map.current?.animateToRegion({ ...point, latitudeDelta: 0.012, longitudeDelta: 0.012 }, 250);
  }, [location]);
  return (
    <MapView
      ref={map}
      accessibilityLabel="Report location map"
      style={StyleSheet.absoluteFill}
      initialRegion={{ latitude: 16.06, longitude: 108.24, latitudeDelta: 0.13, longitudeDelta: 0.11 }}
      onPress={onPick ? (e) => onPick(e.nativeEvent.coordinate) : undefined}
    >
      {coordinate && <Marker coordinate={coordinate} />}
    </MapView>
  );
}
