import React from 'react';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import {AppState} from '../store/defaultStore';
import {DanceClass} from '../models/DanceClass';
import Loader from './Loader';
import DanceClassCard from './DanceClassCard';

type DanceClassListProps = {
  loading: boolean,
  danceClasses: DanceClass[] | null,
}

const DanceClassList: React.FC<DanceClassListProps & MappedActions<typeof actions>> = ({
  loading,
  danceClasses,
  actions,
}) => {
  const [triggerActive, setTriggerActive] = React.useState(false);
  const [loaded, setLoaded] = React.useState(!!danceClasses);

  React.useEffect(() => {
    const fetchDanceClasses = async () => {
      try {
        await actions.fetchDanceClasses()
      } catch (e) {
        console.log(e)
      }
    };
    fetchDanceClasses();
  }, [actions]);

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
      {loaded && danceClasses && danceClasses.map((danceClass, i) => (
        <DanceClassCard key={i} danceClass={danceClass}/>
      ))}
    </>
  )
};

const mapState = (state: AppState) => {
  return {
    loading: state.danceClassesLoading,
    danceClasses: state.danceClasses,
  }
};

export default connect(mapState, actions)(DanceClassList);
