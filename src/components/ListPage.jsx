import React from 'react';
import './ListPage.css';
import apiService from '../apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';

const api = new apiService();


class ListPage extends React.Component {
 
state = {
  listOfSongs: [],
  songsFetched: false,
  showModal: false,
  songId: undefined,
  position: undefined,
  title: undefined,
  artist: undefined,
  duration: undefined,
  duration_mm: undefined,
  duration_ss: undefined,
};

componentDidMount() {
  api.getSongs()
    .then( (songs) => {
      this.setState({listOfSongs : songs},this.callBack);
    });
}

callBack(){
  this.setState({songsFetched : true});
  console.log("Songs fetched from https://api.deezer.com/chart.");
  console.log(this.state.listOfSongs);
};

handleChange = (event) => {
  if(event.target.value === "asc"){
    var songs = this.state.listOfSongs.sort((a,b) => (parseInt(a.duration) > parseInt(b.duration)) ? 1 : ((parseInt(b.duration) > parseInt(a.duration)) ? -1 : 0));
    this.setState({listOfSongs: songs})
  }
  else if (event.target.value === "desc"){
    var songs = this.state.listOfSongs.sort((a,b) => (parseInt(a.duration) > parseInt(b.duration)) ? 1 : ((parseInt(b.duration) > parseInt(a.duration)) ? -1 : 0));
    this.setState({listOfSongs: songs.reverse()})
  }
  else{
    var songs = this.state.listOfSongs.sort((a,b) => (parseInt(a.position) > parseInt(b.position)) ? 1 : ((parseInt(b.position) > parseInt(a.position)) ? -1 : 0));
    this.setState({listOfSongs: songs})
  }
};

openSongInfo = async () => {
  this.state.listOfSongs.forEach((song)=>{
    if (parseInt(song.id) === parseInt(this.state.songId)){
      const mm = Math.floor(song.duration / 60);
      const ss = song.duration % 60;
      this.setState({
        position: song.position,
        title: song.title,
        artist: song.artist.name,
        duration: song.duration,
        duration_mm: ("0" + mm).slice(-2),
        duration_ss: ("0" + ss).slice(-2)
      });
    }
  })
  this.setState({showModal: true});
};

closeModal = async () => {
  this.setState({showModal: false});
}


render() {
  return (
    <div className="background">
      <div className="leftContent">
        <div className="title">Welcome to Top Pop!</div>
        <div className="subtitle">These are the ten currently most popular songs on Deezer:</div>
          <div className="container list">
          {this.state.songsFetched && (
            <ul>
            {this.state.listOfSongs.map(
                (song) =>
                  <li className="list" key={song.id}> 
                    <button className="btn  btn-outline-secondary  blackTXT btn-block songBtn" onClick={()=>
                      {this.setState({songId: song.id},this.openSongInfo)}}>
                      {song.position+". "+song.title}
                    </button>
                  </li>
            )}
            </ul>
          )}
          </div>
      </div>
      <div className="rightContent">
      
        <label className="selectForm">
          Sort by duration:
          <select className="form-control select" placeholder="Select.." onChange={this.handleChange}>
          <option className="select" value="-">-</option>
            <option className="select" value="asc">ASC</option>
            <option className="select" value="desc">DESC</option>
          </select>
        </label>
      
      </div>
      <Modal className="sizeAndColor position" isOpen={this.state.showModal}>
        <div className="modalContent">
          <div className="modalTitle">SONG DETAILS</div>
          <div className = "modalText container borderB">
          <div>Position: {this.state.position} </div>
          <div>Title: {this.state.title}</div>
          <div>Artist: {this.state.artist}</div>
          <div>Duration: {this.state.duration_mm}:{this.state.duration_ss}</div>
          </div>
        </div>
        <button className="closeBtn btn btn-dark" onClick={this.closeModal}>Close</button>
      </Modal>
    </div>
  );
}

} 
export default ListPage;