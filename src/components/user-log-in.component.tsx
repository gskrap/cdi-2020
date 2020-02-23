import React from 'react';
import {IonButton, IonInput, IonItem, IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';
import {connect} from 'react-redux';
import {logIn} from '../actions/actions';
import {AppThunkDispatch} from '../store/default-store';

enum ActiveFormOptions {
  LOG_IN = 'log-in',
  REGISTER = 'register',
}

type UserLogInComponentProps = {
  logIn: (email: string, password: string) => void,
}

type UserLogInComponentState = {
  activeForm: ActiveFormOptions,
  email: string,
  password: string,
}

class UserLogInComponent extends React.Component<UserLogInComponentProps, UserLogInComponentState> {
  constructor(props: UserLogInComponentProps) {
    super(props);
    this.state = {
      activeForm: ActiveFormOptions.LOG_IN,
      email: '',
      password: '',
    }
  }

  updateEmail = (event: any) => {
    this.setState({email: event.detail.value});
  };

  updatePassword = (event: any) => {
    this.setState({password: event.detail.value});
  };

  logIn = () => {
    const {email, password} = this.state;
    this.props.logIn(email, password);
  };

  renderForm() {
    return this.state.activeForm === 'log-in' ?
      <>
        <form>
          <IonItem mode='md'>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput onIonChange={this.updateEmail} type='email'></IonInput>
          </IonItem>
          <IonItem mode='md'>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput onIonChange={this.updatePassword} type='password'></IonInput>
          </IonItem>
        </form>
        <IonButton className='mtxxl' expand='block' onClick={this.logIn}>Log In</IonButton>
      </>
      :
      <>
        Register Form Goes Here
      </>
  }

  render() {
    return <>
      <div className='maxl'>
        <IonSegment value={this.state.activeForm}
                    onIonChange={e => this.setState({activeForm: e.detail.value as ActiveFormOptions})}
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
          {this.renderForm()}
        </div>
      </div>
    </>
  }
}

const mapDispatch = (dispatch: AppThunkDispatch) => {
  return {
    logIn: (email: string, password: string) => {
      dispatch(logIn(email, password))
    },
  }
};

export default connect(null, mapDispatch)(UserLogInComponent);