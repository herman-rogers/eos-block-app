import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const Styles = styled.div`
  color: #273849;

  h3 {
    color: #273849;
  }

  ul {
    list-style-type: none;
  }

  .transaction-list {
    margin-top: 25px;
  }

  .block-item {
    padding: 12px 0;
    background-color: #ffffff;
    margin: 12px;
    padding: 10px 20px;
    border-radius: 10px;
    color: #737373;

    h4 {
      color: #1890ff;
    }

    :last-child {
      border: none;
    }
  }
`;

function BlockItem(props) {
  const { title, data } = props;
  return (
    <div className="block-item">
      <h4>{title}</h4> {data}
      {props.children}
    </div>
  );
}

export default function BlockList({ block }) {
  const {
    id,
    previous,
    producer,
    producer_signature,
    ref_block_prefix,
    schedule_version,
    transaction_mroot,
    transactions,
    block_num,
    action_mroot,
  } = block;

  return (
    <Styles>
      <h3>Block {block_num}</h3>
      <ul>
        <BlockItem title="hash" data={id} />
        <BlockItem title="previous" data={previous} />
        <BlockItem title="producer" data={producer} />
        <BlockItem title="producer signature" data={producer_signature} />
        <BlockItem title="ref block prefix" data={ref_block_prefix} />
        <BlockItem title="schedule version" data={schedule_version} />
        <BlockItem title="action mroot" data={action_mroot} />
        <BlockItem title="transaction mroot" data={transaction_mroot} />
        <Collapse className="transaction-list">
          <Panel key="1" header={`${transactions.length} transactions`}>
            {transactions.map(transaction => {
              const {
                cpu_usage_us,
                net_usage_words,
                status,
                trx,
              } = transaction;
              const id = typeof trx === 'object' ? trx.id : trx;

              return (
                <BlockItem key={id} title={`Transaction ${id}`}>
                  <BlockItem title="status" data={status} />
                  <BlockItem title="cpu usage" data={cpu_usage_us} />
                  <BlockItem title="net usage" data={net_usage_words} />
                </BlockItem>
              );
            })}
          </Panel>
        </Collapse>
      </ul>
    </Styles>
  );
}
