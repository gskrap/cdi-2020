import React from 'react';
import {API, checkHttpResponse} from '../helpers/httpHelper';
import {User} from '../models/User';
import Loader from './Loader';
import UserCard from './UserCard';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';

const UserList: React.FC<MappedActions<typeof actions>> = ({ actions }) => {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get('/users');
        const responseBody = await checkHttpResponse(response);
        setLoading(false);
        setUsers(responseBody);
      } catch (e) {
        setLoading(false);
        console.error(e)
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && users && users.map((user, i) => (
        <UserCard key={i} user={user} onClick={() => actions.setSelectedUser(user)} routerLink={`/users/${user.id}`} distinguishUsers={true} />
      ))}
    </>
  );
};

export default connect(null, actions)(UserList);
