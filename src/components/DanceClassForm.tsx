import React from 'react';
import {DanceClass} from '../models/DanceClass';
import {IonInput, IonItem, IonLabel, IonList} from '@ionic/react';

type DanceClassFormProps = {
  danceClass?: DanceClass;
};

const DanceClassForm: React.FC<DanceClassFormProps> = ({ danceClass }) => {
  const  [name, setName] = React.useState(danceClass ? danceClass.name : '') ;

  return (
    <IonList>
      <IonItem>
        <IonLabel position="floating">Class Name</IonLabel>
        <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
      </IonItem>
    </IonList>
  );
};

export default DanceClassForm;
