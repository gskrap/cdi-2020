import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import UserLogInComponent from '../components/UserLogIn';
import {AppState} from '../store/defaultStore';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import ClassList from '../components/ClassList';
import {logOutOutline} from 'ionicons/icons';

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

  const renderLoader = () => (
    <div className='fdr fjc'>
      <h1>Loading</h1>
    </div>
  );

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
        {loading && renderLoader()}
        {!loading && !loggedIn && <UserLogInComponent/>}
        {loggedIn && <ClassList/>}
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
