import {Component} from 'react';
import OpenSocket from 'socket.io-client';

const socket = OpenSocket('localhost:8000');

class PlayPage extends Component {

        state = {
                currentQuestion: ''
        }

        componentDidMount(){
                socket.on('sendNewQuestion',(question) => {
                        console.log(question);
                        this.setState({currentQuestion:question});
                }); 
        };
        
        displayQuestion(){
                
                const question = this.state.currentQuestion;
                const prompt = question.prompt;
                console.log(question.answers.one);
                const question1 = question.answers.one;
                const question2 = question.answers.two;
                const question3 = question.answers.three;
                const question4 = question.answers.four;
                
                return(
                        <div>
                                <h1>{prompt}</h1>
                                 <ul>
                                        <button>{question1}</button>
                                        <button>{question2}</button>
                                        <button>{question3}</button>
                                        <button>{question4}</button>
                                </ul> 
                        </div>
                );
        }

        render(){
                return(
                        <div>
                                <h1>Karahoot!</h1>
                                {this.state.currentQuestion && this.displayQuestion()}
                        </div>
                );
        };
}

export default PlayPage;
