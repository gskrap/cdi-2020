import {DanceClass} from '../models/DanceClass';
import {IonCard, IonCardContent} from '@ionic/react';
import React from 'react';

type DanceClassCardProps = {
  danceClass: DanceClass,
}

const DanceClassCard: React.FC<DanceClassCardProps> = ({ danceClass }) => {
  const { name, teacher, secondary_teacher } = danceClass;

  return (
    <IonCard>
      <IonCardContent>
        <div>{name}</div>
        {teacher && <div>{`Teacher: ${teacher.first_name}`}</div>}
        {secondary_teacher && <div>{`Other Teacher: ${secondary_teacher.first_name}`}</div>}
      </IonCardContent>
    </IonCard>
  )
};

export default DanceClassCard;
