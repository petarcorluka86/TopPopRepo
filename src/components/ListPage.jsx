import React from 'react';
import './ListPage.css';
import apiService from '../apiService';

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
    console.log("Stisni me! pritisnut");
    this.props.history.push('/songPage');
};

render() {
  return (
    <div>
        <div className="title">Top Pop!</div>
        {this.state.songsFetched && (
          <ul>
          {this.state.listOfSongs.map(
              (song) =>
                <li key={song.id}> 
                    <span className = "">
                        <button onClick={()=>{this.props.history.push('/songPage/'+song.id)}}>{song.title}</button>
                    </span>
                </li> 
            )
          }
        </ul>
        )}
    </div>
  );
}

} 
export default ListPage;