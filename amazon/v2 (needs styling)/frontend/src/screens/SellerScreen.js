import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function SellerScreen(props) {
  const dispatch = useDispatch();
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    products,
    error: errorProducts,
  } = productList;
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));

    return () => {};
  }, [dispatch, sellerId]);

  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row">
                <div>
                  <img
                    src={user.seller.logo}
                    alt={user.seller.name}
                    className="small"
                  />
                </div>
                <div>
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                value={user.seller.rating}
                text={`${user.seller.numReviews} reviews`}
              />
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox />
        ) : errorProducts ? (
          <MessageBox>{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && (
              <MessageBox>No Product Found.</MessageBox>
            )}
            <div className="row">
              {products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SellerScreen;
