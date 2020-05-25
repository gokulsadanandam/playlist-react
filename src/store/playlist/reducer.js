import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
  playlists: [] , 
  currentPlaylistTitle: '' , 
  selectedSongs : [] , 
  showAlert : false ,
  showModalToAddSongs : false , 
  currentSongToBeAddedId : ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAYLISTS_SUCCESS:
      return state.merge({
        currentPlaylistTitle : '' ,
        playlists : action.payload || {}
      })
    case actionTypes.OPEN_PLAYLIST_MODAL:
      return state.merge({
        showModal : true
      })
    case actionTypes.CLOSE_PLAYLIST_MODAL:
      return state.merge({
        showModal : false
      })
    case actionTypes.ADD_SONG_TO_PLAYLIST:
      return state.merge({
        selectedSongs : state.selectedSongs.concat([action.payload])
      })
    case actionTypes.REMOVE_SONG_FROM_PLAYLIST:
      return state.merge({
        selectedSongs : state.selectedSongs.filter( element => element.id !== action.payload.id )  
      })
    case actionTypes.ADD_PLAYLIST_TITLE:
      return state.merge({
        currentPlaylistTitle : action.payload
      })
    case actionTypes.SHOW_NAME_REQUIRED_ALERT:
      return state.merge({
        showAlert : true
      })
    case actionTypes.SHOW_NAME_REQUIRED_ALERT_CLOSE:
      return state.merge({
        showAlert : false
      })
    case actionTypes.OPEN_PLAY_LIST_MODAL_TO_ADD_SONGS:
      return state.merge({
        showModalToAddSongs : true , 
        currentSongToBeAddedId : action.currentSongToBeAddedId
      })
    case actionTypes.CLOSE_PLAY_LIST_MODAL:
      return state.merge({
        showModalToAddSongs : false , 
        currentSongToBeAddedId : ''
      })
    case actionTypes.ADD_SONG_TO_PLAYLIST_SUCCESS:
      return state.merge({
        showSuccessToast : true
      })
 
    default:
      return state;
  }
};
