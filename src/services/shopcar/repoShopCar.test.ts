import 'jest-fetch-mock';
import { RepoShopCars } from './repoShopCar';
import { ShopCar } from '../../model/shop_car';

describe('Given repo class', () => {
  let jsonMock: jest.Mock;
  const mockedToken = '1';
  describe('When we instantiate getShopcar', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getShopcars should be used', async () => {
      const expected: ShopCar[] = [];
      const repo = new RepoShopCars(mockedToken);
      const result = await repo.getShopcars();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getShopcars and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getShopcars should throw an error', async () => {
      const repo = new RepoShopCars(mockedToken);
      await expect(repo.getShopcars()).rejects.toThrow();
    });
  });

  describe('When we instantiate getShopcar', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getShopcar should be used', async () => {
      const expected: ShopCar[] = [];
      const repo = new RepoShopCars(mockedToken);
      const mockId = '1';
      const result = await repo.getShopcar(mockId);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getShopcar and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getShopcar should throw an error', async () => {
      const mockId = '1';
      const repo = new RepoShopCars(mockedToken);
      await expect(repo.getShopcar(mockId)).rejects.toThrow();
    });
  });

  describe('When we instantiate getShopcarByUserId with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getShopcarByUserId should be used', async () => {
      const expected: ShopCar[] = [];
      const repo = new RepoShopCars(mockedToken);
      const mockId = '1';
      const result = await repo.getShopcarByUserId(mockId);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getShopcarByUserId and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getShopcarByUserId should throw an error', async () => {
      const mockId = '1';
      const repo = new RepoShopCars(mockedToken);
      await expect(repo.getShopcarByUserId(mockId)).rejects.toThrow();
    });
  });

  describe('When we instantiate updateShopCar with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method updateShopCar should be used', async () => {
      const expected: ShopCar[] = [];
      const repo = new RepoShopCars(mockedToken);
      const mockShopCar = {} as ShopCar;

      const result = await repo.updateShopCar(undefined, mockShopCar);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate updateShopCar and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method updateShopCar should throw an error', async () => {
      const mockShopcar = {} as ShopCar;
      const repo = new RepoShopCars(mockedToken);
      await expect(
        repo.updateShopCar(undefined, mockShopcar)
      ).rejects.toThrow();
    });
  });
  describe('When we instantiate updateShopCar with id', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jsonMock,
      });
    });

    test('Then method updateShopCar should be used', async () => {
      const expected: ShopCar[] = [];
      const repo = new RepoShopCars(mockedToken);
      const mockShopcar = {} as ShopCar;
      const mockId = '1';
      const result = await repo.updateShopCar(mockId, mockShopcar);
      expect(jsonMock).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate updateShopCar with id and response is bad', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: jsonMock,
      });
    });
    test('Then method updateShopCar should throw an error', async () => {
      const mockHelmet = {} as ShopCar;
      const repo = new RepoShopCars(mockedToken);
      const mockId = '1';
      await expect(repo.updateShopCar(mockId, mockHelmet)).rejects.toThrow(
        Error
      );
    });
  });

  describe('When we instantiate deleteShopCar with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method deleteShopCar should be used', async () => {
      const expected: ShopCar[] = [];
      const repo = new RepoShopCars(mockedToken);
      const mockId = '1';

      const result = await repo.deleteShopCar(mockId);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate deleteShopCar and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method deleteShopCar should throw an error', async () => {
      const repo = new RepoShopCars(mockedToken);
      const mockId = '1';
      await expect(repo.deleteShopCar(mockId)).rejects.toThrow();
    });
  });
});
