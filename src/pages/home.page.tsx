import {IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="title-text">CDI</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
          return (
            <IonCard>
              <IonCardContent>
                Class {i}
              </IonCardContent>
            </IonCard>
          )
        })}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
