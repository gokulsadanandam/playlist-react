import { keyBy } from 'lodash';
import * as actionTypes from './actionTypes';

export function fetchSongs(){
  return { type: actionTypes.FETCH_SONGS }
}

export function fetchSongsSuccess(payload){
  return {type: actionTypes.FETCH_SONGS_SUCCESS, payload: payload };
}

export function fetchPlaylists(){
  return { type: actionTypes.FETCH_PLAYLISTS }
}

export function fetchPlaylistsSuccess(payload){
  return {type: actionTypes.FETCH_PLAYLISTS_SUCCESS, payload: payload };
}

export function openPlayListModal(){
  return { type: actionTypes.OPEN_PLAYLIST_MODAL }
}

export function closePlayListModal(){
  return { type: actionTypes.CLOSE_PLAYLIST_MODAL }
}

export function addPlaylistTitle(payload){
  return { type: actionTypes.ADD_PLAYLIST_TITLE , payload: payload}
}

export function addSongtoPlaylist(payload){
  return { type: actionTypes.ADD_SONG_TO_PLAYLIST , payload : payload }
}

export function removeSongFromPlaylist(payload){
  return { type: actionTypes.REMOVE_SONG_FROM_PLAYLIST , payload: payload }
}

export function createPlaylist(payload){
  return { type: actionTypes.CREATE_PLAYLIST , playList: payload }
}

export function showNameRequiredAlert(){
  return { type: actionTypes.SHOW_NAME_REQUIRED_ALERT }
}

export function dismissNameRequiredAlert(){
  return { type: actionTypes.SHOW_NAME_REQUIRED_ALERT_CLOSE }
}

export function openPlayListModalToAddSongs(song){
  return { type: actionTypes.OPEN_PLAY_LIST_MODAL_TO_ADD_SONGS , currentSongToBeAddedId : song } 
}

export function closePlayListModalToAddSongs(){
  return { type: actionTypes.CLOSE_PLAY_LIST_MODAL }
}

export function addSongToPlaylist(playlistId,playlistName,songs){
  return { type: actionTypes.ADD_NEW_SONG_TO_PLAYLIST , playlist : playlistId , playlistName : playlistName , song : songs }
}

export function addSongToPlaylistSuccess(){
  return { type: actionTypes.ADD_SONG_TO_PLAYLIST_SUCCESS }
}