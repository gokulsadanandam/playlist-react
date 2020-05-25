import React from 'react';
import { useEffect } from 'react'
import {  useDispatch , useSelector } from 'react-redux'
import { playlistsActions } from '../../store/playlist/index';
import { Button , ButtonGroup , Card , ListGroup , Accordion , Modal , useAccordionToggle, Table , Alert , Form , Container , Col , Row   } from 'react-bootstrap'

const imagesUrl = [
"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAEgASAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAABAAQFBgIDBwj/xAA2EAACAQMDAgQEBAMJAAAAAAABAgMABBEFEiExQQYTUWEicYGhMpHB8BSCsQcjJkJSYsLD4f/EABkBAAIDAQAAAAAAAAAAAAAAAAACAQMEBf/EAB0RAQEAAgMBAQEAAAAAAAAAAAABAhEDEiExIgT/2gAMAwEAAhEDEQA/AJ+xsVDfhFLVLFEt3YgYA5qRsyoXLenFLUFWW0lBGcjGPnXOx45YvyunM10NrmwmuxEWdYHkXcpIDBSeg/f61C5W1uoNuPIuVfCxsfhYcdGPvng/LmvRGlWls+kXFubdfM8uRS+3sRjrXm/Wh+EYOCM+3Irdhj1jNaiZo2jkZD1U4rX3p5foT5U3JEsasT6nGD9waaxxtJIEQZJpkxjQrfLD5XDKd2M1pIx2oAjqKVAUaA9JWU4kQKvPHBrbcRsqIqyHBdcg/PP6VWfD96TsRz75qYvrzdeW0HJjkBbg4z0H/KsXB+qt5LqHcHiQaYJYNiuxY8k9DmvP2qD+9KHtwCfbiu/vPpGpXUOkMC+p2drDcyqyZRdy7iuf9WPi5HIxXBvEqNFrV9DtwI7mUDHYhzXQ80zSXt6UKC50iIkjdAzoB/tyGH3dvypykFghSWVgoEIykIBMmQOQB3yHz9KZ6CjTx3sW3OyNZufY7f8As+1bUULbZzlckDk4qNbie3XI8ns7Jy5kG8q+wnLBU4HJ5GRnuO31xoGm2BZUk3REvtG5y2Rn0HIyMnnp+eNDzSQu5gdnbyvwdDtP3A/8rYb2eNDL58g2ZXaTwOSOPftn2FKsadQtY7eyTy4wVYnEjOhPB4wVAJyPX+tGo24uJLq4aaZy7nufSlQh1zSJvLkiHG0DkkVLWxW81xdygtDHvQkZ2+v6VW7K5+NQOU6GrV4NxcXF1MCNyk4+Q4/f7zk/lnpuX1H+Er3/ABZr9zc5F1/FNCg5w0MYMSHH8pGfUfOubeO4BF4ovMLhZZXkX5Ek10GfV1XxLKlqoBkm8nOcbsMftlmP1NV3+0+y8rWreTbt32yce+TW/Xijt6pehSGLU4wG2+arxex3KQM/zYp/e3KnzUAxge3NQql4ZhIhwyMGU+4ORTm8JWV8HKcFcdMEZH2NLLqGuMtK3uyg2uxKDOO+OlNZ7h5Qqs2VXoD+/pWBbgjtWIpTs096FFMZ9BSoCzjVvIjADAt6E4q+eEzc2mmnUFMu5wUicqQgY4Jxn8XTPGenbvbtH8PeGtEMDW9jD/ESkiNpPjkbAyTk5PQdvaoTxLrD3WtNAx2Jbgoibvfqff8AfaqJrH4LtWdbshZ2dvJExWRGzvB56jn8qbf2oarBqC6XdxMC8tv8eOMMOD9zTjxTfCaJoYShRCU6kk444A+X9aquo3VlcRWJvXmPkjAhjQDcCQW+M9DkH/Keo+mjG+K0NbWd1qE3k2dvJPMx+FI1LE/QUdTgNqYoJGRpkTbLsYOoOTgBhkHggcdxVin8XiKway0q0itIHADrGD8eOm4nJY/P7VV7md523SHJJ9Km6Tjs1zzRHvRx+dE4x15pTs0AyB6daVCHrRoDteoeOUsfOgthGwCqFk3A4Pc8HI9Ox6+1UK/1q1lncySMxLbjtGd1ClVWOE+l3tE3utGRQkKbVFREjs5y1KlVqdApxQ7ilSoSWeSccUCM0qVAbYh2AzRpUqEP/9k=",
"https://i.ytimg.com/vi/KtypSRcwIhA/maxresdefault.jpg",
"https://townsquare.media/site/623/files/2012/09/one-more-sad-song-video.jpg?w=980&q=75"]



const CardContainer = ({song,index,buttonAction}) => {

  const dispatch = useDispatch()
  const openModalToAddSongsToPlaylist = () => { dispatch(playlistsActions.openPlayListModalToAddSongs(song.id)) }
  
  return (
      <Card style={{ width: '18rem' }} className="m-2 text-center border-0">
        <Card.Img variant="top" src={imagesUrl[index%4]} className="w-100 h-50" />
        <Card.Body className="pb-0">
          <Card.Title className="text-muted text-nowrap text-truncate"><b>{song.title}</b></Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-nowrap text-truncate">{song.artist}</Card.Subtitle>
          <Card.Text>
            <i className="fa fa-heart-o fa-2x pr-3 text-danger"  aria-hidden="true"></i>
            <i className="fa fa-plus-square fa-2x pr-3 text-info" aria-hidden="true" onClick={ openModalToAddSongsToPlaylist }></i>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="p-0 w-100 bg-white border-0">
          <Button className="rounded-0 w-100 mt-1" block variant="dark"> 
              <i className="fa fa-play pr-2" aria-hidden="true"></i>
              <span>Play</span>
            </Button>
        </Card.Footer>
      </Card>
  )

}


export const SongsTray = ({songs,title,wrapStyle="nowrap"}) => {
  return (
    <Container className="text-light">
      <Row>
        <Col md={12} >
          <h3>
            {title}
          </h3>
          <div className="d-flex justify-content-center" style={{flexWrap : wrapStyle }}>
            { songs.map( (song,index) => <CardContainer key={index} song={song} index={index} ></CardContainer> )  }
          </div>
        </Col>
      </Row>
    </Container>
  )
};
