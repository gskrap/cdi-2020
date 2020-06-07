import React from 'react';
import {DanceClass} from '../models/DanceClass';
import {IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption} from '@ionic/react';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';
import {User} from '../models/User';

type DanceClassFormProps = {
  danceClass?: DanceClass;
  teachers: User[] | null;
};

const DanceClassForm: React.FC<DanceClassFormProps & MappedActions<typeof  actions>> = ({ danceClass, teachers, actions }) => {
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
  const [teacherIds, setTeacherIds] = React.useState(danceClass ? danceClass.teachers.map(t => t.id) : []);

  return (
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
    </IonList>
  );
};

const mapState = (state: AppState) => {
  return { teachers: state.teachers }
};

export default connect(mapState, actions)(DanceClassForm);
