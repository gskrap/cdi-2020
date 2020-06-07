import React from 'react';
import {IonIcon} from '@ionic/react';
import {User} from '../models/User';
import {bodyOutline} from 'ionicons/icons';

type TeacherCardProps = {
  teacher: User,
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const { first_name, last_name } = teacher;

  return (
    <div className='fdr mvxxxxl mhs'>
      <div className='flex1 fdr'>
        <div className='plxl fdc fjc'>
          <div className='profile-bubble'>
            <IonIcon icon={bodyOutline}/>
          </div>
        </div>
        <div className='font18 teacher-name'>
          <span className='openSansExtraBold'>{first_name}</span>
          <span>&nbsp;</span>
          <span className='openSansExtraBold'>{last_name}</span>
        </div>
      </div>
    </div>
  )
};

export default TeacherCard;
