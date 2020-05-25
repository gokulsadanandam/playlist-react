import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
  songs: [] , 
  showModal : false , 
  playlistSongs : {} ,
  searchItems : [] , 
  querystring : ''
});

export default (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_SONGS_SUCCESS:
      return state.merge({
        songs : action.payload || {}
      })
    case actionTypes.GET_PLAYLIST_SONGS_BY_ID:
       return state.merge({
         playlistSongs : { ...state.playlistSongs ,  ...state.songs.filter( song => action.payload.includes(song.id) ).reduce( (song,next) => Object.assign(song,{ [next.id] : next }) , {} )}
       })
    case actionTypes.SET_QUERY:
        return state.merge({
          querystring : action.payload.toLowerCase()
        })
    case actionTypes.SEARCH:
      return state.merge({
          searchItems : state.querystring.length > 0 ? state.songs.filter( song  => state.querystring && song.title.toLowerCase().includes(state.querystring) || song.artist.toLowerCase().includes(state.querystring) || song.album.toLowerCase().includes(state.querystring) ) : []
        })
    case actionTypes.CLEAR_SEARCH:
      return state.merge({
          querystring : ''
      })
    default:
      return state;
  }
};
