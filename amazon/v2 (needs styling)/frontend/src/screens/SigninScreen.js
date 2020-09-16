import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect =
    props.location.search && props.location.search.indexOf('redirect') >= 0
      ? props.location.search.split('=')[1]
      : '/';
  const message =
    props.location.search && props.location.search.indexOf('message') >= 0
      ? props.location.search.split('=')[1]
      : '';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo, props.history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="error">{error}</MessageBox>}
        {message && (
          <MessageBox variant="error">
            {message.replace(/%20/g, ' ')}
          </MessageBox>
        )}

        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{' '}
            <Link
              to={
                redirect === '/' ? 'register' : `register?redirect=${redirect}`
              }
            >
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
export default SigninScreen;
