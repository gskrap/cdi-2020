import actions, {MappedActions} from '../actions/actions';
import React from 'react';
import {User} from '../models/User';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonFooter,
  IonToolbar,
} from '@ionic/react';
import {connect} from 'react-redux';
import {API, checkHttpResponse} from '../helpers/httpHelper';
import {useHistory} from 'react-router';

type UserFormProps = {
  userToEdit: User,
}

const UserForm: React.FC<UserFormProps & MappedActions<typeof actions>> = ({ userToEdit, actions }) => {
  const history = useHistory();

  const [selectedUser, setSelectedUser] = React.useState<User>(userToEdit);

  const updateUserField = (updatedField: Partial<User>) => {
    const updatedUser = {
      ...selectedUser,
      ...updatedField,
    };
    setSelectedUser(updatedUser);
  };

  const handleSave = () => {
    const updateUser = async () => {
      try {
        const response = await API.put(`/users/${selectedUser.id}`, { user: selectedUser });
        const responseBody = await checkHttpResponse(response);
        setSelectedUser(responseBody);
        history.goBack();
        history.goBack();
      } catch (e) {
        console.error(e);
      }
    };
    updateUser();
  };

  return (
    <div className='fdc fjb height100'>
      <form className='phxxl'>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>First Name</IonLabel>
          <IonInput value={selectedUser.first_name} onIonChange={e => updateUserField({ first_name: e.detail.value! })} type='text'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Last Name</IonLabel>
          <IonInput value={selectedUser.last_name} onIonChange={e => updateUserField({ last_name: e.detail.value! })} type='text'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Email</IonLabel>
          <IonInput value={selectedUser.email} onIonChange={e => updateUserField({ email: e.detail.value! })} type='email'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Phone Number</IonLabel>
          <IonInput value={selectedUser.phone} onIonChange={e => updateUserField({ phone: e.detail.value! })} type='tel'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Bio</IonLabel>
          <IonTextarea value={selectedUser.bio} rows={12} onIonChange={e => updateUserField({ bio: e.detail.value! })}></IonTextarea>
        </IonItem>
      </form>
      <IonFooter>
        <IonToolbar>
          <IonButton className='border-radius save-button' expand='block' onClick={handleSave}>Save User</IonButton>
        </IonToolbar>
      </IonFooter>
    </div>
  )
};

export default connect(null, actions)(UserForm);

