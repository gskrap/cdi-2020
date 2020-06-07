import React from 'react';
import {IonButtons, IonHeader, IonBackButton, IonTitle, IonToolbar} from '@ionic/react';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import { menuController } from '@ionic/core';
import actions from '../actions/actions';

type AppHeaderProps = {
  loggedIn: boolean,
  title: string,
}

const AppHeader: React.FC<AppHeaderProps> = ({ loggedIn, title }) => (
  <IonHeader>
    <IonToolbar color='primary'>
      <IonButtons slot='start'>
        <IonBackButton text=''></IonBackButton>
      </IonButtons>
      <IonTitle className='openSansExtraBold'>{title}</IonTitle>
      {loggedIn && (
        <IonButtons slot='end'>
          <div onClick={() => menuController.open()} className='plxxxl'>
            <img className='header-image' src='/assets/cdi-logo-white-small.png' alt='logo-small'/>
          </div>
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
