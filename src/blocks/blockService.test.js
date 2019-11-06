import * as eosjs from 'eosjs';
import { getLatestBlocks, rateLimitBulkRequest } from './blockService';

const mockGetInfo = jest.fn(() => {
  return { head_block_num: 100 };
});

const mockGetBlock = jest.fn(number => {
  return { number };
});

const test = () =>
  new Promise(resolve => {
    resolve(1);
  });

describe('Block service', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('gets ten latest blocks', () => {
    eosjs.JsonRpc = jest.fn().mockImplementation(() => {
      return {
        get_info: mockGetInfo,
        get_block: mockGetBlock,
      };
    });

    return getLatestBlocks().then(data => {
      expect(eosjs.JsonRpc).toHaveBeenCalledTimes(1);
      expect(mockGetInfo).toHaveBeenCalledTimes(1);
      expect(mockGetBlock).toHaveBeenCalledTimes(10);
      expect(data.length).toEqual(10);
    });
  });

  it('finishes immidiately if chain requests are empty', () => {
    const requests = [];

    return rateLimitBulkRequest(requests).then(data => {
      expect(data.length).toEqual(0);
      expect(data).toEqual([]);
    });
  });

  it('waits for chained requests to finish', () => {
    const requests = [test, test, test];

    return rateLimitBulkRequest(requests).then(data => {
      expect(data.length).toEqual(3);
      expect(data).toEqual([1, 1, 1]);
    });
  });
});
