import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';
import {RouteComponentProps} from 'react-router';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions from '../actions/actions';
import {DanceClass} from '../models/DanceClass';
import {UserRole} from '../models/User';
import DanceClassForm from '../components/DanceClassForm';

type DanceClassDetailsPageProps = {
  danceClass: DanceClass;
  userRole: UserRole | null;
};

const DanceClassDetailsPage: React.FC<DanceClassDetailsPageProps & RouteComponentProps> = ({ danceClass, userRole, match }) => (
  <IonPage id='dance-class-details-page'>
    <AppHeader title="Edit Class"/>
    <IonContent forceOverscroll={false}>
      {userRole === UserRole.ADMIN && danceClass && (
        <DanceClassForm danceClass={danceClass}/>
      )}
    </IonContent>
  </IonPage>
);

const mapState = (state: AppState, props: { match: { params: { danceClassId: string } } }) => {
  const danceClass = (state.danceClasses || []).find(d => d.id === Number(props.match.params.danceClassId))!;
  const userRole = state.currentUser && state.currentUser.role;
  return { danceClass, userRole }
};

export default connect(mapState, actions)(DanceClassDetailsPage);
