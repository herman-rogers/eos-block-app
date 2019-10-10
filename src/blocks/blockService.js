import { JsonRpc } from 'eosjs';

let service = null;

function getEosService() {
  if (!service) {
    service = new JsonRpc('https://api.eosnewyork.io', { fetch });
  }
  return service;
}

async function rateLimitBulkRequest(requests) {
  const bulkRequests = [...requests];
  let currentReq = requests.length - 1;
  let prevRequest = null;
  let responses = [];

  return new Promise(async resolve => {
    while (bulkRequests.length > 0) {
      if (currentReq === prevRequest) {
        return;
      }
      prevRequest = currentReq;
      const res = await bulkRequests[currentReq]();

      responses.push(res);
      bulkRequests.pop();
      currentReq = bulkRequests.length - 1;
    }
    resolve(responses);
  });
}

export async function getLatestBlocks(blockCount = 10) {
  const rpc = getEosService();
  const { head_block_num } = await rpc.get_info();
  const blockRequests = [];

  for (let i = 0; i < blockCount; i += 1) {
    blockRequests.push(() => {
      return rpc.get_block(head_block_num - i);
    });
  }
  return await rateLimitBulkRequest(blockRequests, 100);
}
