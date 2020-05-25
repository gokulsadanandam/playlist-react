import { keyBy } from 'lodash';
import axios from 'axios';
import querystring from 'querystring';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { push } from 'react-router-redux';
import { mergeMap , map , forkJoin } from 'rxjs/operators'
import * as actionTypes from './actionTypes';
import * as playListActions from './actionCreators';

export const fetchPlaylists = action$ => action$.pipe(
    ofType(actionTypes.FETCH_PLAYLISTS) ,
    mergeMap(action => 
        ajax.get(`http://localhost:5000/playlist`).pipe(
      map(response => playListActions.fetchPlaylistsSuccess(response.response))
        )
    )
    )

export const createPlaylist = action$ => action$.pipe(
  ofType(actionTypes.CREATE_PLAYLIST) ,
  mergeMap(payload => 
    ajax({ url : 'http://localhost:5000/playlist', method: 'POST',headers: {
      'Content-Type': 'application/json',
    }, body : payload.playList }).pipe(
      mergeMap( response => [playListActions.fetchPlaylists(),playListActions.closePlayListModal()] )
  )
)
)

export const addSongToPlaylist = action$ => action$.pipe(
  ofType(actionTypes.ADD_NEW_SONG_TO_PLAYLIST) ,
  mergeMap((payload) => 
    ajax({ url : `http://localhost:5000/playlist/${payload.playlist}`, method: 'POST',headers: {
      'Content-Type': 'application/json',
    }, body : { "songs" : payload.song , "name" : payload.playlistName } }).pipe(
      mergeMap( response => [playListActions.addSongToPlaylistSuccess(),playListActions.fetchPlaylists(),playListActions.closePlayListModalToAddSongs()] )
  )
)
)


