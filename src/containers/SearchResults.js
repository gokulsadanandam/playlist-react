import React from 'react';
import { SongsTray } from '../components/song-tray/songs-tray'
import { useSelector } from 'react-redux'

export const SearchResults = ({songs}) => {
	
	const searchResultsSongs = useSelector( state => state.songs.searchItems )
	const randomSongsList = useSelector( state => state.songs.songs.slice(0,20) )
	return(
			<div className="mt-3">
				{ 	
					searchResultsSongs.length > 0 && 
					<SongsTray songs={ searchResultsSongs }  wrapStyle="wrap" title="Search Results"></SongsTray>
				}
				{
					searchResultsSongs.length === 0 && 
					<div>
						<h3 className="text-white text-center border-top border-bottom pt-2 pb-2 d-flex align-items-center justify-content-center">
							<i className="fa fa-info-circle fa-2x pr-3" aria-hidden="true"></i>
						 	<span>Sorry , We couldn't find any songs matching your search query.</span>
					 	</h3>
						<div>
							<SongsTray songs={ randomSongsList } wrapStyle="wrap" title="Listen to Other Similar Songs"></SongsTray>
						</div>
					</div>
				}
			</div>
		)
}


