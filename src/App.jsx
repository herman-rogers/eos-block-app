import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import 'antd/dist/antd.css';
import { getLatestBlocks } from './blocks/blockService';

class App extends Component {
  componentDidMount() {
    getLatestBlocks().then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <p>Hello React!</p>
      </div>
    );
  }
}

export default hot(App);
