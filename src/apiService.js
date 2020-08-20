// eslint-disable-next-line
import songData from './songData'

export default class apiService {

    /*This function should be used for fetching data from Deezer's api, but if there are problems with fetching, this function
    can be commented and function below can be used just for testing other functionalities in this application.
    There should not be any problems with fetching data.*/
    getSongs = async() => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/"; // url used for avoiding Acces-Control-Allow-Origin CORES error
        const url = "https://api.deezer.com/chart"; //fetch could be more efficient if i used "https://api.deezer.com/chart/tracks"
        const songs = await fetch(proxyurl + url) 
            .then(response => 
                response.json())
            .then(contents => {return contents.tracks})
            .catch(() => console.log("Can’t access " + url + "."))
        return songs.data
        };

    /*This function should be used ONLY for testing other functionalities in this in this application, it should be
    commented otherwise. It has same effect like PROPER FUNCTION ABOVE, but this one's data is hard coded for testing purposes.*/
    /*
    getSongs = async() => {
        return songData.tracks.data
    };
    */
}