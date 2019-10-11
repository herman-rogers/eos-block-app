import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from 'antd';
import styled from 'styled-components';
import { getLatestBlocks } from './blocks/blockService';
import BlockTable from './blocks/BlockTable';
import 'antd/dist/antd.css';
import './app.css';

const Styles = styled.div`
  .load-button {
    margin: 20px;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      blocks: [],
    };

    this.getBlocks = this.getBlocks.bind(this);
  }

  componentDidMount() {
    this.getBlocks();
  }

  getBlocks() {
    this.setState({ loading: true });
    getLatestBlocks().then(blocks => {
      this.setState({
        loading: false,
        blocks: blocks.reverse(),
      });
    });
  }

  render() {
    const { loading, blocks } = this.state;

    return (
      <Styles>
        <Button
          type="primary"
          className="load-button"
          loading={loading}
          onClick={this.getBlocks}
        >
          Load
        </Button>
        <BlockTable data={blocks} loading={loading} />
      </Styles>
    );
  }
}

export default hot(App);
