/// <reference types="jest" />
import { getDefinitionFor } from '../index.js';

/* mock console.log to keep test output clean */
beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

describe('getDefinitionFor', () => {
  const originalFetch = (global as any).fetch;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    jest.restoreAllMocks();
  });

  /* #1 */
  test('throws when global fetch is unavailable', async () => {
    delete (global as any).fetch;

    await expect(getDefinitionFor({ word: 'test' })).rejects.toThrow(
      '[Bad]: Global Fetch Not Available',
    );
  });

  /* #2 */
  test('returns api-ok and payload when response ok', async () => {
    const mockDefinition = [{ word: 'hello' }];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockDefinition),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const res = await getDefinitionFor({ word: 'hello' });
    expect(res.code).toBe('api-ok');
    expect(res.payload).toEqual(mockDefinition);
  });

  /* #3 */
  test('returns api-fail when response.ok is false', async () => {
    const mockError = { title: 'No Definitions Found' };
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue(mockError),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const res = await getDefinitionFor({ word: 'badword' });
    expect(res.code).toBe('api-fail');
    expect(res.payload).toEqual(mockError);
  });

  /* #4 */
  test('returns api-fail when fetch throws', async () => {
    (global as any).fetch = jest.fn().mockRejectedValue(new Error('network'));

    const res = await getDefinitionFor({ word: 'hello' });
    expect(res.code).toBe('api-fail');
    expect(res.payload).toBeUndefined();
  });

  /* #5 */
  test('targets the dictionary api root url', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getDefinitionFor({ word: 'hello world' });
    expect((global as any).fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.dictionaryapi.dev'),
    );
  });
});
