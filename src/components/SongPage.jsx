import React from 'react';
import './ListPage.css'
import apiService from '../apiService';

const api = new apiService();

class SongPage extends React.Component {

state = {
  id: undefined,
  position: undefined,
  title: undefined,
  artist: undefined,
  duration: undefined,
  duration_mm: undefined,
  duration_ss: undefined,
  songsFetched: false
};

componentDidMount() {
  const {songId} = this.props.match.params;
  this.setState({id: songId},this.getInfo);
}

getInfo(){
  api.getSongs()
  .then((songs) => {
    songs.forEach((song)=>{
      console.log("trazim pjesmu s idom:" + this.state.id)
      if (parseInt(song.id) === parseInt(this.state.id)){
        console.log("naso")
        const mm = Math.floor(song.duration / 60);
        const ss = song.duration % 60;
        this.setState({
          position: song.position,
          title: song.title,
          artist: song.artist.name,
          duration: song.duration,
          duration_mm: mm,
          duration_ss: ss
        },this.callBack);
      }
    })
  })
}

callBack(){
  this.setState({songsFetched : true});
  console.log("Songs fetched from https://api.deezer.com/chart.");
};

handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
};

render() {
  return (
    <div>
      tu sam
    {this.state.songsFetched && (
    <div>
    <div>{this.state.title}</div>
    <div>{this.state.artist}</div>
    </div>)}</div>
  );
}

}

export default SongPage;