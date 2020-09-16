import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingAddressScreen(props) {
  if (!useSelector((state) => state.userSignin).userInfo) {
    props.history.push('/signin');
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        'You did not set your location on map. Continue?'
      );
    }

    if (moveOn) {
      dispatch(
        saveShippingAddress({
          address,
          fullName,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push('payment');
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        address,
        fullName,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push('/map');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Enter full name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Choose On Map
          </button>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
export default ShippingAddressScreen;
