import React from 'react';
import {User} from '../models/User';
import TeacherCard from './TeacherCard';
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
  const [triggerActive, setTriggerActive] = React.useState(false);
  const [loaded, setLoaded] = React.useState(!!teachers);

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

  React.useEffect(() => {
    if (loading) {
      setTriggerActive(true);
    } else if (triggerActive) {
      setTimeout(() => {
        setLoaded(true);
      }, 500);
    }
  }, [loading, triggerActive]);

  return (
    <>
      {!loaded && <Loader fadeTrigger={!loading}/>}
      {loaded && teachers && teachers.map((teacher, i) => (
        <TeacherCard teacher={teacher} key={i}/>
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
