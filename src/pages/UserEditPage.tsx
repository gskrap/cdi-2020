import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';
import UserForm from '../components/UserForm';

const UserEditPage: React.FC = (props: any) => {
  return (
    <IonPage id='user-edit-page'>
      <AppHeader title='Edit User' />
      <IonContent forceOverscroll={false}>
        <UserForm userToEdit={props.location.userToEdit} />
      </IonContent>
    </IonPage>
  );
};

export default UserEditPage;
