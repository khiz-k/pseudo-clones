import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SearchScreen(props) {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    categories,
    error: errorCategories,
    loading: loadingCategories,
  } = productCategoryList;

  const productList = useSelector((state) => state.productList);

  const { products, loading, error } = productList;

  const {
    category = 'all',
    keyword = 'all',
    order = 'newest',
    min = 0,
    max = 1000000,
    rate = 0,
  } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listProducts({
        order,

        category: category !== 'all' ? category : '',
        keyword: keyword !== 'all' ? keyword : '',
        min,
        max,
        rate,
      })
    );

    return () => {
      //
    };
  }, [category, order, min, max, rate, dispatch, keyword]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterKeyword = filter.keyword || keyword;
    const filterOrder = filter.order || order;

    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max || max;
    const filterRate = filter.rate || rate;

    return `/search/category/${filterCategory}/keyword/${filterKeyword}/order/${filterOrder}/min/${filterMin}/max/${filterMax}/rate/${filterRate}`;
  };

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <div>
            {products.length} Results
            {category !== 'all' && ` : ${category}`}
            {keyword !== 'all' && ` : ${keyword}`}
            {rate > 0 && ` : ${rate} Stars & Up`}
            {min !== 0 && ` : $${min} to $${max}`}
            {category !== 'all' || keyword !== 'all' || rate > 0 || min ? (
              <>
                &nbsp;
                <button
                  type="button"
                  className="small"
                  onClick={() => props.history.push('/search')}
                >
                  Remove Filter
                </button>
              </>
            ) : null}
          </div>
        )}

        <div>
          Sort By{' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(
                getFilterUrl({
                  order: e.target.value,
                })
              );
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <div>
            <h3>Department</h3>
            <ul>
              {loadingCategories ? (
                <li>Loading...</li>
              ) : errorCategories ? (
                <MessageBox variant="error">{errorCategories}</MessageBox>
              ) : (
                categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>{' '}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((x) => (
                <li key={x.name}>
                  <Link
                    className={
                      `${x.min}-${x.max}` === `${min}-${max}` ? 'active' : ''
                    }
                    to={getFilterUrl({ min: x.min, max: x.max })}
                  >
                    {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Avg. Customer Review</h2>
            <ul>
              {ratings.map((x) => (
                <li key={x.rate}>
                  <Link
                    className={`${x.rate}` === rate ? 'active' : ''}
                    to={getFilterUrl({
                      rate: x.rate,
                    })}
                  >
                    <Rating value={x.rate} text=" & Up" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="error">{error}</MessageBox>
          ) : (
            <div className="row center">
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
