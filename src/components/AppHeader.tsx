import React from 'react';
import {IonBackButton, IonButtons, IonHeader, IonTitle, IonToggle, IonToolbar} from '@ionic/react';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import {menuController} from '@ionic/core';
import actions, {MappedActions} from '../actions/actions';
import {CLASS_FILTER} from '../constants/settingsConstants';

type AppHeaderProps = {
  currentUserId: number | null,
  danceClassFilter: CLASS_FILTER,
  loggedIn: boolean,
  title: string,
  showFilterToggle?: boolean,
  onClick?: () => void,
}

const AppHeader: React.FC<AppHeaderProps & MappedActions<typeof actions>> = ({
  currentUserId,
  danceClassFilter,
  loggedIn,
  title,
  showFilterToggle,
  onClick,
  actions,
}) => {
  const handleTitleClick = () => {
    if (onClick) onClick();
  };

  return (
    <IonHeader>
      <IonToolbar color='primary'>
        <IonButtons slot='start'>
          {showFilterToggle && (
            <IonToggle
              checked={danceClassFilter === CLASS_FILTER.ALL}
              onIonChange={() => {
                const arg = danceClassFilter === CLASS_FILTER.ALL ? currentUserId! : undefined;
                setTimeout(() => {
                  actions.fetchDanceClasses(arg);
                }, 200)
              }}
            />
          )}
          <IonBackButton text=''></IonBackButton>
        </IonButtons>
        <IonTitle className='openSansExtraBold' onClick={handleTitleClick}>{title}</IonTitle>
        {loggedIn && (
          <IonButtons slot='end'>
            <div onClick={() => menuController.open()} className='plxxxl prs'>
              <img className='header-image' src='/assets/cdi-logo-white-small.png' alt='logo-small'/>
            </div>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  )
};

const mapState = (state: AppState) => {
  return {
    currentUserId: state.currentUser && state.currentUser.id,
    danceClassFilter: state.danceClassFilter,
    loggedIn: state.loggedIn,
  }
};

export default connect(mapState, actions)(AppHeader);
