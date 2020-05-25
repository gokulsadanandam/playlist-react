import React , { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav,NavDropdown , Form , FormGroup , FormControl , Button } from 'react-bootstrap';
import { Route, BrowserRouter , Router , Switch , Redirect } from 'react-router-dom';
import { syncHistoryWithStore , router } from 'react-router-redux';
import { Provider } from 'react-redux';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactJkMusicPlayer from "react-jinke-music-player"
import "react-jinke-music-player/assets/index.css";

import store from './store';

import Dashboard from './containers/Dashboard'
import Playlists from './containers/Playlists';

import { useDispatch  } from 'react-redux'
import { songsActions } from './store/songs/index';
import { playlistsActions } from './store/playlist/index';

import { SearchResults } from './containers/SearchResults';
import { createHashHistory } from 'history'

export const history = createHashHistory()

function MusicNavBar(){
  const dispatch = useDispatch()
  const queryString = useSelector( state => state.songs.querystring )
  const setQuery = (e) => {
    dispatch(songsActions.setQuery(e.target.value))
  }
  const search = (e) => {
    dispatch(songsActions.search())
    history.push('/search-results')
    dispatch(songsActions.clearSearch())
  }

  useEffect(() =>{
   dispatch(playlistsActions.fetchPlaylists())
   dispatch(songsActions.fetchSongs())
  },[])

  const audioList1 = [
    {
      name: 'Despacito',
      singer: 'Luis Fonsi',
      cover:
        'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
      musicSrc: () => {
        return Promise.resolve(
          'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3'
        )
      },
    },
    {
      name: 'Bedtime Stories',
      singer: 'Jay Chou',
      cover:
        'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
      musicSrc:
        'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3',
    }
  ]

  const musicPlayerPosition = {
    top : 60 , 
    left : 0 
  }

  return (
    <div>
      <Navbar  fixed="top" bg="dark" expand="lg" variant="dark">
        <Navbar.Brand bg="light" href="/">MusixMatch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <IndexLinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </IndexLinkContainer>
          <LinkContainer to="/playlists">
            <Nav.Link>Playlists</Nav.Link>
          </LinkContainer>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={ queryString } onChange={ setQuery } />
            <Button variant="success" onClick={ search } >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <ReactJkMusicPlayer mode="full" theme="dark" defaultPosition={ musicPlayerPosition } autoPlay={false}  showThemeSwitch={false} audioLists={ audioList1 } ></ReactJkMusicPlayer>
    </div>
  );
}


export default () => {
  return (
    <Provider store={ store }>
      <Router history={history}>
        <Route path="/" component={MusicNavBar}></Route> 
          <div className="container-fluid" style={{paddingTop:"60px"}}>
            <Route path="/dashboard"  component={Dashboard} />
            <Route path="/playlists" component={Playlists} />
            <Route path="/search-results" component={SearchResults} />
            </div>
        <Redirect exact from="/" to="/dashboard" />
      </Router>
    </Provider>
  )
}
