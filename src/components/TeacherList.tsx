import React from 'react';
import {User} from '../models/User';
import UserCard from './UserCard';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';
import Loader from './Loader';

type TeacherListProps = {
  loading: boolean;
  teachers: User[] | null;
}

const TeacherList: React.FC<TeacherListProps & MappedActions<typeof actions>> = ({
  loading,
  teachers,
  actions,
}) => {
  React.useEffect(() => {
    if (!teachers) {
      const fetchTeachers = async () => {
        try {
          await actions.fetchTeachers()
        } catch (e) {
          console.error(e)
        }
      };
      fetchTeachers();
    }
  }, [teachers, actions]);

  return (
    <>
      {loading && <Loader />}
      {!loading && teachers && teachers.map((teacher, i) => (
        <UserCard
          key={i}
          user={teacher}
          teachersOnly={true}
          routerLink={`/users/${teacher.id}`}
        />
      ))}
    </>
  )
};

const mapState = (state: AppState) => {
  return {
    loading: state.teachersLoading,
    teachers: state.teachers,
  }
};

export default connect(mapState, actions)(TeacherList);
