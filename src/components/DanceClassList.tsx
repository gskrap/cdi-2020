import React from 'react';
import moment from 'moment';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import {AppState} from '../store/defaultStore';
import {DanceClass} from '../models/DanceClass';
import Loader from './Loader';
import DanceClassCard from './DanceClassCard';
import {IonItemDivider, IonToast} from '@ionic/react';

type DanceClassListProps = {
  danceClasses: DanceClass[] | null,
  loading: boolean,
}

const DanceClassList: React.FC<DanceClassListProps & MappedActions<typeof actions>> = ({
  danceClasses,
  loading,
  actions,
}) => {
  const [groupedDanceClasses, setGroupedDanceClasses] = React.useState<{ [key: string]: DanceClass[]}>({});
  const [showDeleteToast, setShowDeleteToast] = React.useState(false);

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
    if (danceClasses) {
      const breakdown = danceClasses.reduce((rv, x) => {
        const key = moment(x.start_time).format('dddd, MMMM D');
        // @ts-ignore
        (rv[key] = rv[key] || []).push(x);
        return rv;
      }, {});
      setGroupedDanceClasses(breakdown);
    }
  }, [danceClasses]);

  return (
    <>
      {loading && <Loader/>}
      {groupedDanceClasses && Object.keys(groupedDanceClasses).map((date, i) => (
        <>
          <IonItemDivider sticky>{date}</IonItemDivider>
          {groupedDanceClasses[date as keyof typeof groupedDanceClasses].map((danceClass, j) => (
            <DanceClassCard key={`${i}-${j}`} danceClass={danceClass} showToast={() => setShowDeleteToast(true)}/>
          ))}
        </>
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
    loading: state.danceClassesLoading && !state.danceClassesLoaded,
  }
};

export default connect(mapState, actions)(DanceClassList);
