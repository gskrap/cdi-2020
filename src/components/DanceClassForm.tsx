import React from 'react';
import {DanceClass} from '../models/DanceClass';
import {IonButton, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTextarea} from '@ionic/react';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions, {MappedActions, TIMEOUT} from '../actions/actions';
import {User} from '../models/User';
import {API, checkHttpResponse} from '../helpers/httpHelper';
import {useHistory} from 'react-router';

type DanceClassFormProps = {
  danceClass?: DanceClass;
  teachers: User[] | null;
};

const DanceClassForm: React.FC<DanceClassFormProps & MappedActions<typeof  actions>> = ({ danceClass, teachers, actions }) => {
  const history = useHistory();

  React.useEffect(() => {
    if (!teachers) {
      const fetchTeachers = async () => {
        try {
          await actions.fetchTeachers()
        } catch (e) {
          console.error(e)
        }
      };
      fetchTeachers();
    }
  }, [teachers, actions]);

  const [name, setName] = React.useState(danceClass ? danceClass.name : '');
  const [notes, setNotes] = React.useState(danceClass ? danceClass.notes : '');
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
        name: name,
        notes: notes,
      },
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
          <IonLabel position="floating">Notes</IonLabel>
          <IonTextarea value={notes} rows={4} onIonChange={e => setNotes(e.detail.value!)}></IonTextarea>
        </IonItem>
      </IonList>
      <IonButton expand="block" onClick={handleSave}>Save Class</IonButton>
    </div>
  );
};

const mapState = (state: AppState) => {
  return { teachers: state.teachers }
};

export default connect(mapState, actions)(DanceClassForm);
