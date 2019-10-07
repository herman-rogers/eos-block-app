import { JsonRpc } from 'eosjs';

let service = null;

function getEosService() {
  if (!service) {
    service = new JsonRpc('https://api.eosnewyork.io', { fetch });
  }
  return service;
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export async function getLatestBlocks() {
  const rpc = getEosService();
  const { head_block_num } = await rpc.get_info();
  const blocks = [];

  for (let i = 0; i < 10; i += 1) {
    await delay(100);
    blocks.push(rpc.get_block(head_block_num - 1));
  }

  return Promise.all(blocks);
}
