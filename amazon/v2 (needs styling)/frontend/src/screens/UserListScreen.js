import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
    return () => {
      //
    };
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure to delete this user?')) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>SELLER</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'YES' : ' No'}</td>
                <td>{user.isAdmin ? 'YES' : 'No'}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
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
export default UserListScreen;
