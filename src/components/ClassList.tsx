import React from 'react';
import {IonCard, IonCardContent} from '@ionic/react';
import actions, {MappedActions} from '../actions/actions';
import {connect} from 'react-redux';
import {AppState} from '../store/defaultStore';
import {DanceClass} from '../models/DanceClass';

type DanceClassListProps = {
  loading: boolean,
  danceClasses: DanceClass[] | null,
}

const ClassList: React.FC<DanceClassListProps & MappedActions<typeof actions>> = ({
  loading,
  danceClasses,
  actions,
}) => {
  React.useEffect(() => {
    const fetchDanceClasses = async () => {
      try {
        await actions.fetchDanceClasses()
      } catch (e) {
        console.log(e)
      }
    };
    fetchDanceClasses();
  }, [actions]);

  const renderLoader = () => (
    <div className='fdr fjc'>
      <h1>Loading</h1>
    </div>
  );

  return (
    <>
      {loading
        ? renderLoader()
        : (
            danceClasses && danceClasses.map((danceClass, i) => (
            <IonCard key={i}>
              <IonCardContent>
                {danceClass.name}
              </IonCardContent>
            </IonCard>
          ))
        )
      }
    </>
  )
};

const mapState = (state: AppState) => {
  return {
    loading: state.danceClassesLoading,
    danceClasses: state.danceClasses,
  }
};

export default connect(mapState, actions)(ClassList);
