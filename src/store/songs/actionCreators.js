import { keyBy } from 'lodash';
import * as actionTypes from './actionTypes';

export function fetchSongs(){
  return { type: actionTypes.FETCH_SONGS }
}

export function fetchSongsSuccess(payload){
  return {type: actionTypes.FETCH_SONGS_SUCCESS, payload: payload };
}

export function getPlaylistSongById(payload){
  return { type: actionTypes.GET_PLAYLIST_SONGS_BY_ID , payload: payload }
}

export function setQuery(payload){
  return { type: actionTypes.SET_QUERY , payload: payload }
}

export function search(){
  return { type: actionTypes.SEARCH }
}

export function clearSearch(){
	return { type: actionTypes.CLEAR_SEARCH }
}