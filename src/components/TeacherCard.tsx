import React from 'react';
import {IonCard, IonCardContent} from '@ionic/react';
import {User} from '../models/User';

type TeacherCardProps = {
  teacher: User,
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const { first_name, last_name } = teacher;

  return (
    <IonCard>
      <IonCardContent>
        <span>{first_name}</span>
        <span>{last_name}</span>
      </IonCardContent>
    </IonCard>
  )
};

export default TeacherCard;
