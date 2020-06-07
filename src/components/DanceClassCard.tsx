import {DanceClass} from '../models/DanceClass';
import {IonAlert, IonCard, IonCardContent, IonFab, IonFabButton, IonFabList, IonIcon} from '@ionic/react';
import React from 'react';
import moment from 'moment';
import {
  arrowUndoOutline,
  body,
  caretDownOutline,
  createOutline,
  locationOutline,
  peopleCircleOutline,
  timeOutline,
  trash,
} from 'ionicons/icons';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';
import {UserRole} from '../models/User';

type DanceClassCardProps = {
  danceClass: DanceClass,
  enableEdit: boolean,
  showToast: () => void,
};

const DanceClassCard: React.FC<DanceClassCardProps & MappedActions<typeof actions>> = ({ danceClass, enableEdit, showToast, actions }) => {
  const [showDeleteWarning, setShowDeleteWarning] = React.useState(false);
  const { end_time, groups, location_id, name, start_time, teachers } = danceClass;
  const start = moment(start_time).format('h:mm a');
  const end = moment(end_time).format('h:mm a');

  const handleDelete = () => {
    try {
      actions.deleteDanceClass(danceClass.id, () => {
        showToast();
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <IonAlert
        isOpen={showDeleteWarning}
        onDidDismiss={() => setShowDeleteWarning(false)}
        cssClass='delete-dance-class-warning'
        header={'Are you sure?'}
        message={`Delete ${danceClass.name}?`}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Delete',
            handler: handleDelete
          }
        ]}
      />
      <div className='fdr'>
        <div className='phxl fdc fjc'>
          <div className='time-bubble tac'>
            <div className='font14 openSansBold'><IonIcon className='prm' icon={timeOutline}/>{start}</div>
            <div className='font14 openSansBold'><IonIcon className='plm r180' icon={arrowUndoOutline}/>{end}</div>
          </div>
        </div>
        <IonCard className='flex1'>
          <IonCardContent>
            {enableEdit && (
              <IonFab vertical="top" horizontal="end" slot="fixed">
                <IonFabButton>
                  <IonIcon icon={caretDownOutline} />
                </IonFabButton>
                <IonFabList side="bottom">
                  <IonFabButton routerLink={`/danceClasses/${danceClass.id}/edit`} routerDirection='forward'>
                    <IonIcon icon={createOutline} />
                  </IonFabButton>
                  <IonFabButton onClick={() => setShowDeleteWarning(true)}>
                    <IonIcon icon={trash} />
                  </IonFabButton>
                </IonFabList>
              </IonFab>
            )}
            <div className='openSansExtraBold font14 mbxl prxxxl'>{name}</div>
            {location_id && <div className='mbxl'><IonIcon className='prm' icon={locationOutline}/>{location_id}</div>}
            {groups && (
              <div className='mbxl'>
                {groups.map((group, i) => (
                  <div className={i !== 0 ? 'padded20' : ''} key={i}>
                    {i === 0 ? <IonIcon className='prm' icon={peopleCircleOutline}/> : null}
                    {group.name}
                  </div>
                ))}
              </div>
            )}
            {teachers && (
             <>
               {teachers.map((teacher, i) => (
                 <div className={i !== 0 ? 'padded20' : ''} key={i}>
                   {i === 0 ? <IonIcon className='prm' icon={body}/> : null}
                   {`${teacher.first_name} ${teacher.last_name}`}
                 </div>
               ))}
             </>
            )}
          </IonCardContent>
        </IonCard>
      </div>
    </>
  )
};

const mapState = (state: AppState) => {
  const enableEdit = Boolean(state.currentUser && state.currentUser.role === UserRole.ADMIN);
  return { enableEdit };
};

export default connect(mapState, actions)(DanceClassCard);
