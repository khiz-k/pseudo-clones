import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateUserProfile, detailsUser } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function ProfileScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  if (!userSignin.userInfo) {
    props.history.push('/signin');
  }
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, user, error } = userDetails;

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert('Password and confirm password does not match.');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          email,
          name,
          password,
          seller: user.isSeller
            ? {
                logo: sellerLogo,
                name: sellerName,
                description: sellerDescription,
              }
            : {},
        })
      );
    }
  };
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  useEffect(() => {
    if (success) {
      return () => {};
    }
    if (!user.name) {
      dispatch(detailsUser(userSignin.userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setSellerName(user.seller ? user.seller.name : '');
      setSellerLogo(user.seller ? user.seller.logo : '');
      setSellerDescription(user.seller ? user.seller.description : '');
    }
    return () => {};
  }, [user, success, dispatch, userSignin.userInfo._id]);
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setSellerLogo(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="error">{error}</MessageBox>}
        {success && (
          <MessageBox variant="success">Profile Saved Successfully.</MessageBox>
        )}
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {user.isSeller && (
          <>
            <h2>Seller</h2>
            <div>
              <label htmlFor="sellerName">Seller NAme</label>
              <input
                id="sellerName"
                type="text"
                placeholder="Enter Seller Name"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image Url</label>
              <input
                id="image"
                type="text"
                placeholder="Enter logo url"
                value={sellerLogo}
                onChange={(e) => setSellerLogo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image-file">Image File</label>

              <input
                type="file"
                id="image-file"
                label="Choose Logo"
                onChange={uploadFileHandler}
              />
              {uploading && <LoadingBox />}
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                placeholder="Enter Description"
                value={sellerDescription}
                onChange={(e) => setSellerDescription(e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <label />
          <button className="primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileScreen;
