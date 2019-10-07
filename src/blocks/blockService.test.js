import * as eosjs from 'eosjs';
import { getLatestBlocks } from './blockService';

const mockGetInfo = jest.fn(() => {
  return { head_block_num: 100 };
});
const mockGetBlock = jest.fn(number => {
  return { number };
});

describe('Block service', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('gets ten latest blocks', async () => {
    eosjs.JsonRpc = jest.fn().mockImplementation(() => {
      return {
        get_info: mockGetInfo,
        get_block: mockGetBlock,
      };
    });

    await getLatestBlocks();

    expect(eosjs.JsonRpc).toHaveBeenCalledTimes(1);
    expect(mockGetInfo).toHaveBeenCalledTimes(1);
    expect(mockGetBlock).toHaveBeenCalledTimes(10);
  });
});
