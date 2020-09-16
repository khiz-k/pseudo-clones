import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { detailsOrder, payOrder, deliverOrder } from '../actions/orderActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      order &&
      (!order._id || order._id !== orderId || successPay || successDeliver)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else if (order && !order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
    return () => {};
  }, [order, successPay, successDeliver, dispatch, orderId]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const handleDeliver = () => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="error">{error}</MessageBox>
  ) : (
    <>
      <h1> Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li className="card card-body">
              <h2>Shipping</h2>
              <p>
                <strong>Full Name:</strong> {order.shippingAddress.fullName}{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                <br />
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city},{order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country},
              </p>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="error">Not Delivered</MessageBox>
              )}
            </li>
            <li className="card card-body">
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="error">Not Paid</MessageBox>
              )}
            </li>
            <li className="card card-body">
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <MessageBox>Cart is empty</MessageBox>
              ) : (
                <ul variant="flush">
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="row">
                        <div md={1}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div md={4} className="text-right">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul variant="flush">
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {loadingPay && <LoadingBox />}
                  {!order.isPaid && !sdkReady && <LoadingBox />}
                  {!order.isPaid && sdkReady && (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={handleSuccessPayment}
                    />
                  )}
                </li>
              )}
              {userInfo.isSeller && order.isPaid && !order.isDelivered && (
                <li>
                  <button
                    onClick={handleDeliver}
                    type="button"
                    className="block"
                  >
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderScreen;
