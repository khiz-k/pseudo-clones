import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
} from '../constants/productConstants';

function ProductListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    dispatch({ type: PRODUCT_DETAILS_RESET });
    return () => {
      //
    };
  }, [
    successDelete,
    successCreate,
    dispatch,
    props.history,
    createdProduct,
    userInfo,
    sellerMode,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete this product?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : products.length === 0 ? (
        <MessageBox variant="info">No Order Found</MessageBox>
      ) : (
        <>
          {errorCreate && (
            <MessageBox variant="error">{errorCreate}</MessageBox>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
export default ProductListScreen;
