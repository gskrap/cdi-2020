import React from 'react';
import {Route} from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonRouterOutlet,
} from '@ionic/react';
import { menuController } from '@ionic/core';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './pages/HomePage';
import TeachersPage from './pages/TeachersPage';
import TeacherDetailsPage from './pages/TeacherDetailsPage';
import {body, logOutOutline, settingsOutline} from 'ionicons/icons';
import actions, {MappedActions} from './actions/actions';
import {connect} from 'react-redux';
import {AppState} from './store/defaultStore';
import {UserRole} from './models/User';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.scss';
import './theme/app.scss';
import AdminPage from './pages/AdminPage';
import DanceClassDetailsPage from './pages/DanceClassDetailsPage';

type AppProps = {
  userRole: UserRole | null;
}

const App: React.FC<AppProps & MappedActions<typeof actions>> = ({ userRole, actions }) => {
  const handleLogOut = () => {
    actions.logOut();
    menuController.close();
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu side='end' contentId='router'>
          <IonList className='ptxxxl'>
            <h1 className='openSansExtraBold mlxl'>Menu</h1>
            {userRole === UserRole.ADMIN && (
              <IonItem className='pvl' routerLink='/admin' routerDirection='forward' onClick={() => menuController.close()}>
                <span>Admin</span>
                <IonIcon icon={settingsOutline} slot='end'/>
              </IonItem>
            )}
            <IonItem className='pvl' routerLink='/teachers' routerDirection='forward' onClick={() => menuController.close()}>
              <span>Teachers</span>
              <IonIcon icon={body} slot='end'/>
            </IonItem>
            <IonItem className='pvl' routerLink='/' routerDirection='root' onClick={handleLogOut}>
              <span>Log Out</span>
              <IonIcon icon={logOutOutline} slot='end'/>
            </IonItem>
          </IonList>
        </IonMenu>
        <IonRouterOutlet id='router'>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/admin' component={AdminPage}/>
          <Route exact path='/danceClasses/:danceClassId/edit' component={DanceClassDetailsPage}/>
          <Route exact path='/teachers' component={TeachersPage}/>
          <Route exact path='/teachers/:teacherId' component={TeacherDetailsPage}/>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

const mapState = (state: AppState) => {
  const userRole = state.currentUser && state.currentUser.role;
  return { userRole }
};

export default connect(mapState, actions)(App);
