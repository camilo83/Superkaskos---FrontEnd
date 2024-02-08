import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../store/store';
import ShopCarPage from './shop_car';

describe('ShopCarPage Component', () => {
  test('renders ShopCarList component', () => {
    render(
      <Provider store={store}>
        <Router>
          <ShopCarPage></ShopCarPage>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId('shopcarlist')).toBeInTheDocument();
  });
});
