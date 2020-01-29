import {Component} from 'react';
import OpenSocket from 'socket.io-client';

const socket = OpenSocket('localhost:8000');

class PlayPage extends Component {

        state = {
                name: '',
                score: 0,
                connection: '',
                currentQuestion: '',
                answer: ''
        }

        componentDidMount(){
                socket.on('sendNewQuestion',(question) => {
                        console.log(question);
                        this.setState({currentQuestion:question,answer:question.correct});

                });
        };

        answerQuestion(answer){
          console.log(answer);
          if(answer === this.state.answer){
            console.log('you got the right answer!');
          }
          socket.emit('sendAnswer', answer);
        };

        displayQuestion(){

                const question = this.state.currentQuestion;
                const prompt = question.prompt;
                const question1 = question.answers.one;
                const question2 = question.answers.two;
                const question3 = question.answers.three;
                const question4 = question.answers.four;

                return(
                        <div>
                                <h1>{prompt}</h1>
                                 <ul>
                                        <button onClick = {() => this.answerQuestion('one')}>{question1}</button>
                                        <button onClick = {() => this.answerQuestion('two')}>{question2}</button>
                                        <button onClick = {() => this.answerQuestion('three')}>{question3}</button>
                                        <button onClick = {() => this.answerQuestion('four')}>{question4}</button>
                                </ul>
                        </div>
                );
        }

        // first ask for a name and a server to connect to and then start showing questions and scores
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
