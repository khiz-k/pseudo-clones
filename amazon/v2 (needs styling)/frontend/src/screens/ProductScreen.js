import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, updateProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProductScreen(props) {
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productUpdateSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productUpdateSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(productId));
    return () => {
      //
    };
  }, [productUpdateSuccess, dispatch, productId]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      updateProductReview(productId, {
        name: userInfo.name,
        rating,
        comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };
  const changeImage = (image) => {
    setSelectedImage(image);
  };
  return (
    <>
      <Link to="/">Back to result</Link>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={selectedImage || product.image}
                alt={product.name}
              />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h2>{product.name}</h2>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </a>
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
                <li>
                  Images:
                  <ul className="images">
                    {[product.image, ...product.images].map((x) => (
                      <li key={x}>
                        <button
                          type="button"
                          className="light"
                          onClick={() => changeImage(x)}
                        >
                          <img src={x} alt="product" className="small" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Seller
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      value={product.seller.seller.rating}
                      text={`${product.seller.seller.numReviews} reviews`}
                    />
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div>
                        <div className="price">${product.price}</div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>

                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => {
                                setQty(e.target.value);
                              }}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          className="block primary"
                          type="button"
                          onClick={handleAddToCart}
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2 id="reviews">Reviews</h2>
              {!product.reviews.length && (
                <MessageBox>There is no review</MessageBox>
              )}
              <ul>
                {product.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>{review.name}</strong>

                    <Rating value={review.rating} />

                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}

                <li>
                  {userInfo ? (
                    <form className="form" onSubmit={submitHandler}>
                      <div>
                        <h2>Write a customer review</h2>
                      </div>
                      <div>
                        <label htmlFor="rating">Rating</label>
                        <select
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <div>
                        <div />
                        <button className="primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <MessageBox>
                      Please <Link to="/signin">Sign-in</Link> to write a
                      review.
                    </MessageBox>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default ProductScreen;
