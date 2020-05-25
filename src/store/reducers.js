import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import playlist from './playlist/reducer';
import songs from './songs/reducer';

export default combineReducers({
  playlist,
  songs,
  routing: routerReducer,
});
