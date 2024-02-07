import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useHelmets } from '../../hooks/useHelmets';
import { ShopCarCard } from './shopCar_card';
import { ShopCar } from '../../model/shop_car';

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    loadHelmetById: jest.fn(),
  }),
}));

describe('Given ShopCarCard component', () => {
  describe('When we instantiate it', () => {
    beforeEach(() => {
      const mockShopCar: ShopCar = {
        id: '1',
        userID: '2',
        status: 'Pending',
        items: [{ helmetId: '3', quantity: 1 }],
      };

      render(
        <Provider store={store}>
          <Router>
            <ShopCarCard shopcar={mockShopCar} />
          </Router>
        </Provider>
      );
    });

    test('should call loadHelmetById for each item in shopcar', async () => {
      const loadHelmetByIdMock = useHelmets().loadHelmetById as jest.Mock;
      expect(loadHelmetByIdMock).toHaveBeenCalledTimes(1);
    });
  });
});
