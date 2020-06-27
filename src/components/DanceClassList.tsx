import React from 'react';
import moment from 'moment-timezone';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import {AppState} from '../store/defaultStore';
import {DanceClass} from '../models/DanceClass';
import Loader from './Loader';
import DanceClassCard from './DanceClassCard';
import {IonIcon, IonItemDivider, IonToast} from '@ionic/react';
import {LOCATION_TIMEZONE} from '../constants/settingsConstants';
import {sadOutline} from 'ionicons/icons';
import {User, UserRole} from '../models/User';

type DanceClassListProps = {
  currentUser: User,
  danceClasses: DanceClass[] | null,
  loading: boolean,
}

const DanceClassList: React.FC<DanceClassListProps & MappedActions<typeof actions>> = ({
  currentUser,
  danceClasses,
  loading,
  actions,
}) => {
  const [groupedDanceClasses, setGroupedDanceClasses] = React.useState<{ [key: string]: DanceClass[]}>({});
  const [showDeleteToast, setShowDeleteToast] = React.useState(false);

  React.useEffect(() => {
    const fetchDanceClasses = async () => {
      try {
        const arg = currentUser.role === UserRole.ADMIN ? undefined : currentUser.id;
        await actions.fetchDanceClasses(arg)
      } catch (e) {
        console.error(e)
      }
    };
    fetchDanceClasses();
  }, [actions, currentUser.role, currentUser.id]);

  React.useEffect(() => {
    if (danceClasses) {
      const breakdown = danceClasses.reduce((rv, x) => {
        const key = moment(x.start_time).tz(LOCATION_TIMEZONE).format('dddd, MMMM D');
        // @ts-ignore
        (rv[key] = rv[key] || []).push(x);
        return rv;
      }, {});
      setGroupedDanceClasses(breakdown);
    }
  }, [danceClasses]);

  return (
    <>
      {loading && <Loader />}
      {danceClasses && danceClasses.length === 0 && (
        <div className='no-classes-warning'>
          <IonIcon icon={sadOutline} />
          <div>Whoa! You have no classes</div>
          <div>Try the toggle</div>
        </div>
      )}
      {groupedDanceClasses && Object.keys(groupedDanceClasses).map((date, i) => (
        <React.Fragment key={i}>
          <IonItemDivider sticky>{date}</IonItemDivider>
          {groupedDanceClasses[date as keyof typeof groupedDanceClasses].map((danceClass, j) => (
            <DanceClassCard key={`${i}-${j}`} danceClass={danceClass} showToast={() => setShowDeleteToast(true)} />
          ))}
        </React.Fragment>
      ))}
      <IonToast
        isOpen={showDeleteToast}
        onDidDismiss={() => setShowDeleteToast(false)}
        message="Class Deleted"
        position="bottom"
        duration={1200}
      />
    </>
  )
};

const mapState = (state: AppState) => {
  return {
    currentUser: state.currentUser!,
    danceClasses: state.danceClasses,
    loading: state.danceClassesLoading && !state.danceClassesLoaded,
  }
};

export default connect(mapState, actions)(DanceClassList);
