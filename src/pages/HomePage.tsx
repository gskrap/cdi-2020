import {IonContent, IonPage,} from '@ionic/react';
import React from 'react';
import UserLogIn from '../components/UserLogIn';
import {AppState} from '../store/defaultStore';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import DanceClassList from '../components/DanceClassList';
import Loader from '../components/Loader';
import AppHeader from '../components/AppHeader';

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

  return (
    <IonPage id='home-page'>
      <AppHeader title='Schedule'/>
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
