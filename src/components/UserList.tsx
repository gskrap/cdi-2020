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
  const [showArchived, setShowArchived] = React.useState(true);

  React.useEffect(() => {
    actions.fetchAllUsers();
  }, [actions]);

  const usersToRender = showArchived ? users : users!.filter(u => !u.archived);

  return (
    <>
      {loading && <Loader />}
      {!loading && users && (
        <>
          <div className='mtxxl fdr fjc'>
          <a onClick={() => setShowArchived(!showArchived)} className='filter-link yellow'>
            {showArchived ? 'Hide Archived Users' : 'Show Archived Users'}
          </a>
          </div>
          {usersToRender!.map((user, i) => (
            <UserCard
              key={i}
              user={user}
              onClick={() => actions.setSelectedUser(user)}
              routerLink={`/users/${user.id}`}
            />
          ))}
        </>
      )}
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
