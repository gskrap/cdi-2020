import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import UserLogInComponent from '../components/user-log-in.component';
import {AppState, AppThunkDispatch} from '../store/default-store';
import {getPermissions, logOut} from '../actions/actions';
import {connect} from 'react-redux';
import ClassListComponent from '../components/class-list.component';
import {logOutOutline} from 'ionicons/icons';

type HomePageProps = {
  appLoading: boolean,
  loggedIn: boolean,
  getPermissions: () => void,
  logOut: () => void,
}

class HomePage extends React.Component<HomePageProps, {}> {
  componentDidMount() {
    this.checkUserStatus();
  }

  checkUserStatus() {
    if (window.localStorage.getItem('auth_token')) {
      this.props.getPermissions()
    }
  }

  renderView() {
    return (
      this.props.appLoading ?
        <div className='fdr fjc'>
          <h1>Loading</h1>
        </div>
        :
        this.props.loggedIn ?
          <ClassListComponent/> :
          <UserLogInComponent/>
    )
  }

  renderLogOutButton() {
    if (this.props.loggedIn) {
      return <>
        <IonButtons slot='end'>
          <IonButton onClick={this.props.logOut}>
            <IonIcon icon={logOutOutline}></IonIcon>
          </IonButton>
        </IonButtons>
      </>
    }
  }

  render() {
    return <>
      <IonPage id='home-page'>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle className='title-text'>CDI</IonTitle>
            {this.renderLogOutButton()}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {this.renderView()}
        </IonContent>
      </IonPage>
    </>
  }
}

const mapState = (state: AppState) => {
  return {
    appLoading: state.appLoading,
    loggedIn: state.loggedIn,
  }
};

const mapDispatch = (dispatch: AppThunkDispatch) => {
  return {
    getPermissions: () => {
      dispatch(getPermissions())
    },
    logOut: () => {
      dispatch(logOut())
    },
  }
};

export default connect(mapState, mapDispatch)(HomePage);
