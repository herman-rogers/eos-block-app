import React from 'react';
import { Table } from 'antd';
import BlockList from './BlockList';

export default function BlockTable({ data, loading }) {
  const columns = [
    {
      title: 'Block Hash',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: timestamp => {
        const date = new Date(timestamp);
        return <div>{date.toLocaleString()}</div>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'confirmed',
      key: 'confirmed',
    },
  ];
  const expandedRow = record => <BlockList block={record} />;

  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={false}
      expandedRowRender={expandedRow}
    />
  );
}
