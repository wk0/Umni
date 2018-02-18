import React from 'react';
import Main from './components/Main.jsx';
import Header from './components/common/Header.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    )
  }
}