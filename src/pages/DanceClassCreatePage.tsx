import React from 'react';
import {IonContent, IonPage} from '@ionic/react';
import AppHeader from '../components/AppHeader';
import {UserRole} from '../models/User';
import DanceClassForm from '../components/DanceClassForm';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';

interface DanceClassCreatePageProps {
  userRole: UserRole | null;
}

const DanceClassCreatePage: React.FC<DanceClassCreatePageProps> = ({ userRole }) => (
  <IonPage id='dance-class-create-page'>
    <AppHeader title='Create Class' />
    <IonContent forceOverscroll={false}>
      {userRole === UserRole.ADMIN && (
        <DanceClassForm />
      )}
    </IonContent>
  </IonPage>
);

const mapState = (state: AppState) => {
  const userRole = state.currentUser && state.currentUser.role;
  return { userRole }
};

export default connect(mapState)(DanceClassCreatePage);
