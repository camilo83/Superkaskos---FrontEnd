import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import { useShopCars } from './useShopcars';
import { ShopCar } from '../model/shop_car';
import { RepoShopCars } from '../services/shopcar/repoShopCar';

jest.mock('../services/shopcar/repoShopCar', () => ({
  RepoShopCars: jest.fn().mockReturnValue({
    getShopcar: jest.fn(),
  }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockId = '1';
const mockUserId = '1';
const mockShopcar = {} as ShopCar;

describe('Given useUsers Hook', () => {
  const TestComponent = () => {
    const {
      handleCurrentShopcar,
      loadShopCars,
      loadShopCarsByUserId,
      loadShopcarById,
      updateShopCar,
    } = useShopCars();

    return (
      <>
        <button onClick={() => loadShopCars()}></button>
        <button onClick={() => loadShopCarsByUserId(mockUserId)}></button>
        <button onClick={() => updateShopCar(mockId, mockShopcar)}> </button>
        <button onClick={() => loadShopcarById(mockId)}></button>
        <button onClick={() => handleCurrentShopcar(mockShopcar)}></button>
      </>
    );
  };

  let elementsShopCar: HTMLElement[];

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TestComponent></TestComponent>;
        </MemoryRouter>
      </Provider>
    );
    elementsShopCar = screen.getAllByRole('button');
  });

  describe('When we click button loadShopCars', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elementsShopCar[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button loadShopCarsByUserId', () => {
    test('Then the dispacht should have been called.', async () => {
      await userEvent.click(elementsShopCar[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button updateShopCar', () => {
    test('Then the dispacht should have been called..', async () => {
      await userEvent.click(elementsShopCar[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button loadShopcarById', () => {
    test('Then the dispacht should have been called...', async () => {
      const mockToken = '1';
      const mockrepo = new RepoShopCars(mockToken);
      await userEvent.click(elementsShopCar[3]);
      expect(mockrepo.getShopcar).toHaveBeenCalled();
    });
  });

  describe('When we click button handleCurrentShopcar ', () => {
    test('Then the dispacht should have been called....', async () => {
      await userEvent.click(elementsShopCar[4]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
