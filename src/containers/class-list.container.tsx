import ClassListComponent from '../components/class-list.component';
import {connect} from 'react-redux';
import {updateAppLoading} from '../actions/actions';

function mapStateToProps(state: any) {
  return {
    appLoading: state.appLoading,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateAppLoading: (bool: boolean) => {
      dispatch(updateAppLoading(bool))
    }
  }
}

const ClassListContainer = connect(mapStateToProps, mapDispatchToProps)(ClassListComponent);
export default ClassListContainer;