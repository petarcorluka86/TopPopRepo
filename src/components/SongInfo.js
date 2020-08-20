import React from 'react'
import Modal from 'react-modal'

function SongInfo(props) {
    Modal.setAppElement('body');
    return (
        <Modal className="my-modal" isOpen={props.showModal}>
            <div className="modal-title">SONG DETAILS</div>
            <div className = "modal-text container">
                <div>Position: {props.song.position} </div>
                <div>Title: {props.song.title}</div>
                <div>Artist: {props.song.artist}</div>
                <div>Duration: {("0"+Math.floor(props.song.duration / 60)).slice(-2)} :{("0" + props.song.duration % 60).slice(-2)}</div>
            </div>
            <button className="btn btn-dark close-btn" onClick={()=> props.closeModal()}>Close</button>
        </Modal>
    )
}
export default SongInfo