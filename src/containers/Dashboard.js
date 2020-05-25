import React from 'react';
import { songsActions, songsSelectors } from '../store/songs/index';
import { connect } from 'react-redux'
import { SongsTray } from '../components/song-tray/songs-tray'

import { useEffect } from 'react'
import {  useDispatch , useSelector } from 'react-redux'
import { playlistsActions } from '../store/playlist/index';
import { Button , ButtonGroup , Carousel, Card , ListGroup , Accordion , Modal , useAccordionToggle, Table , Alert , Form , Container , Col , Row   } from 'react-bootstrap'

const ModalContainer = () => {
  const modalState = useSelector( state => state.playlist.showModalToAddSongs )
  const dispatch = useDispatch()
  const handleClose = () => dispatch(playlistsActions.closePlayListModalToAddSongs())
  const playlist = useSelector( state => state.playlist.playlists ) 
  const currentSongToBeAddedId = useSelector( state => state.playlist.currentSongToBeAddedId )
  return (
     <Modal show={modalState} onHide={ handleClose } >
        <Form noValidate >
          <Modal.Header bsPrefix="modal-header text-white bg-dark" closeButton >
            <Modal.Title>Select Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {
               playlist.length > 0 && playlist.map(playlistItem => {
                  return <ListGroup.Item>
                            <span>{ playlistItem.name }</span>
                            <Button className="float-right" variant="dark" size="sm" onClick={ (e) => dispatch(playlistsActions.addSongToPlaylist(playlistItem.id,playlistItem.name,playlistItem.songs.concat([currentSongToBeAddedId]))) }>
                              Add To Playlist
                            </Button>
                          </ListGroup.Item>
                }) 
              }
            </ListGroup>
          </Modal.Body>
        </Form>
      </Modal>
  )}

class Dashboard extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.getTopSongs = this.getTopSongs.bind(this);
  }

  componentDidMount() {}

  fetchSongs(){
    this.props.dispatch(songsActions.fetchSongs());
  }

  getTopSongs(){
    return this.props.songs.slice(0,5)
  }

  getMostPlayedSongs(){
    return this.props.songs.slice(10,15)
  }

  getSongsToDiscover(){
    return this.props.songs.slice(20,25)
  }
  
  render() {

    const {
      songs,
    } = this.props;
    return (
   <div>
   <section className="p-4">
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 ht-450"
          src="https://static.billboard.com/files/media/Miles-Davis-Bitches-Brew-album-covers-billboard-1000x1000-compressed.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Listen to Latest Trending Music</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 ht-450"
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Music Cover Featuring Top Artists</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 ht-450"
          src="https://res-3.cloudinary.com/ybmedia/image/upload/c_crop,h_1117,w_1985,x_0,y_252/c_fill,f_auto,h_495,q_auto,w_880/v1/m/b/8/b8601cf5a1ce6be0421f710c8cdf89f05db3dd97/GettyImages-74290244.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Immerse into Soulful Music</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </section>
    <section>
      <Container fluid>
        <Row>
          <Col md={12} className="mt-5 ml-0">
            { songs && songs.length > 0 && <SongsTray songs={this.getTopSongs()} title="Top Favourite Songs"></SongsTray>}
            { songs && songs.length > 0 && <SongsTray songs={this.getTopSongs()} title="Top Played Songs"></SongsTray>}
            { songs && songs.length > 0 && <SongsTray songs={this.getTopSongs()} title="Discover New Songs"></SongsTray>}
          </Col>
        </Row>
      </Container>
    </section>
    <ModalContainer></ModalContainer>
   </div>
    );
  }
}

const mapStateToProps = state => ({
  songs: songsSelectors.getSongs(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
