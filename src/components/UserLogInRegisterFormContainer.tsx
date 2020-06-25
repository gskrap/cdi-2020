import React from 'react';
import {
  IonButton,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';
import {User, UserGender, UserRole} from '../models/User';

enum ActiveFormOptions {
  LOG_IN = 'log-in',
  REGISTER = 'register',
}

const UserLogInRegisterFormContainer: React.FC<MappedActions<typeof actions>> = ({ actions }) => {
  const [activeForm, setActiveForm] = React.useState(ActiveFormOptions.LOG_IN);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordDupe, setPasswordDupe] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [gender, setGender] = React.useState();

  const handleRegister = () => {
    const user: Partial<User> = {
      email,
      gender,
      password,
      phone,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      // TODO: role
      role: UserRole.STUDENT,
    };

    actions.register(user);
  };

  const renderLogInForm = () => (
    <>
      <form>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Email</IonLabel>
          <IonInput onIonChange={e => setEmail(e.detail.value!)} type='email'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Password</IonLabel>
          <IonInput onIonChange={e => setPassword(e.detail.value!)} type='password'></IonInput>
        </IonItem>
      </form>
      <IonButton className='mtxxl' expand='block' onClick={() => actions.logIn(email, password)}>Log In</IonButton>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <form>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Email</IonLabel>
          <IonInput onIonChange={e => setEmail(e.detail.value!)} type='email'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Password</IonLabel>
          <IonInput onIonChange={e => setPassword(e.detail.value!)} type='password'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Confirm Password</IonLabel>
          <IonInput onIonChange={e => setPasswordDupe(e.detail.value!)} type='password'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>First Name</IonLabel>
          <IonInput onIonChange={e => setFirstName(e.detail.value!)} type='text'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Last Name</IonLabel>
          <IonInput onIonChange={e => setLastName(e.detail.value!)} type='text'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Birthday</IonLabel>
          <IonDatetime
            displayFormat='MMM D YYYY'
            min='1900-01-01'
            max='2020-01-01'
            value={dateOfBirth}
            onIonChange={e => setDateOfBirth(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Phone Number</IonLabel>
          <IonInput onIonChange={e => setPhone(e.detail.value!)} type='tel'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Gender</IonLabel>
          <IonSelect
            value={gender}
            cancelText='Cancel'
            okText='OK'
            mode='ios'
            onIonChange={e => setGender(e.detail.value)}
          >
            <IonSelectOption value={UserGender.FEMALE}>female</IonSelectOption>
            <IonSelectOption value={UserGender.MALE}>male</IonSelectOption>
            <IonSelectOption value={UserGender.NOT_SPECIFIED}>other</IonSelectOption>
          </IonSelect>
        </IonItem>
      </form>
      <IonButton className='mtxxl' expand='block' onClick={handleRegister}>Register</IonButton>
    </>
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
        <IonSegmentButton value={ActiveFormOptions.REGISTER} disabled>
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

export default connect(null, actions)(UserLogInRegisterFormContainer);
