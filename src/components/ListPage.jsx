import React from 'react';
import './ListPage.css';
import apiService from '../apiService';
import 'bootstrap/dist/css/bootstrap.min.css';

const api = new apiService();

class ListPage extends React.Component {

state = {
  listOfSongs: [],
  songsFetched: false
};

componentDidMount() {
  api.getSongs()
    .then( (response) => {
      this.setState({listOfSongs : response},this.callBack);
    });
}

callBack(){
  this.setState({songsFetched : true});
  console.log("Songs fetched from https://api.deezer.com/chart.");
  console.log(this.state.listOfSongs);
};

handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
};

openSongInfo = async (event) => {
    event.preventDefault();
    this.props.history.push('/songPage');
};

render() {
  return (
    <div className="background">
      <div className="leftContent">
        <div className="title">Welcome to Top Pop!</div>
        <div className="subtitle">These are the ten currently most popular songs on deezer:</div>
          <div className="container list">
          {this.state.songsFetched && (
            <ul>
            {this.state.listOfSongs.map(
                (song) =>
                  <li className="list" key={song.id}> 
                          <button className="btn  btn-outline-secondary  blackTXT btn-block songBtn" onClick={()=>{this.props.history.push('/songPage/'+song.id)}}>{song.position+". "+song.title}</button>
                  </li> 
              )
            }
          </ul>
          )}
          </div>
      </div>
    </div>
  );
}

} 
export default ListPage;