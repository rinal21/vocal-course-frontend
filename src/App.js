
import React, { Component } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import Login from './modules/login-admin/Login-Form';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

class App extends Component {

  render() {
    let path = this.props.location.pathname
//     let appState = {
//       isLoggedIn: false,
//       user: {}
//     };
//     localStorage["appState"] = JSON.stringify(appState);
// this.setState(appState);

    // const app = JSON.parse(localStorage["appState"])
    // const isLoggedin = app.isLoggedIn
    // console.log('login ? ' + appState.isLoggedIn)
    return (
      <BrowserRouter>
          {/* {isLoggedin ? (<div>
            <Header />
            <Content />
            <SideBar />
          </div>

          ) : (<Route exact path="/login" component={Login} />)} */}
        {/* {this.props.location.pathname != 'login' ? */}
          <div>
            
            {path != '/login' && localStorage["appState"] && JSON.parse(localStorage["appState"]).isLoggedIn && <Header />}
            <Content />
            {path != '/login' && localStorage["appState"] && JSON.parse(localStorage["appState"]).isLoggedIn && <SideBar />}
          </div>
          {/* <div>
            <Login />
          </div> */}
        {/* } */}
      </BrowserRouter>

    );
  }
}

export default withRouter(App);