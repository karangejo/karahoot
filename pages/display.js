import {Component} from 'react';
import OpenSocket from 'socket.io-client';

const socket = OpenSocket('localhost:8000');

class DisplayPage extends Component {
        
        componentDidMount(){
                socket.on('sendNewQuestion',(question) => {
                        console.log(question);      
                }); 
        };

        startGame = (e) => {
                const message = "starting a new game!"
                socket.emit('start',message);
        }

        render(){
                return(
                        <div>
                                <h1>Karahoot!</h1>
                                <button onClick={this.startGame} >Start</button>
                        </div>
                );
        };
}

export default DisplayPage;
