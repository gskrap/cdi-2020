import reducers from '../reducers/reducers';
import {createStore} from 'redux';

const configureStore = (initialState: any) => {
  return createStore(
    reducers,
    initialState,
  )
};

const store = configureStore({
  appLoading: false
});

export { store }