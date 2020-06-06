import React from 'react';
import {IonButton, IonInput, IonItem, IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';

enum ActiveFormOptions {
  LOG_IN = 'log-in',
  REGISTER = 'register',
}

const UserLogIn: React.FC<MappedActions<typeof actions>> = ({ actions }) => {
  const [activeForm, setActiveForm] = React.useState(ActiveFormOptions.LOG_IN);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const updateEmail = (event: any) => {
    setEmail(event.detail.value);
  };

  const updatePassword = (event: any) => {
    setPassword(event.detail.value);
  };

  const renderLogInForm = () => (
    <>
      <form>
        <IonItem mode='md'>
          <IonLabel position='floating'>Email</IonLabel>
          <IonInput onIonChange={updateEmail} type='email'></IonInput>
        </IonItem>
        <IonItem mode='md'>
          <IonLabel position='floating'>Password</IonLabel>
          <IonInput onIonChange={updatePassword} type='password'></IonInput>
        </IonItem>
      </form>
      <IonButton className='mtxxl' expand='block' onClick={() => actions.logIn(email, password)}>Log In</IonButton>
    </>
  );

  const renderRegisterForm = () => (
    <div>My Register Form</div>
  );

  return (
    <div className='maxl'>
      <IonSegment value={activeForm}
                  onIonChange={e => setActiveForm(e.detail.value as ActiveFormOptions)}
                  mode='ios'
      >
        <IonSegmentButton value={ActiveFormOptions.LOG_IN}>
          <IonLabel>Log In</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={ActiveFormOptions.REGISTER}>
          <IonLabel>Register</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <div className='mtl'>
        {activeForm === ActiveFormOptions.LOG_IN && renderLogInForm()}
        {activeForm === ActiveFormOptions.REGISTER && renderRegisterForm()}
      </div>
    </div>
  )
};

export default connect(null, actions)(UserLogIn);
