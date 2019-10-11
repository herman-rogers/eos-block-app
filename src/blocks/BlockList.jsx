import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  color: #273849;

  h3 {
    color: #1890ff;
  }

  ul {
    list-style-type: none;
  }

  li:last-child {
    border: none;
  }

  .block-item {
    padding: 12px 0;
    border-bottom: 1px solid #e8e8e8;
  }
`;

function BlockItem({ title, data }) {
  return (
    <li className="block-item">
      <h4>{title}</h4> {data}
    </li>
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
        <BlockItem title="transaction count" data={transactions.length} />
      </ul>
    </Styles>
  );
}
