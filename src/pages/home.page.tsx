import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import ClassListContainer from '../containers/class-list.container';

const HomePage: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="title-text">CDI</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ClassListContainer/>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
