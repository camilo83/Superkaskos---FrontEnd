import { Helmet } from '../../model/helmet';
import { MemoryRouter as Router } from 'react-router-dom';
import { Card } from './list_card';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { User } from '../../model/user';
import userEvent from '@testing-library/user-event';
import { useUsers } from '../../hooks/useUsers';
import { useHelmets } from '../../hooks/useHelmets';
import { useShopCars } from '../../hooks/useShopcars';
import { ShopCar } from '../../model/shop_car';

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    loggedUser: { name: 'Camilo', role: 'User' },
    token: 'token',
  }),
}));

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    handleCurrentHelmet: jest.fn(),
  }),
}));

jest.mock('../../hooks/useShopcars', () => ({
  useShopCars: jest.fn().mockReturnValue({
    updateShopCar: jest.fn().mockResolvedValue({} as ShopCar),
    currentShopCar: {} as ShopCar,
  }),
}));

describe('Given card component when it is rendered', () => {
  const mockHelmet = {
    reference: 'MockReference',
    price: 50,
    images: { url: 'mockImageUrl' },
  } as Helmet;

  test('renders the card for a User', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Card helmet={mockHelmet}></Card>
        </Router>
      </Provider>
    );

    const addToCartTextElement = screen.getByText('Añadir al carrito');
    expect(addToCartTextElement).toBeInTheDocument();

    const images = screen.getAllByRole('button');
    await userEvent.click(images[0]);
    expect(useHelmets().handleCurrentHelmet).toHaveBeenCalled();
  });

  describe('', () => {
    beforeEach(() => {
      useUsers().loggedUser = { name: 'Admin', role: 'Admin' } as User;
      render(
        <Provider store={store}>
          <Router>
            <Card helmet={mockHelmet}></Card>
          </Router>
        </Provider>
      );
    });
    test('renders the card for an Admin', async () => {
      const images = screen.getAllByRole('button');
      await userEvent.click(images[1]);
      expect(useHelmets().handleCurrentHelmet).toHaveBeenCalled();
    });
    test('renders the card for an Admin', async () => {
      const images = screen.getAllByRole('button');
      await userEvent.click(images[2]);
      expect(useHelmets().handleCurrentHelmet).toHaveBeenCalled();
    });
    test('renders the card for an Admin', async () => {
      const images = screen.getAllByRole('button');
      await userEvent.click(images[3]);
      expect(useHelmets().handleCurrentHelmet).toHaveBeenCalled();
    });
  });

  describe('', () => {
    beforeEach(() => {
      useUsers().loggedUser = { name: 'User', role: 'User', id: '1' } as User;
      useUsers().token = 'Token';
      render(
        <Provider store={store}>
          <Router>
            <Card helmet={mockHelmet}></Card>
          </Router>
        </Provider>
      );
    });
    test('renders the card for an User', async () => {
      const images = screen.getAllByRole('button');
      await userEvent.click(images[1]);
      expect(useShopCars().updateShopCar).toHaveBeenCalled();
    });
  });

  describe('', () => {
    beforeEach(() => {
      useUsers().loggedUser = { name: 'User', role: 'User' } as User;
      useUsers().token = 'Token';
      render(
        <Provider store={store}>
          <Router>
            <Card helmet={mockHelmet}></Card>
          </Router>
        </Provider>
      );
    });
    test('renders the card for an User', async () => {
      const images = screen.getAllByRole('button');
      const x = await userEvent.click(images[1]);
      expect(x).toBe(undefined);
    });
  });
});
