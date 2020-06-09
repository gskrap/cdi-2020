import React from 'react';
import {DanceClass} from '../models/DanceClass';
import {IonButton, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTextarea} from '@ionic/react';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions, {MappedActions, TIMEOUT} from '../actions/actions';
import {User} from '../models/User';
import {API, checkHttpResponse} from '../helpers/httpHelper';
import {useHistory} from 'react-router';
import {StudentGroup} from '../models/StudentGroup';
import {DanceClassLocation} from '../models/DanceClassLocation';

type DanceClassFormProps = {
  danceClass?: DanceClass;
  groups: StudentGroup[] | null;
  locations: DanceClassLocation[] | null;
  teachers: User[] | null;
};

const DanceClassForm: React.FC<DanceClassFormProps & MappedActions<typeof  actions>> = ({
  danceClass,
  groups,
  locations,
  teachers,
  actions
}) => {
  const history = useHistory();

  React.useEffect(() => {
    if (!groups) {
      actions.fetchGroups().catch((e) => {
        console.error(e);
      });
    }

    if (!locations) {
      actions.fetchLocations().catch((e) => {
        console.error(e);
      });
    }

    if (!teachers) {
      actions.fetchTeachers().catch((e) => {
        console.error(e);
      });
    }
  }, [groups, locations, teachers, actions]);

  const [name, setName] = React.useState(danceClass ? danceClass.name : '');
  const [notes, setNotes] = React.useState(danceClass ? danceClass.notes : '');
  const [groupIds, setGroupIds] = React.useState(danceClass ? danceClass.groups.map(g => g.id) : []);
  const [locationId, setLocationId] = React.useState(danceClass ? danceClass.location_id : 0);
  const [teacherIds, setTeacherIds] = React.useState(danceClass ? danceClass.teachers.map(t => t.id) : []);

  const handleSave = async () => {
    const strippedDanceClass = {
      name: danceClass ? danceClass.name : '',
      location_id: danceClass ? danceClass.location_id : 0,
      start_time: danceClass ? danceClass.start_time : null,
      end_time: danceClass ? danceClass.end_time : null,
      notes: danceClass ? danceClass.notes : null,
    };

    const postBody = {
      dance_class: {
        ...strippedDanceClass,
        location_id: locationId,
        name: name,
        notes: notes,
      },
      group_ids: groupIds,
      teacher_ids: teacherIds,
    } ;

    try {
      const response = await API.put(`/dance_classes/${danceClass!.id}`, postBody);
      await checkHttpResponse(response);
      actions.fetchDanceClasses();
      history.goBack()
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='fdc fjb height100'>
      <IonList>
        <IonItem>
          <IonLabel position="floating">Class Name</IonLabel>
          <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Teachers</IonLabel>
          <IonSelect value={teacherIds} multiple={true} cancelText="Cancel" okText="OK" onIonChange={e => setTeacherIds(e.detail.value)}>
            {teachers && teachers.map((teacher, i) => (
              <IonSelectOption key={i} value={teacher.id}>{`${teacher.first_name} ${teacher.last_name}`}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Groups</IonLabel>
          <IonSelect value={groupIds} multiple={true} cancelText="Cancel" okText="OK" onIonChange={e => setGroupIds(e.detail.value)}>
            {groups && groups.map((group, i) => (
              <IonSelectOption key={i} value={group.id}>{group.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Location</IonLabel>
          <IonSelect value={locationId} cancelText="Cancel" okText="OK" onIonChange={e => setLocationId(e.detail.value)}>
            {locations && locations.map((location, i) => (
              <IonSelectOption key={i} value={location.id}>{location.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Notes</IonLabel>
          <IonTextarea value={notes} rows={4} onIonChange={e => setNotes(e.detail.value!)}></IonTextarea>
        </IonItem>
      </IonList>
      <IonButton expand="block" onClick={handleSave}>Save Class</IonButton>
    </div>
  );
};

const mapState = ({ groups, locations, teachers }: AppState) => {
  return { groups, locations, teachers }
};

export default connect(mapState, actions)(DanceClassForm);
