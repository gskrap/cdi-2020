import React from 'react';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import {AppState} from '../store/defaultStore';
import {DanceClass} from '../models/DanceClass';
import Loader from './Loader';
import DanceClassCard from './DanceClassCard';
import {IonToast} from '@ionic/react';

type DanceClassListProps = {
  danceClasses: DanceClass[] | null,
  loading: boolean,
}

const DanceClassList: React.FC<DanceClassListProps & MappedActions<typeof actions>> = ({
  danceClasses,
  loading,
  actions,
}) => {
  const [showDeleteToast, setShowDeleteToast] = React.useState(false);
  const [triggerActive, setTriggerActive] = React.useState(false);
  const [loaded, setLoaded] = React.useState(!!danceClasses);

  React.useEffect(() => {
    const fetchDanceClasses = async () => {
      try {
        await actions.fetchDanceClasses()
      } catch (e) {
        console.error(e)
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
        <DanceClassCard key={i} danceClass={danceClass} showToast={() => setShowDeleteToast(true)}/>
      ))}
      <IonToast
        isOpen={showDeleteToast}
        onDidDismiss={() => setShowDeleteToast(false)}
        message="Class Successfully Deleted"
        position="bottom"
        duration={1200}
      />
    </>
  )
};

const mapState = (state: AppState) => {
  return {
    danceClasses: state.danceClasses,
    loading: state.danceClassesLoading,
  }
};

export default connect(mapState, actions)(DanceClassList);
