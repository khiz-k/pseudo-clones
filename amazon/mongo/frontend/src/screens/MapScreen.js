import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from '@react-google-maps/api';
import axios from 'axios';

const defaultLocation = { lat: 45.516, lng: -73.56 };
const libs = ['places'];
function MapScreen(props) {
  const dispatch = useDispatch();
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);
  const [googleApiKey, setGoogleApiKey] = useState(null);
  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get('/api/config/googleapi');
      setGoogleApiKey(data);
      getUserLocation();
    };
    fetch();
    return () => {};
  }, []);

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const onLoadMap = (map) => {
    mapRef.current = map;
  };
  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation os not supported by this browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };
  const onConfirm = () => {
    const places = placeRef.current.getPlaces();

    if (places && places.length === 1) {
      dispatch({
        type: 'USER_ADDRESS_MAP_CONFIRM',
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAddressId: places[0].id,
        },
      });

      alert('Location successfully saved.');
      props.history.push('/shipping');
    } else {
      alert('Please enter your address');
    }
  };
  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="sample-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoadMap}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Find your address" />
              <button type="button" className="primary" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad} />
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <div>Loading Google Map...</div>
  );
}

export default MapScreen;
