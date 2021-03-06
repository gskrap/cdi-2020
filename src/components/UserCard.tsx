import React from 'react';
import {IonIcon, IonItem} from '@ionic/react';
import {User, UserRole} from '../models/User';
import {body, personSharp, settingsSharp} from 'ionicons/icons';

type UserCardProps = {
  user: User,
  onClick: () => void;
  routerLink: string;
  teachersOnly?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick, routerLink, teachersOnly = false }) => {
  const { first_name, last_name } = user;

  let icon = body;

  if (!teachersOnly) {
    switch(user.role) {
      case UserRole.TEACHER:
        icon = body;
        break;
      case UserRole.STUDENT:
        icon = personSharp;
        break;
      case UserRole.WORK_STUDY:
        icon = personSharp;
        break;
      case UserRole.ADMIN:
        icon = settingsSharp;
        break;
      default:
        break;
    }
  }

  return (
    <IonItem className='fdr mvxxxxl' onClick={onClick} routerLink={routerLink} routerDirection='forward' lines='none'>
      <div className='flex1 fdr'>
        <div className='fdc fjc'>
          <div className={`profile-bubble ${user.archived ? 'archived' : ''}`}>
            <IonIcon icon={icon} />
          </div>
        </div>
        <div className='font18 user-card-info'>
          <span className='openSansExtraBold'>{first_name}</span>
          <span>&nbsp;</span>
          <span className='openSansExtraBold'>{last_name}</span>
          {!teachersOnly && <div>{user.role}</div>}
        </div>
      </div>
    </IonItem>
  )
};

export default UserCard;
