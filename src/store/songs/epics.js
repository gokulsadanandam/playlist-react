import { keyBy } from 'lodash';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';
import { ofType } from 'redux-observable';
import { map , mergeMap} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax';

import * as actionTypes from './actionTypes';
import * as songsActions from './actionCreators';

export const fetchSongs = action$ => action$.pipe(
  ofType(actionTypes.FETCH_SONGS),
  mergeMap(action =>
    ajax.get(`http://localhost:5000/library`).pipe(
      map(response => songsActions.fetchSongsSuccess(response.response))
    )
  )
);
