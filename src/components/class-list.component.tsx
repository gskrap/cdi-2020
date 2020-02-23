import React from 'react';
import {IonCard, IonCardContent} from '@ionic/react';

const ClassListComponent: React.FC = () => (
  <>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => {
      return (
        <IonCard key={i}>
          <IonCardContent>
            Class {i}
          </IonCardContent>
        </IonCard>
      )
    })}
  </>
)

export default ClassListComponent;