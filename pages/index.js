import {Component} from 'react';
import GoogleLogin from 'react-google-login';



class MainPage extends Component {
        state =
                {
                  email:'',
                  name:'',
                  loggedIn: false
                }


        render(){
                const responseGoogle = (response) => {
                  console.log(response);
                  this.setState({email: response.profileObj.email, name: response.profileObj.name, loggedIn: true});
                  // check if the user is in the database if not then add a new user
                }


                // only display play and login at first and then after logged in can create and serve games
                return(
                        <div>
                                <h1>Karahoot!</h1>
                                <a href="/play">
                                        <button>Play</button>
                                </a>
                                <a href="/display">
                                        <button>Display</button>
                                </a>

                                  <GoogleLogin
                                  clientId="687641367817-phvujd6f7h6cs69sobr0hbjkme4kodt1.apps.googleusercontent.com"
                                  buttonText="Login"
                                  onSuccess={responseGoogle}
                                  onFailure={responseGoogle}
                                  cookiePolicy={'single_host_origin'}
                                  />
                        </div>
                );
        };
}

export default MainPage;
