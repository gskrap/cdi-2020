import {IonContent, IonPage, IonRefresher, IonRefresherContent,} from '@ionic/react';
import React from 'react';
import UserLogIn from '../components/UserLogIn';
import {AppState} from '../store/defaultStore';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import DanceClassList from '../components/DanceClassList';
import Loader from '../components/Loader';
import AppHeader from '../components/AppHeader';
import {chevronDownCircleOutline} from 'ionicons/icons';
import {RefresherEventDetail} from '@ionic/core';

type HomePageProps = {
  loading: boolean,
  loggedIn: boolean,
}

const HomePage: React.FC<HomePageProps & MappedActions<typeof actions>> = ({
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
    actions.fetchDanceClasses(undefined, event.detail.complete);
  };

  return (
    <IonPage id='home-page'>
      <AppHeader title='Schedule'/>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            refreshingSpinner="circles"
          >
          </IonRefresherContent>
        </IonRefresher>
        {loading && <Loader/>}
        {!loading && !loggedIn && <UserLogIn/>}
        {!loading && loggedIn && <DanceClassList/>}
      </IonContent>
    </IonPage>
  );
};

const mapState = (state: AppState) => {
  return {
    loading: state.logInLoading,
    loggedIn: state.loggedIn,
  }
};

export default connect(mapState, actions)(HomePage);
