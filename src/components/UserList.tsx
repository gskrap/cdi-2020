import React from 'react';
import {User} from '../models/User';
import Loader from './Loader';
import UserCard from './UserCard';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';
import {AppState} from '../store/defaultStore';

interface UserListProps {
  users: User[] | null;
  loading: boolean;
}

const UserList: React.FC<UserListProps & MappedActions<typeof actions>> = ({ users, loading, actions }) => {
  React.useEffect(() => {
    if (!users) {
      actions.fetchAllUsers();
    }
  }, [users, actions]);

  return (
    <>
      {loading && <Loader />}
      {!loading && users && users.map((user, i) => (
        <UserCard
          key={i}
          user={user}
          onClick={() => actions.setSelectedUser(user)}
          routerLink={`/users/${user.id}`}
        />
      ))}
    </>
  );
};

const mapState = (state: AppState) => {
  return {
    users: state.allUsers,
    loading: state.allUsersLoading,
  }
};

export default connect(mapState, actions)(UserList);
