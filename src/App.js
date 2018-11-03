import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './view/image/logo.png';
import './view/css/App.css';
import NavigationBar from './view/component/NavigationBar';
import FilmListesi from './view/component/FilmListesi';


class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <FilmListesi />
        {/* <div className="App"></div> */}
      </div>
    );
  }
}

export default App;
