import React from 'react';
import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { playlistsActions, playlistsSelectors } from '../../store/playlist/index';
import { Button , ButtonGroup , ListGroup , Accordion , Modal , useAccordionToggle, Table , Alert , Form , Container , Col , Row   } from 'react-bootstrap'

export const SongsItem = ({songId}) => {

	const songDetails = useSelector( state => state.songs.playlistSongs[songId] )
	const dispatch = useDispatch()

  return (

  	<Table className="text-center m-0 text-dark" responsive>
       <tbody>
			<tr>
		    	<td className="text-muted" className="w-25">{ songDetails && songDetails.title }</td>
		    	<td className="text-muted"  className="w-25">{ songDetails && songDetails.artist }</td>
		    	<td className="text-muted"  className="w-25">{ songDetails && songDetails.album }</td>
		    	<td className="text-muted"  className="w-25">{ songDetails && songDetails.duration && 
		    													<div> 
		    														<i class="fa fa-clock-o pr-2" aria-hidden="true"></i>
 																	{ parseInt(songDetails.duration/60) } (m) : 
 																	{ songDetails.duration%60 } (s)  
																</div> 
															  }
			  	</td>
		    	<td className="text-muted"  className="w-25"><Button variant="outline-dark">Play</Button></td>
			</tr>		
	   </tbody>  		
  	</Table>
  )
};
