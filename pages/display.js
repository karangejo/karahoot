import {Component} from 'react';
import OpenSocket from 'socket.io-client';
import axios from 'axios';

const socket = OpenSocket('localhost:8000');

class DisplayPage extends Component {

        state = {
                  userID:'',
                  email:'',
                  name:'',
                  testList: []
                }

        static getInitialProps({query}) {
          return {query}
        }

        componentDidMount(){
                this.setState({userID: this.props.query.id});

                // get the logged in user from the props query and save it to state
                const getURL = 'http://localhost:3001/users/id/?id=' + this.props.query.id

                axios.get(getURL)
                  .then((res) => {
                    console.log(res);
                    this.setState({email: res.data[0].email, name: res.data[0].name});
                  })
                  .catch((err) => {
                    console.log(err);
                  })

                  //get a list of test from this user and save it to state

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
