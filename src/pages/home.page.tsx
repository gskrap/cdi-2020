import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import UserLogInComponent from '../components/user-log-in.component';

const HomePage: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="title-text">CDI</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <UserLogInComponent />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
