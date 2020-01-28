import React from 'react';
import {IonButton, IonCard, IonCardContent} from '@ionic/react';

class ClassListComponent extends React.Component<any, any> {
  renderLoadingComponent() {
    return (
      <h2 className='maxl'>Loading...</h2>
    )
  }

  renderClassList() {
    return (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => {
          return (
            <IonCard key={i}>
              <IonCardContent>
                Class {i}
              </IonCardContent>
            </IonCard>
          )
        })}
      </>
    )
  }

  render() {
    return (
      <>
        <IonButton className='maxl'
                   expand='block'
                   color='medium'
                   onClick={() => this.props.updateAppLoading(!this.props.appLoading)}
        >
          Update Loading State
        </IonButton>

        {this.props.appLoading ?
          this.renderLoadingComponent() :
          this.renderClassList()}
      </>
    )
  }
}

export default ClassListComponent;