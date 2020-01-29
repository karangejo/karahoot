import {Component} from 'react';
import GoogleLogin from 'react-google-login';

//  <GoogleLogin
//  clientId="googleclientid"
//  buttonText="Login"
//  onSuccess={responseGoogle}
//  onFailure={responseGoogle}
//  cookiePolicy={'single_host_origin'}
//  />

class MainPage extends Component {



        render(){
                const responseGoogle = (response) => {
                  console.log(response);
                }


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
