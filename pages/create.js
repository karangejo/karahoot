import {Component} from 'react';

class CreatePage extends Component {
        state =
                {
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

        addQuestion = (event) => {
                event.preventDefault();
                const questionArray = this.state.questions;
                const newQuestion = {
                        prompt: this.state.prompt,
                        Q1:this.state.firstQ,
                        Q2:this.state.secondQ,
                        Q3:this.state.thirdQ,
                        Q4:this.state.fourthQ,
                        correct:this.state.correctAnswer,
                }

                questionArray.push(newQuestion);
                this.setState({questions:questionArray,displayQs: true});

                console.log("new questions array: ",questionArray);
                
               
        };


        displayQuestions(){
                const questionArray = this.state.questions;
                
                console.log("from display question: ", questionArray);

                const questionDisplay = questionArray.map((item,index) => {
                        return (
                                <ul>
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

        saveQuestions = (event) => {
                event.preventDefault();
                const questionsToBeSaved = this.state.questions;
                console.log('Questions to be saved: ', questionsToBeSaved);
        }
        
        render(){
                return(
                        <div>
                                <h1>Karahoot!</h1>
                                <form action="submit" onSubmit={this.addQuestion}>
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
