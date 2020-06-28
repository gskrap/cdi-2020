import actions, {MappedActions} from '../actions/actions';
import React from 'react';
import {User, UserRole} from '../models/User';
import {IonButton, IonFooter, IonSelect, IonInput, IonItem, IonLabel, IonTextarea, IonSelectOption, IonToolbar,} from '@ionic/react';
import {connect} from 'react-redux';
import {API, checkHttpResponse} from '../helpers/httpHelper';
import {useHistory} from 'react-router';
import {AppState} from '../store/defaultStore';
import {StudentGroup} from '../models/StudentGroup';

type UserFormProps = {
  selectedUser: User,
  availableGroups: StudentGroup[] | null,
}

const UserForm: React.FC<UserFormProps & MappedActions<typeof actions>> = ({ availableGroups, selectedUser, actions }) => {
  const history = useHistory();

  const [editUser, setEditUser] = React.useState<User>(selectedUser);
  const [usersGroups, setUsersGroups] = React.useState<number[]>(((editUser || []).groups || []).map(g => g.id));

  const updateUserField = (updatedField: Partial<User>) => {
    const updatedUser = {
      ...editUser,
      ...updatedField,
    };
    setEditUser(updatedUser);
  };

  const handleSave = () => {
    const updateUser = async () => {
      const postUser = editUser;
      delete postUser.groups;
      try {
        await API.post(`/users/${selectedUser.id}/groups`, { values: usersGroups });
        const response = await API.put(`/users/${selectedUser.id}`, { user: postUser });
        const responseBody = await checkHttpResponse(response);
        actions.setSelectedUser(responseBody, true);
        history.goBack();
      } catch (e) {
        console.error(e);
      }
    };
    updateUser();
  };

  return (
    <div className='fdc fjb height100'>
      <form className='phxxl overflow-scroll'>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>First Name</IonLabel>
          <IonInput value={editUser.first_name} onIonChange={e => updateUserField({ first_name: e.detail.value! })} type='text'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Last Name</IonLabel>
          <IonInput value={editUser.last_name} onIonChange={e => updateUserField({ last_name: e.detail.value! })} type='text'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Email</IonLabel>
          <IonInput value={editUser.email} onIonChange={e => updateUserField({ email: e.detail.value! })} type='email'></IonInput>
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel className='yellow' position='floating'>Phone Number</IonLabel>
          <IonInput value={editUser.phone} onIonChange={e => updateUserField({ phone: e.detail.value! })} type='tel'></IonInput>
        </IonItem>
        {editUser.role === UserRole.STUDENT && (
          <IonItem className="ion-no-padding">
            <IonLabel className='yellow' position='floating'>Groups</IonLabel>
            <IonSelect
              value={usersGroups}
              multiple={true}
              cancelText='Cancel'
              okText='OK'
              mode='ios'
              onIonChange={e => setUsersGroups(e.detail.value)}
            >
              {availableGroups && availableGroups.map((group, i) => (
                <IonSelectOption key={i} value={group.id}>{group.name}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        )}
        <IonItem className="mbxxl ion-no-padding">
          <IonLabel className='yellow' position='floating'>Bio</IonLabel>
          <IonTextarea value={editUser.bio} rows={12} onIonChange={e => updateUserField({ bio: e.detail.value! })}></IonTextarea>
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

const mapState = ({ selectedUser, groups }: AppState) => {
  return {
    selectedUser: selectedUser!,
    availableGroups: groups,
  }
};

export default connect(mapState, actions)(UserForm);

