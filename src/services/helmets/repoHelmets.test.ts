import 'jest-fetch-mock';
import { Helmet } from '../../model/helmet';
import { RepoHelmets } from './repoHelmets';

describe('Given repo class', () => {
  let jsonMock: jest.Mock;
  const mockedToken = '1';
  describe('When we instantiate getHelmets with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getUsers should be used', async () => {
      const expected: Helmet[] = [];
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.getHelmets();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getHelmets and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getCountry should throw an error', async () => {
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.getHelmets()).rejects.toThrow();
    });
  });

  describe('When we instantiate getHelmetById with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getUsers should be used', async () => {
      const expected: Helmet[] = [];
      const repo = new RepoHelmets(mockedToken);
      const mockId = '1';
      const result = await repo.getHelmetById(mockId);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getHelmetById and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getCountry should throw an error', async () => {
      const repo = new RepoHelmets(mockedToken);
      const mockId = '1';
      await expect(repo.getHelmetById(mockId)).rejects.toThrow();
    });
  });

  describe('When we instantiate createHelmet with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as Helmet);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method createHelmet should be used', async () => {
      const newUser = {
        name: 'Hello',
      } as unknown as FormData;
      const expected: Helmet = {} as Helmet;
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.createHelmet(newUser);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate createHelmet and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method createUser should throw an error', async () => {
      const newUser = {
        name: 'Hello',
      } as unknown as FormData;
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.createHelmet(newUser)).rejects.toThrow();
    });
  });

  describe('When we instantiate updateHelmet with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as Helmet);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method updateHelmet should be used', async () => {
      const userId = '1';
      const updateduser = {
        name: 'Hello',
      } as unknown as FormData;
      const expected: Helmet = {} as Helmet;
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.updateHelmet(userId, updateduser);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate updateHelmet and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method createUser should throw an error', async () => {
      const userId = '1';
      const updateduser = {
        name: 'Hello',
      } as unknown as FormData;
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.updateHelmet(userId, updateduser)).rejects.toThrow();
    });
  });

  describe('When we instantiate updateHelmetFavorite with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as Helmet);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method updateHelmetFavorite should be used', async () => {
      const userId = '1';
      const isFavorite = true;
      const expected: Helmet = {} as Helmet;
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.updateHelmetFavorite(userId, isFavorite);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate updateHelmetFavorite and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method updateHelmetFavorite should throw an error', async () => {
      const userId = '1';
      const isFavorite = true;

      const repo = new RepoHelmets(mockedToken);
      await expect(
        repo.updateHelmetFavorite(userId, isFavorite)
      ).rejects.toThrow();
    });
  });

  describe('When we instantiate deleteHelmet with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue(null);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method deleteHelmet should be used', async () => {
      const userId = '1';

      const repo = new RepoHelmets(mockedToken);
      const result = await repo.deleteHelmet(userId);

      expect(result).toBe(undefined);
    });
  });
  describe('When we instantiate deleteHelmet and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method deleteHelmet should throw an error', async () => {
      const userId = '1';

      const repo = new RepoHelmets(mockedToken);
      await expect(repo.deleteHelmet(userId)).rejects.toThrow();
    });
  });

  describe('When we instantiate getInitialHelmets with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getInitialHelmets should be used', async () => {
      const expected = undefined;
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.getInitialHelmets();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getInitialHelmets and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });
    });
    test('Then method getInitialHelmets should throw an error', async () => {
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.getInitialHelmets()).rejects.toThrow(Error);
    });
  });
  describe('When we instantiate getMoreHelmets with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getMoreHelmets should be used', async () => {
      const loadedCategories = ['1'];
      const expected: Helmet[] = [];
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.getMoreHelmets(loadedCategories);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getMoreHelmets and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getMoreHelmets should throw an error', async () => {
      const loadedCategories = ['1'];
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.getMoreHelmets(loadedCategories)).rejects.toThrow();
    });
  });

  describe('When we instantiate getFavoriteHelmets with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getFavoriteHelmets should be used', async () => {
      const expected: Helmet[] = [];
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.getFavoriteHelmets();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getFavoriteHelmets and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getFavoriteHelmets should throw an error', async () => {
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.getFavoriteHelmets()).rejects.toThrow();
    });
  });
});
