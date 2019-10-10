import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { getLatestBlocks } from './blocks/blockService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      blocks: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    getLatestBlocks().then(blocks => {
      console.log(blocks);

      this.setState({
        loading: false,
        blocks,
      });
    });
  }

  render() {
    const { loading, blocks } = this.state;
    const columns = [
      {
        title: 'Block Number',
        dataIndex: 'block_num',
        key: 'id',
      },
    ];

    return (
      <div>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={blocks}
          columns={columns}
        />
      </div>
    );
  }
}

export default hot(App);
