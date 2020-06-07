import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';

const AdminPage: React.FC = () => {
  return (
    <IonPage id='admin-page'>
      <AppHeader title='Admin'/>
      <IonContent>
        <div>admin page</div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;
