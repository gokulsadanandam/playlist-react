import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { SearchInput } from '../components/shared/SearchInput';
import { playlistsActions, playlistsSelectors } from '../store/playlist/index';
import { songsActions } from '../store/songs/index';
import { Button , ButtonGroup , ListGroup , Accordion , Modal , useAccordionToggle, Table , Alert , Form , Container , Col , Row   } from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';
import { SongsItem } from '../components/playlist-song-item/playlist-song-item'
import './playlist.css'

function CustomToggle({ children, eventKey , dispatch , playListSongIds }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>{ dispatch(songsActions.getPlaylistSongById(playListSongIds)) });
  return (
    <td>
        <Button className="mr-3" variant="outline-light">
          <i className="fa fa-play pl-2 pr-2"></i>
          <span>Start Playlist</span>
        </Button>
        <Button onClick={decoratedOnClick} variant="outline-light" className="mr-3">
          <i  className="fa fa-list pl-2 pr-2"></i>
          <span>View Playlist</span>
        </Button>
        <Button className="mr-3" variant="outline-light">
          <i className="fa fa-plus-circle pl-2 pr-2" aria-hidden="true"></i>
          <span>Add Song</span>
        </Button>
    </td>
  );
}


class Playlists extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onSongSelect = this.onSongSelect.bind(this);
    this.onSongRemove = this.onSongRemove.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this)
    this.setPlayListTitle = this.setPlayListTitle.bind(this)
    this.closeAlert = this.closeAlert.bind(this)
  }

  componentDidMount() {}

  fetchPlaylists(){
    this.props.dispatch(playlistsActions.fetchPlaylists())
  }

  handleClose() {
    this.props.dispatch(playlistsActions.closePlayListModal())
  }
  
  handleShow() {
    this.props.dispatch(playlistsActions.openPlayListModal())
  }

  onSongSelect(selectedList, selectedItem){
    this.props.dispatch(playlistsActions.addSongtoPlaylist(selectedItem))
  }

  onSongRemove(selectedList, selectedItem){
    this.props.dispatch(playlistsActions.removeSongFromPlaylist(selectedItem))
  }

  onAddPlaylistTitle(){
    this.props.dispatch(playlistsActions.addPlaylistTitle())
  }

  createPlaylist(event){
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      return this.props.dispatch(playlistsActions.showNameRequiredAlert())
    }
    this.props.dispatch(playlistsActions.createPlaylist({ 'name' : this.props.playlistsName , songs : this.props.selectedSongs.map(song => song.id) } ))
  }

  setPlayListTitle(e){
    this.props.dispatch(playlistsActions.addPlaylistTitle(e.target.value))
  }

  closeAlert(){
    this.props.dispatch(playlistsActions.dismissNameRequiredAlert())
  }

  render() {
    const {
      playlists , 
      modalState , 
      topSongs,
      showAlert , 
      selectedSongs ,
      openToggleState
    } = this.props;
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={12} sm={12} className="mt-3">
              <Button variant="light" className="float-right mb-3" onClick={this.handleShow}>Create New Playlist</Button>

            <Accordion>
             <Table className="text-center" variant="dark" striped>
                <thead className="light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Playlist Options</th>
                  </tr>
                </thead>
                
                  { 
                   playlists && playlists.length > 0 && 
                   playlists.map((playlist,i) => 
                   <tbody key={i}>
                      <tr>
                   <td>{playlist.id}</td>
                   <td>{playlist.name}</td>
                   <CustomToggle eventKey={i} dispatch={ this.props.dispatch } playListSongIds={playlist.songs} index={i} ></CustomToggle>
                 </tr>
                 <tr>
                   <td  className="p-0"  colSpan="3">
                      <Accordion.Collapse eventKey={i}>
                      <ListGroup>
                        <ListGroup.Item>
                          <div>
                            { playlist.songs && playlist.songs.map(songId => <SongsItem songId={songId}></SongsItem>)}
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                      </Accordion.Collapse>
                        </td>
                      </tr>
                 </tbody>
                  ) 
                  }
                </Table> 
                  
              </Accordion>
            </Col>
          </Row>
        </Container>
        <div>
        <Modal show={modalState} onHide={this.handleClose}>
          <Form noValidate onSubmit={this.createPlaylist}>
          <Modal.Header bsPrefix="modal-header text-white bg-dark" closeButton >
            <Modal.Title>Create New Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group controlId="playlistControl">
                <Form.Label bsPrefix="text-muted">Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter Playlist Name" onChange={this.setPlayListTitle}></Form.Control>
                <Alert show={showAlert} variant="danger" dismissible onClose={this.closeAlert}>Name is Required</Alert>
              </Form.Group>
              <Form.Group>
                <Form.Label bsPrefix="text-muted">Select Songs </Form.Label>
                <Multiselect
                  options={topSongs} // Options to display in the dropdown
                  onSelect={this.onSongSelect} // Function will trigger on select event
                  onRemove={this.onSongRemove} // Function will trigger on remove event
                  displayValue="title" // Property name to display in the dropdown options
                  />
                </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">Create Playlist</Button>
            <Button variant="danger" onClick={this.handleClose}>Cancel</Button>
          </Modal.Footer>
          </Form>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
      playlists: playlistsSelectors.getPlaylists(state) , 
      modalState : playlistsSelectors.getModalState(state) , 
      topSongs : playlistsSelectors.get100Songs(state) ,
      playlistsName : playlistsSelectors.getPlaylistName(state) , 
      selectedSongs : playlistsSelectors.selectedSongs(state) , 
      showAlert : playlistsSelectors.selectAlertState(state) , 
      openToggleState : playlistsSelectors.selectToggleState(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlists)