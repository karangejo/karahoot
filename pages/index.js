import {Component} from 'react';

class MainPage extends Component {

        render(){
                return(
                        <div>
                                <h1>Karahoot!</h1>
                                <a href="/play">
                                        <button>Play</button>
                                </a>
                                <a href="/display">
                                        <button>Display</button>
                                </a>
                        </div>
                );
        };
}

export default MainPage;
