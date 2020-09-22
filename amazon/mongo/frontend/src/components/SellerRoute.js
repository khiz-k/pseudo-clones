import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SellerRoute = ({ component: Component, ...rest }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, signout } = userSignin;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isSeller === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={
              signout
                ? '/signin?message=You signed out successfully.'
                : '/signin?message=Error. Please signin as seller to see this screen.'
            }
          />
        )
      }
    />
  );
};

export default SellerRoute;
