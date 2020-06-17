import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';

const UserDetailsPage: React.FC = () => {
  return (
    <IonPage id='user-details-page'>
      <AppHeader title="User"/>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default UserDetailsPage;
