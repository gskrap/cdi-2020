import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';
import {RouteComponentProps} from 'react-router';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions from '../actions/actions';
import {User} from '../models/User';

type TeacherDetailsPageProps = {
  teacher: User;
};

const TeacherDetailsPage: React.FC<TeacherDetailsPageProps & RouteComponentProps> = ({ teacher, match }) => {
  return (
    <IonPage id='teacher-details-page'>
      <AppHeader title={teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Teacher Details'}/>
      <IonContent>
        {teacher && (
          <div className='phxxl'>
            <p>{teacher.bio}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

const mapState = (state: AppState, props: { match: { params: { teacherId: string } } }) => {
  const teacher = (state.teachers || []).find(t => t.id === Number(props.match.params.teacherId))!;
  return { teacher }
};

export default connect(mapState, actions)(TeacherDetailsPage);
