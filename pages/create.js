import {Component} from 'react';
import OpenSocket from 'socket.io-client';
import axios from 'axios';

const socket = OpenSocket('localhost:8000');

class CreatePage extends Component {
        state =
                {
                        owner: 'me',
                        title: '',
                        prompt: '',
                        firstQ: '',
                        secondQ: '',
                        thirdQ: '',
                        fourthQ: '',
                        correctAnswer: '',
                        displayQuestions: false,
                        questions: [],
                        questionsCounter:0,
                        displayQs: false
                };

        validateQuestion = () => {
          if(!this.state.index || !this.state.prompt || ! this.state.firstQ || !this.state.secondQ || !this.state.thirdQ || !this.state.fourthQ|| ! this.state.correctAnswer){
              return false;
            }
          return true;
        }

        validateHasAnswer = () => {
          const answer = this.state.correctAnswer
          if((answer === this.state.firstQ) || (answer === this.state.secondQ) || (answer === this.state.thirdQ) || ( answer === this.state.fourth)){
            return true;
          }
          return false;
        }

        addQuestion = (event) => {
                event.preventDefault();
                if(validateQuestion() && validateHasAnswer()){
                  const questionArray = this.state.questions;
                  const newQuestion = {
                          index: this.state.questionsCounter,
                          prompt: this.state.prompt,
                          Q1:this.state.firstQ,
                          Q2:this.state.secondQ,
                          Q3:this.state.thirdQ,
                          Q4:this.state.fourthQ,
                          correct:this.state.correctAnswer,
                  }

                  questionArray.push(newQuestion);
                  var counter = this.state.questionsCounter + 1;
                  this.setState({questions:questionArray,displayQs: true,questionsCounter:counter});

                  console.log("new questions array: ",questionArray);
                } else {
                  console.log("Could not add question, missing some fields or correct answer does not match");
                }

        };


        displayQuestions(){
                const questionArray = this.state.questions;

                console.log("from display question: ", questionArray);

                const questionDisplay = questionArray.map((item,index) => {
                        return (
                                <ul>
                                        <li key={`c${index}`}>Number: {item.index}</li>
                                        <li key={`p${index}`}>Prompt: {item.prompt}</li>
                                        <li key={`1${index}`}>Q1 {item.Q1}</li>
                                        <li key={`2${index}`}>Q2 {item.Q2}</li>
                                        <li key={`3${index}`}>Q3 {item.Q3}</li>
                                        <li key={`4${index}`}>Q4 {item.Q4}</li>
                                        <li key={`a${index}`}>Answer {item.correct}</li>
                                </ul>
                        );
                });


                return(
                        <div>
                                {questionDisplay}
                        </div>
                );
        }

        validateBeforeSave = () => {
          if(!this.state.title || !this.state.owner || !this.state.questionsCounter|| !this.state.questions){
            return false;
          }

          return true;
        }

        saveQuestions = (event) => {
                event.preventDefault();
                if(validateBeforeSave()){
                  const questionsToBeSaved = {title: this.state.title,
                                              owner: this.state.owner,
                                              numberOfQuestions: this.state.questionsCounter,
                                              questions: this.state.questions};
                  console.log(questionsToBeSaved);
                  axios.post('http://localhost:3001/tests',questionsToBeSaved)
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => {
                              console.log(err);
                            });

                  console.log('Questions to be saved: ', questionsToBeSaved);
                  socket.emit('saveQuestions', questionsToBeSaved);
                } else {
                  console.log("Unable to save must include title owner number of questions and the actual questions");
                }

        }

        render(){
                return(
                        <div>
                                <h1>Karahoot!</h1>
                                <form action="submit" onSubmit={this.addQuestion}>
                                        <h4>Title: </h4>
                                        <input type="text" onChange={event => this.setState({title: event.target.value})}/><br/>
                                        <h4>Question Prompt: </h4>
                                        <input type="text" onChange={event => this.setState({prompt: event.target.value})}/><br/>
                                        <h4>Question 1: </h4>
                                        <input type="text" onChange={event => this.setState({firstQ: event.target.value})}/><br/>
                                        <h4>Question 2: </h4>
                                        <input type="text" onChange={event => this.setState({secondQ: event.target.value})}/><br/>
                                        <h4>Question 3: </h4>
                                        <input type="text" onChange={event => this.setState({thirdQ: event.target.value})}/><br/>
                                        <h4>Question 4: </h4>
                                        <input type="text" onChange={event => this.setState({fourthQ: event.target.value})}/><br/>
                                        <h4>Correct Answer: </h4>
                                        <input type="text" onChange={event => this.setState({correctAnswer: event.target.value})}/><br/>
                                        <button type="submit">Add Question</button>
                                </form>
                                                <button onClick={this.saveQuestions}>Save Questions</button>
                                                {this.state.displayQs && this.displayQuestions()}
                        </div>
                );
        };
}

export default CreatePage;
