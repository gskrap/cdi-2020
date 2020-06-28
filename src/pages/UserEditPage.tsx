import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';
import UserForm from '../components/UserForm';

const UserEditPage: React.FC = () => {
  return (
    <IonPage id='user-edit-page'>
      <AppHeader title='Edit User' />
      <IonContent forceOverscroll={false}>
        <UserForm />
      </IonContent>
    </IonPage>
  );
};

export default UserEditPage;
