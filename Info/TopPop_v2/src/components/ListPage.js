import React from 'react'
import apiService from '../apiService'
import SongInfo from './SongInfo'
import '../styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const api = new apiService()

class ListPage extends React.Component {

  constructor() {
    super()
    this.state = {
      listOfSongs: [],
      songsFetched: false,
      showModal: false,
      songId: undefined,
      theSong: {
        id: undefined,
        position: undefined,
        title: undefined,
        artist: undefined,
        duration: undefined
      }
    }
    this.closeModal = this.closeModal.bind(this)
    this.openSongInfo = this.openSongInfo.bind(this)
  }

  componentDidMount() {
    api.getSongs().then(songs => 
      this.setState({
        listOfSongs: songs,
        songsFetched: true
      })
    )
  }

  handleChange = (event) => {
    let newSongs
    switch (event.target.value) {
      case 'asc':
        newSongs = this.state.listOfSongs.sort((a,b)=>(parseInt(a.duration)>parseInt(b.duration))?1:((parseInt(b.duration)>parseInt(a.duration))?-1:0));
        break;
      case 'desc':
        let temp = this.state.listOfSongs.sort((a,b)=>(parseInt(a.duration)>parseInt(b.duration))?1:((parseInt(b.duration)>parseInt(a.duration))?-1:0));
        newSongs = temp.reverse();
        break;
      default:
        newSongs = this.state.listOfSongs.sort((a,b)=>(parseInt(a.position)>parseInt(b.position))?1:((parseInt(b.position)>parseInt(a.position))?-1:0));
    }
    this.setState({listOfSongs: newSongs})
  }

  openSongInfo(id) {
    this.state.listOfSongs.forEach(song => {
      if (parseInt(song.id) === parseInt(id)){
        this.setState({
          theSong: {
            id: song.id,
            position: song.position,
            title: song.title,
            artist: song.artist.name,
            duration: song.duration
          },
          showModal: true
        })
      }
    })
  }

  closeModal() {
    this.setState({showModal: false})
  }

  render() {
    const songList = this.state.listOfSongs.map(song =>
      <li className="list" key={song.id}> 
        <button className="btn btn-outline-secondary btn-block song-btn" onClick={()=>this.openSongInfo(song.id)}>
          {song.position+". "+song.title}</button>
      </li>
      )

    return (
    <div className="background">

      <div className="left-content">
        <div className="title">Welcome to Top Pop!</div>
        <div className="subtitle">These are the ten currently most popular songs on Deezer:</div>
        <div className="container list">{this.state.songsFetched && (<ul>{songList}</ul>)}</div>
      </div>

      <div className="right-content">
        <label className="select-form">
          Sort by duration:
          <select className="form-control select" onChange={this.handleChange}>
            <option className="select" value="-">-</option>
            <option className="select" value="asc">ASC</option>
            <option className="select" value="desc">DESC</option>
          </select>
        </label>
      </div>

      <SongInfo showModal={this.state.showModal} closeModal={this.closeModal} song={this.state.theSong}/>
      
    </div>
    )
  }
} 
export default ListPage;