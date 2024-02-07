import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../store/store';
import HomePage from './homePage';

import { ShopCar } from '../../model/shop_car';
import { Helmet } from '../../model/helmet';

import { useHelmets } from '../../hooks/useHelmets';

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    loggedUser: { name: 'Camilo', role: 'User', orders: ['1', '2', '3'] },
  }),
}));

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    loadFavoriteHelmets: jest.fn(),
    favorites: [{ id: '1', images: { url: 'www' } } as Helmet],
  }),
}));

jest.mock('../../hooks/useShopcars', () => ({
  useShopCars: jest.fn().mockReturnValue({
    handleCurrentShopcar: jest.fn().mockResolvedValue({} as ShopCar),
    loadShopcarById: jest
      .fn()
      .mockResolvedValue([{ status: 'open' } as ShopCar]),
  }),
}));
describe('Given HomePage component', () => {
  test('renders HomePage with HomeImages', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </Router>
    );

    expect(getByText(/Ver Todos los cascos/i)).toBeInTheDocument();

    expect(useHelmets().loadFavoriteHelmets).toHaveBeenCalled();
  });
});
