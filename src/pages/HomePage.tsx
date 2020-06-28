import {IonContent, IonPage, IonRefresher, IonRefresherContent,} from '@ionic/react';
import React from 'react';
import UserLogInRegisterFormContainer from '../components/UserLogInRegisterFormContainer';
import {AppState} from '../store/defaultStore';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import DanceClassList from '../components/DanceClassList';
import Loader from '../components/Loader';
import AppHeader from '../components/AppHeader';
import {chevronDownCircleOutline} from 'ionicons/icons';
import {RefresherEventDetail} from '@ionic/core';
import {CLASS_FILTER} from '../constants/settingsConstants';
import {User, UserRole} from '../models/User';

type HomePageProps = {
  currentUser: User | null,
  danceClassFilter: CLASS_FILTER,
  loading: boolean,
  loggedIn: boolean,
}

const HomePage: React.FC<HomePageProps & MappedActions<typeof actions>> = ({
  currentUser,
  danceClassFilter,
  loading,
  loggedIn,
  actions,
}) => {
  React.useEffect(() => {
    if (window.localStorage.getItem('auth_token')) {
      actions.fetchPermissions().catch(e => {
        console.error(e)
      })
    }
    actions.fetchGroups();
    actions.fetchLocations();
    actions.fetchTeachers();
  }, [actions]);

  const refresh = (event: CustomEvent<RefresherEventDetail>) => {
    const arg = danceClassFilter === CLASS_FILTER.ALL ? undefined : currentUser!.id;
    actions.fetchDanceClasses(arg, event.detail.complete);
  };

  const title = loggedIn
    ? danceClassFilter === CLASS_FILTER.ALL
    ? 'All Classes'
    : 'My Classes'
    : 'Welcome!';

  return (
    <IonPage id='home-page'>
      <AppHeader title={title} showFilterToggle={loggedIn && currentUser!.role !== UserRole.STUDENT} />
      <IonContent forceOverscroll={false}>
        {loggedIn &&  (
          <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              refreshingSpinner="circles"
            >
            </IonRefresherContent>
          </IonRefresher>
        )}
        {loading && <Loader />}
        {!loading && !loggedIn && <UserLogInRegisterFormContainer />}
        {!loading && loggedIn && <DanceClassList />}
      </IonContent>
    </IonPage>
  );
};

const mapState = (state: AppState) => {
  return {
    currentUser: state.currentUser,
    danceClassFilter: state.danceClassFilter,
    loading: state.logInLoading,
    loggedIn: state.loggedIn,
  }
};

export default connect(mapState, actions)(HomePage);
