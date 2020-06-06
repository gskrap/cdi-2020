import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';
import TeacherList from '../components/TeacherList';

const TeachersPage: React.FC = () => {
  return (
    <IonPage id='teachers-page'>
      <AppHeader/>
      <IonContent>
        <TeacherList/>
      </IonContent>
    </IonPage>
  );
};

export default TeachersPage;
