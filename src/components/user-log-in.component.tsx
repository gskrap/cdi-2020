import React from 'react';
import {IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';

enum ActiveFormOptions {
  LOG_IN = 'log-in',
  REGISTER = 'register',
}

type UserLogInComponentState = {
  activeForm: ActiveFormOptions,
}

class UserLogInComponent extends React.Component<{}, UserLogInComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeForm: ActiveFormOptions.LOG_IN,
    }
  }

  renderForm() {
    return this.state.activeForm === 'log-in' ?
      <div>
        Log In Form
      </div>
      :
      <div>
        Register Form
      </div>
  }

  render() {
    return <>
      <div className='maxl'>
        <IonSegment value={this.state.activeForm}
                    onIonChange={e => this.setState({activeForm: e.detail.value as ActiveFormOptions})}>
          <IonSegmentButton value={ActiveFormOptions.LOG_IN}>
            <IonLabel>Log In</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={ActiveFormOptions.REGISTER}>
            <IonLabel>Register</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <div className='mtxl fdr fjc'>
          {this.renderForm()}
        </div>
      </div>
    </>
  }
}

export default UserLogInComponent;