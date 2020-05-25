export function getSongs(state){
  return state.songs.songs
}

export function get100Songs(state){
  return state.songs.songs.slice(0,100)
}

export function getParams(state) {
  return state.posts.params;
}

export function getPlaylists(state){
  return state.playlist.playlists
}

export function getModalState(state){
  return state.playlist.showModal
}

export function getPlaylistName(state){
  return state.playlist.currentPlaylistTitle
}

export function selectedSongs(state){
  return state.playlist.selectedSongs
}

export function selectAlertState(state){
  return state.playlist.showAlert
}

export function selectToggleState(state){
	return state.playlist.openToggleState
}