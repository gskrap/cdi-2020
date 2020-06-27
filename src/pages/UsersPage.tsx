import {IonContent, IonPage} from '@ionic/react';
import AppHeader from '../components/AppHeader';
import React from 'react';
import UserList from '../components/UserList';

const UsersPage: React.FC = () => {
  return (
    <IonPage id='users-page'>
      <AppHeader title='All Users' />
      <IonContent>
        <UserList />
      </IonContent>
    </IonPage>
  );
};

export default UsersPage;
