import {IonButton, IonContent, IonIcon, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';
import {RouteComponentProps} from 'react-router';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions, {MappedActions} from '../actions/actions';
import {User, UserRole} from '../models/User';
import {calendarOutline, callOutline, mailOutline, cloudUpload} from 'ionicons/icons';
import moment from 'moment';
import {API, checkHttpResponse} from '../helpers/httpHelper';
import {EmergencyContact} from '../models/EmergencyContact';
import {getUploadWidget} from '../helpers/getUploadWidget';

type UserDetailsPageProps = {
  currentUser: User | null;
  selectedUser: User | null;
};

const UserDetailsPage: React.FC<UserDetailsPageProps & RouteComponentProps<{ userId: string }> & MappedActions<typeof actions>> = ({
  currentUser,
  selectedUser,
  actions,
  match,
}) => {
  const [emergencyContacts, setEmergencyContacts] = React.useState<EmergencyContact[]>([]);

  const {
    id,
    role,
    first_name,
    last_name,
    bio,
    email,
    phone,
    date_of_birth,
    imgUrl,
  } = selectedUser|| {};
  const { userId } = match.params;

  const userIsEntitled = currentUser && [UserRole.ADMIN, UserRole.WORK_STUDY].includes(currentUser.role);
  const selectedUserIsCurrentUser = currentUser && currentUser.id === Number(userId);

  const uploadCallback = (imgUrl: string) => {
    const updateUserImgUrl = async (userId: number, imgUrl: string) => {
      try {
        const response = await API.put(`/users/${userId}`, { user: { imgUrl } });
        const responseBody = await checkHttpResponse(response);
        actions.setSelectedUser(responseBody, true);
      } catch (e) {
        console.error(e);
      }
    };
    updateUserImgUrl(id!, imgUrl);
  };

  const uploadWidget = userIsEntitled || selectedUserIsCurrentUser ? getUploadWidget(uploadCallback) : null;

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await API.get(`/users/${userId}`);
        const responseBody = await checkHttpResponse(response);
        actions.setSelectedUser(responseBody, true);
      } catch (e) {
        console.error(e)
      }
    };
    fetchUserDetails();
  }, [userId, actions]);

  React.useEffect(() => {
    if (userIsEntitled) {
      const fetchEmergencyContacts = async () => {
        try {
          const response = await API.get(`/users/${id}/emergency_contacts`);
          const responseBody = await checkHttpResponse(response);
          setEmergencyContacts(responseBody);
        } catch (e) {
          console.error(e)
        }
      };
      fetchEmergencyContacts();
    }
  }, [userIsEntitled, id]);

  return (
    <IonPage id='teacher-details-page'>
      <AppHeader title={selectedUser ? `${first_name} ${last_name}` : 'User Details'} />
      <IonContent>
        {selectedUser && (
          <div className='ptxxl phxxl'>
            {imgUrl && (
              <img src={imgUrl} alt='user-img' />
            )}
            {!imgUrl && (
              <IonIcon className='photo-placeholder' icon={cloudUpload} />
            )}
            {(userIsEntitled || selectedUserIsCurrentUser) && (
              <div className='fdr mtxxl'>
                <IonButton className='flex1' onClick={() => uploadWidget.open()}>Update Photo</IonButton>
                <IonButton className='flex1' routerLink={`/users/${userId}/edit`}>Update Info</IonButton>
              </div>
            )}
            {bio && <p>{bio}</p>}
            {userIsEntitled && (
              <div className='mtxxxxl pvxxl entitled-section'>
                <div>
                  Only Administrators and Work-Study can see this section.
                  <h3 className='yellow'>Contact Info:</h3>
                  <div className='ptxl fdr'>
                    <IonIcon icon={callOutline} size='large'  />
                    <span className='plxl pts font20'><a href={`tel:${phone}`} className='white'>{phone}</a></span>
                  </div>
                  <div className='ptxl fdr'>
                    <IonIcon icon={mailOutline} size='large' />
                    <span className='plxl pts font20'><a href={`mailto:${email}`} className='white'>{email}</a></span>
                  </div>
                  {role === UserRole.STUDENT && (
                    <div className='ptxl fdr'>
                      <IonIcon icon={calendarOutline} size='large'  />
                      <span className='plxl pts font20'>{moment(date_of_birth).utc().format('MMMM D, YYYY')}</span>
                    </div>
                  )}
                </div>
                {emergencyContacts && emergencyContacts.length > 0 && (
                  <div className='pvxxl'>
                    <h3 className='yellow'>Emergency Contacts:</h3>
                    {emergencyContacts.map((contact: EmergencyContact, id) => (
                      <div className={id === 0 ? 'ptxxl' : 'ptxxxxl'}>
                        <div className='fdr'>
                          <span className='pts font20'>{`${contact.first_name} ${contact.last_name} - ${contact.relationship}`}</span>
                        </div>
                        {contact.phone && (
                          <div className='ptxl fdr'>
                            <IonIcon icon={callOutline} size='large'  />
                            <span className='plxl pts font20'><a href={`tel:${contact.phone}`} className='white'>{contact.phone}</a></span>
                          </div>
                        )}
                        {contact.email && (
                          <div className='ptxl fdr'>
                            <IonIcon icon={mailOutline} size='large' />
                            <span className='plxl pts font20'><a href={`mailto:${contact.email}`} className='white'>{contact.email}</a></span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

const mapState = (state: AppState) => {
  const { currentUser, selectedUser } = state;
  return { currentUser, selectedUser }
};

export default connect(mapState, actions)(UserDetailsPage);
