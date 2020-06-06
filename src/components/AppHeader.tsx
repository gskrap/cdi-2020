import React from 'react';
import {IonButtons, IonHeader, IonBackButton, IonMenuButton, IonTitle, IonToolbar} from '@ionic/react';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions from '../actions/actions';

type AppHeaderProps = {
  loggedIn: boolean,
}

const AppHeader: React.FC<AppHeaderProps> = ({ loggedIn }) => (
  <IonHeader>
    <IonToolbar color='primary'>
      <IonButtons slot='start'>
        <IonBackButton text=''></IonBackButton>
      </IonButtons>
      <IonTitle className='title-text'>CDI</IonTitle>
      {loggedIn && (
        <IonButtons slot='end'>
          <IonMenuButton/>
        </IonButtons>
      )}
    </IonToolbar>
  </IonHeader>
);

const mapState = (state: AppState) => {
  return {
    loggedIn: state.loggedIn,
  }
};

export default connect(mapState, actions)(AppHeader);
