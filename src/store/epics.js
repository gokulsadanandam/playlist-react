import { combineEpics } from 'redux-observable';
import { values } from 'lodash';

import {fetchPlaylists} from './playlist/epics';
import {createPlaylist} from './playlist/epics';
import {fetchSongs} from './songs/epics'
import {addSongToPlaylist} from './playlist/epics'
export default combineEpics(
  fetchSongs , fetchPlaylists , createPlaylist , addSongToPlaylist
);
