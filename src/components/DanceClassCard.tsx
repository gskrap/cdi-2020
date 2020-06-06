import {DanceClass} from '../models/DanceClass';
import {IonCard, IonCardContent, IonIcon} from '@ionic/react';
import React from 'react';
import moment from 'moment';
import {arrowUndoOutline, locationOutline, peopleCircleOutline, timeOutline} from 'ionicons/icons';

type DanceClassCardProps = {
  danceClass: DanceClass,
}

const DanceClassCard: React.FC<DanceClassCardProps> = ({ danceClass }) => {
  const { end_time, location, name, start_time, teacher, secondary_teacher } = danceClass;
  const start = moment(start_time).format('h:mm a');
  const end = moment(end_time).format('h:mm a');

  return (
    <IonCard>
      <IonCardContent>
        <div className='openSansExtraBold font18 tac mbxxxl'>{name}</div>
        <div className='fdr font16'>
          <div className='flex1'>
            {location && <div><IonIcon className='prm' icon={locationOutline}/>{location.name}</div>}
            {start_time && <div><IonIcon className='prm' icon={timeOutline}/>{start}</div>}
            {end_time && <div><IonIcon className='plm r180' icon={arrowUndoOutline}/>{end}</div>}
          </div>
          <div className='flex1 tar'>
            {teacher && <div>{`${teacher.first_name} ${teacher.last_name}`}</div>}
            {secondary_teacher && (
              <>
                <div>{`${secondary_teacher.first_name} ${secondary_teacher.last_name}`}</div>
              </>
            )}
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  )
};

export default DanceClassCard;
