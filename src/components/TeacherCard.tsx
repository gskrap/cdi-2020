import React from 'react';
import {IonIcon, IonItem} from '@ionic/react';
import {User} from '../models/User';
import {body} from 'ionicons/icons';

type TeacherCardProps = {
  teacher: User,
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const { first_name, last_name } = teacher;

  return (
    <IonItem className='fdr mvxxxxl' routerLink={`/teachers/${teacher.id}`} routerDirection='forward' lines='none'>
      <div className='flex1 fdr'>
        <div className='fdc fjc'>
          <div className='profile-bubble'>
            <IonIcon icon={body}/>
          </div>
        </div>
        <div className='font18 teacher-name'>
          <span className='openSansExtraBold'>{first_name}</span>
          <span>&nbsp;</span>
          <span className='openSansExtraBold'>{last_name}</span>
        </div>
      </div>
    </IonItem>
  )
};

export default TeacherCard;
