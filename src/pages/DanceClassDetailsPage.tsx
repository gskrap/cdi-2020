import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';
import {RouteComponentProps} from 'react-router';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions from '../actions/actions';
import {DanceClass} from '../models/DanceClass';

type DanceClassDetailsPageProps = {
  danceClass: DanceClass;
};

const DanceClassDetailsPage: React.FC<DanceClassDetailsPageProps & RouteComponentProps> = ({ danceClass, match }) => {
  return (
    <IonPage id='dance-class-details-page'>
      <AppHeader title={danceClass ? danceClass.name : 'Class Details'}/>
      <IonContent>
        {danceClass && (
          <div className='phxxl'>
            <p>{danceClass.name}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

const mapState = (state: AppState, props: { match: { params: { danceClassId: string } } }) => {
  const danceClass = (state.danceClasses || []).find(d => d.id === Number(props.match.params.danceClassId))!;
  return { danceClass }
};

export default connect(mapState, actions)(DanceClassDetailsPage);
