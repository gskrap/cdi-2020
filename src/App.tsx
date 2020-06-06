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

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

/* My Stylesheets */
import './theme/app.scss';

import {logOutOutline, peopleCircleOutline} from 'ionicons/icons';
import actions, {MappedActions} from './actions/actions';
import {connect} from 'react-redux';

const App: React.FC<MappedActions<typeof actions>> = ({ actions }) => {
  const handleLogOut = () => {
    actions.logOut();
    menuController.close();
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu side='end' contentId='router'>
          <IonList className='ptxxxl'>
            <h1 className='mlxl'>Menu</h1>
            <IonItem className='pvl' routerLink='/teachers' routerDirection='forward' onClick={() => menuController.close()}>
              <span>Teachers</span>
              <IonIcon icon={peopleCircleOutline} slot='end'></IonIcon>
            </IonItem>
            <IonItem className='pvl' routerLink='/' routerDirection='root' onClick={handleLogOut}>
              <span>Log Out</span>
              <IonIcon icon={logOutOutline} slot='end'></IonIcon>
            </IonItem>
          </IonList>
        </IonMenu>
        <IonRouterOutlet id='router'>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/teachers' component={TeachersPage}/>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default connect(null, actions)(App);
