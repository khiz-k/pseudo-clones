import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function OrderHistoryScreen(props) {
  const dispatch = useDispatch();

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, orders, error } = orderMineList;
  useEffect(() => {
    dispatch(listOrderMine());
    return () => {};
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : orders.length === 0 ? (
        <MessageBox variant="info">No Order Found</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                    className="small"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistoryScreen;
