import React from 'react';
import {IonButton, IonDatetime, IonInput, IonItem, IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';
import {User, UserGender, UserRole} from '../models/User';

enum ActiveFormOptions {
  LOG_IN = 'log-in',
  REGISTER = 'register',
}

type FormErrors = {
  email: boolean,
  password: boolean,
  firstName: boolean,
  lastName: boolean,
  phone: boolean,
}

const defaultErrors: FormErrors = {
  email: false,
  password: false,
  firstName: false,
  lastName: false,
  phone: false,
};

const UserLogInRegisterFormContainer: React.FC<MappedActions<typeof actions>> = ({ actions }) => {
  const [activeForm, setActiveForm] = React.useState(ActiveFormOptions.LOG_IN);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordDupe, setPasswordDupe] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [errors, setErrors] = React.useState(defaultErrors);

  const handleRegister = () => {
    const user: Partial<User> = {
      email,
      password,
      phone,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      gender: UserGender.NOT_SPECIFIED,
      // TODO: role
      role: UserRole.STUDENT,
    };

    actions.register(user);
  };

  const checkField = (fieldName: keyof FormErrors) => {
    if (eval(fieldName) && errors[fieldName]) {
      setErrors({...errors, [fieldName]: false})
    } else if (!email && !errors[fieldName]) {
      setErrors({...errors, [fieldName]: true})
    }
  };

  const checkPasswords = () => {
    const hasError = Boolean(!password || (password && passwordDupe && (password !== passwordDupe)));
    setErrors({...errors, password: hasError})
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

  const disabled = Object.keys(errors).some(key => errors[key as keyof FormErrors]);

  const renderRegisterForm = () => (
    <>
      <form>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Email</IonLabel>
          <IonInput onIonChange={e => setEmail(e.detail.value!)} type='email' onBlur={() => checkField('email')}></IonInput>
        </IonItem>
        {errors.email && <div className='font12 red'>Required</div>}
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Password</IonLabel>
          <IonInput onIonChange={e => setPassword(e.detail.value!)} onBlur={checkPasswords} type='password'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Confirm Password</IonLabel>
          <IonInput onIonChange={e => setPasswordDupe(e.detail.value!)} onBlur={checkPasswords} type='password'></IonInput>
        </IonItem>
        {errors.password && <div className='font12 red'>Passwords don't match</div>}
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>First Name</IonLabel>
          <IonInput onIonChange={e => setFirstName(e.detail.value!)} type='text' onBlur={() => checkField('firstName')}></IonInput>
        </IonItem>
        {errors.firstName && <div className='font12 red'>Required</div>}
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Last Name</IonLabel>
          <IonInput onIonChange={e => setLastName(e.detail.value!)} type='text' onBlur={() => checkField('lastName')}></IonInput>
        </IonItem>
        {errors.lastName && <div className='font12 red'>Required</div>}
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
          <IonInput onIonChange={e => setPhone(e.detail.value!)} type='tel' onBlur={() => checkField('phone')}></IonInput>
        </IonItem>
        {errors.phone && <div className='font12 red'>Required</div>}
      </form>
      <IonButton className='mtxxl' expand='block' onClick={handleRegister} disabled={disabled}>Register</IonButton>
    </>
  );

  return (
    <div className='maxl'>
      <IonSegment
        value={activeForm}
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

export default connect(null, actions)(UserLogInRegisterFormContainer);
