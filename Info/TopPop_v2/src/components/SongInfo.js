import React from 'react'
import Modal from 'react-modal'

class SongInfo extends React.Component {
    render() {
        return (
            <Modal className="my-modal" isOpen={this.props.showModal}>
                <div className="modal-title">SONG DETAILS</div>
                <div className = "modal-text container">
                    <div>Position: {this.props.song.position} </div>
                    <div>Title: {this.props.song.title}</div>
                    <div>Artist: {this.props.song.artist}</div>
                    <div>Duration: {("0"+Math.floor(this.props.song.duration / 60)).slice(-2)} :{("0" + this.props.song.duration % 60).slice(-2)}</div>
                </div>
                <button className="btn btn-dark close-btn" onClick={()=> this.props.closeModal()}>Close</button>
            </Modal>
        )
    }
}
export default SongInfo