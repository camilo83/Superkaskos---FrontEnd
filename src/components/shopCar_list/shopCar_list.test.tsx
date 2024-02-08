import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../model/user';
import { ShopCarList } from './shopCar_list';
import { ShopCar } from '../../model/shop_car';

jest.mock('../shopCar_card/shopCar_card', () => ({
  ShopCarCard: jest.fn(),
}));

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    loggedUser: { id: '1' } as User,
  }),
}));

jest.mock('../../hooks/useShopcars', () => ({
  useShopCars: jest.fn().mockReturnValue({
    shopCars: [{ userID: '1' } as ShopCar],
    loadShopCars: jest.fn(),
    loadShopCarsByUserId: jest.fn(),
  }),
}));

describe('Given list component', () => {
  describe('When we instantiate it as an Admin', () => {
    beforeEach(() => {
      useUsers().loggedUser = { name: 'camilo', role: 'Admin' } as User;
      render(
        <Provider store={store}>
          <Router>
            <ShopCarList />
          </Router>
        </Provider>
      );
    });

    test('should render ShopCarCard without entering its content', async () => {
      expect(
        require('../shopCar_card/shopCar_card').ShopCarCard
      ).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it as an Admin', () => {
    beforeEach(() => {
      useUsers().loggedUser = { name: 'camilo', role: 'User', id: '1' } as User;
      render(
        <Provider store={store}>
          <Router>
            <ShopCarList />
          </Router>
        </Provider>
      );
    });

    test('should render ShopCarCard without entering its content', async () => {
      expect(
        require('../shopCar_card/shopCar_card').ShopCarCard
      ).toHaveBeenCalled();
    });
  });
});
