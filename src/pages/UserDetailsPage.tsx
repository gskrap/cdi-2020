import {IonContent, IonIcon, IonPage} from '@ionic/react';
import React from 'react';
import AppHeader from '../components/AppHeader';
import {RouteComponentProps} from 'react-router';
import {AppState} from '../store/defaultStore';
import {connect} from 'react-redux';
import actions from '../actions/actions';
import {User, UserRole} from '../models/User';
import {calendarOutline, callOutline, mailOutline} from 'ionicons/icons';
import moment from 'moment';
import {API, checkHttpResponse} from '../helpers/httpHelper';
import {EmergencyContact} from '../models/EmergencyContact';

type UserDetailsPageProps = {
  currentUser: User | null;
  selectedUser: User | null;
};

const UserDetailsPage: React.FC<UserDetailsPageProps & RouteComponentProps> = ({ currentUser, selectedUser }) => {
  const [emergencyContacts, setEmergencyContacts] = React.useState<EmergencyContact[]>([]);

  const currentUserRole = (currentUser || {}).role;
  const {
    id,
    role,
    first_name,
    last_name,
    bio,
    email,
    phone,
    date_of_birth,
  } = selectedUser || {};

  const userIsEntitled = currentUserRole && [UserRole.ADMIN, UserRole.WORK_STUDY].includes(currentUserRole);

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
          <div className='phxxl'>
            <div className='photo-placeholder' />
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
