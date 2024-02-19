import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ShopCarCard } from './shopCar_card';
import userEvent from '@testing-library/user-event';
import Swal from 'sweetalert2';

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: () => ({
    loadHelmetById: jest.fn().mockResolvedValue({
      id: '3',
      price: '100',
      images: { url: 'image_url' },
      reference: 'Ref123',
      category: 'Category1',
    }),
  }),
}));

jest.mock('../../hooks/useShopcars', () => ({
  useShopCars: () => ({
    currentShopCar: {
      id: '1',
      items: [{ helmetId: '3', quantity: 2 }],
    },
    updateShopCar: jest.fn(),
  }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe('ShopCarCard Component', () => {
  test('should display quantity buttons and allow interaction', async () => {
    const mockShopCar = {
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

    const lessQuantityButton = await screen.findByText('-');
    expect(lessQuantityButton).toBeInTheDocument();
    await userEvent.click(lessQuantityButton);

    const moreQuantityButton = await screen.findByText('+');
    expect(moreQuantityButton).toBeInTheDocument();
    await userEvent.click(moreQuantityButton);
  });

  test('it should delete items', async () => {
    const mockShopCar = {
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

    const deleteButton = await screen.findByAltText('Ícono de eliminar');
    expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);
    await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
  });
});
