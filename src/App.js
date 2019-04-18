
import React, { Component } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        
        <BrowserRouter>
        <Content />
        <SideBar />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;