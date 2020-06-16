import React from 'react';
import {DanceClass} from '../models/DanceClass';
import {
  IonButton,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea
} from '@ionic/react';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions, {MappedActions, TIMEOUT} from '../actions/actions';
import {User} from '../models/User';
import {API, checkHttpResponse} from '../helpers/httpHelper';
import {useHistory} from 'react-router';
import {StudentGroup} from '../models/StudentGroup';
import {DanceClassLocation} from '../models/DanceClassLocation';
import moment from '../helpers/myMoment';

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

  // @ts-ignore
  const startMomentRounded = moment().roundNext15Min();
  const dateMoment = danceClass ? moment(danceClass.start_time) : startMomentRounded.clone();
  const startTimeMoment = startMomentRounded.clone();
  const endTimeMoment = danceClass ? moment(danceClass.end_time) : startMomentRounded.clone();

  const [name, setName] = React.useState(danceClass ? danceClass.name : '');
  const [notes, setNotes] = React.useState(danceClass ? danceClass.notes : '');
  const [date, setDate] = React.useState(dateMoment.format());
  const [startTime, setStartTime] = React.useState(startTimeMoment.format());
  const [endTime, setEndTime] = React.useState(endTimeMoment.format());
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

    const start_time = moment(date)
      .hour(moment(startTime).hour())
      .minute(moment(startTime).minute());

    const end_time = moment(date)
      .hour(moment(endTime).hour())
      .minute(moment(endTime).minute());

    const postBody = {
      dance_class: {
        ...strippedDanceClass,
        location_id: locationId,
        name: name,
        notes: notes,
        start_time,
        end_time,
      },
      group_ids: groupIds,
      teacher_ids: teacherIds,
    } ;

    try {
      const response = danceClass
        ? await API.put(`/dance_classes/${danceClass!.id}`, postBody)
        : await API.post('/dance_classes', postBody)
      await checkHttpResponse(response);
      actions.fetchDanceClasses();
      history.goBack()
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='fdc fjb height100'>
      <IonList className='prxxl'>
        <IonItem>
          <IonLabel position='floating'>Class Name</IonLabel>
          <IonInput
            value={name}
            onIonChange={e => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Date</IonLabel>
          <IonDatetime
            displayFormat='MMM D YYYY'
            min='2000-06-01'
            max='2021-12-25'
            value={date}
            onIonChange={e => setDate(e.detail.value!)}
          />
        </IonItem>

        <div className='fdr'>
          <IonItem className='flex1 '>
            <IonLabel position='floating'>Start Time</IonLabel>
            <IonDatetime
              displayFormat='hh:mm a'
              minuteValues='0,15,30,45'
              value={startTime}
              onIonChange={e => setStartTime(e.detail.value!)}
            />
          </IonItem>

          <IonItem className='flex1 ion-no-padding'>
            <IonLabel position='floating'>End Time</IonLabel>
            <IonDatetime
              displayFormat='hh:mm a'
              minuteValues='0,15,30,45'
              value={endTime}
              onIonChange={e => setEndTime(e.detail.value!)}
            />
          </IonItem>
        </div>

        <IonItem>
          <IonLabel position='floating'>Teachers</IonLabel>
          <IonSelect
            value={teacherIds}
            multiple={true}
            cancelText='Cancel'
            okText='OK'
            mode='ios'
            onIonChange={e => setTeacherIds(e.detail.value)}
          >
            {teachers && teachers.map((teacher, i) => (
              <IonSelectOption key={i} value={teacher.id}>{`${teacher.first_name} ${teacher.last_name}`}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Groups</IonLabel>
          <IonSelect
            value={groupIds}
            multiple={true}
            cancelText='Cancel'
            okText='OK'
            mode='ios'
            onIonChange={e => setGroupIds(e.detail.value)}
          >
            {groups && groups.map((group, i) => (
              <IonSelectOption key={i} value={group.id}>{group.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Location</IonLabel>
          <IonSelect
            value={locationId}
            cancelText='Cancel'
            okText='OK'
            mode='ios'
            onIonChange={e => setLocationId(e.detail.value)}
          >
            {locations && locations.map((location, i) => (
              <IonSelectOption key={i} value={location.id}>{location.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Notes</IonLabel>
          <IonTextarea value={notes} rows={4} onIonChange={e => setNotes(e.detail.value!)} />
        </IonItem>
      </IonList>
      <IonButton expand='block' onClick={handleSave}>Save Class</IonButton>
    </div>
  );
};

const mapState = ({ groups, locations, teachers }: AppState) => {
  return { groups, locations, teachers }
};

export default connect(mapState, actions)(DanceClassForm);
