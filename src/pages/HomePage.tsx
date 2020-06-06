import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import UserLogIn from '../components/UserLogIn';
import {AppState} from '../store/defaultStore';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import DanceClassList from '../components/DanceClassList';
import {logOutOutline} from 'ionicons/icons';
import Loader from '../components/Loader';

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
      const fetchPermissions = async () => {
        try {
          await actions.fetchPermissions()
        } catch (e) {
          console.log(e)
        }
      };
      fetchPermissions();
    }
  }, [actions]);

  const renderLogOutButton = () => (
    <IonButtons slot='end'>
      <IonButton onClick={() => actions.logOut()}>
        <IonIcon icon={logOutOutline}></IonIcon>
      </IonButton>
    </IonButtons>
  );

  return (
    <IonPage id='home-page'>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle className='title-text'>CDI</IonTitle>
          {loggedIn && renderLogOutButton()}
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
