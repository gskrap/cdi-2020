import {DanceClass} from '../models/DanceClass';
import {IonCard, IonCardContent, IonIcon} from '@ionic/react';
import React from 'react';
import moment from 'moment';
import {
  arrowUndoOutline,
  bodyOutline,
  locationOutline,
  peopleCircleOutline,
  timeOutline
} from 'ionicons/icons';

type DanceClassCardProps = {
  danceClass: DanceClass,
}

const DanceClassCard: React.FC<DanceClassCardProps> = ({ danceClass }) => {
  const { end_time, groups, location, name, start_time, teacher, secondary_teacher } = danceClass;
  const start = moment(start_time).format('h:mm a');
  const end = moment(end_time).format('h:mm a');

  return (
    <div className='fdr'>
      <div className='phxl fdc fjc'>
        <div className='time-bubble tac'>
          <div className='font14 openSansBold'><IonIcon className='prm' icon={timeOutline}/>{start}</div>
          <div className='font14 openSansBold'><IonIcon className='plm r180' icon={arrowUndoOutline}/>{end}</div>
        </div>
      </div>
      <IonCard className='flex1'>
        <IonCardContent>
          <div className='openSansExtraBold font14 mbxl'>{name}</div>
          {location && <div className='mbxl'><IonIcon className='prm' icon={locationOutline}/>{location.name}</div>}
          {groups && (
            <div className='mbxl'>
              {groups.map((group, i) => (
                <div className={i !== 0 ? 'padded20' : ''}>
                  {i === 0 ? <IonIcon className='prm' icon={peopleCircleOutline}/> : null}
                  {group.name}
                </div>
              ))}
            </div>
          )}
          {teacher && <div><IonIcon className='prm' icon={bodyOutline}/>{`${teacher.first_name} ${teacher.last_name}`}</div>}
          {secondary_teacher && <div className='padded20'>{`${secondary_teacher.first_name} ${secondary_teacher.last_name}`}</div>}
        </IonCardContent>
      </IonCard>
    </div>
  )
};

export default DanceClassCard;
