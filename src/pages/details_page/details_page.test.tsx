import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import DetailsPage from './details_page';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { useHelmets } from '../../hooks/useHelmets';
import { useUsers } from '../../hooks/useUsers';

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    loggedUser: { name: 'Camilo', role: 'Admin' },
    token: 'token',
  }),
}));

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    deleteHelmet: jest.fn(),
    updateFavoriteHelmet: jest.fn(),
    helmets: [
      { id: '1', reference: 'Monaga', images: { url: '' }, isFavorite: true },
    ],
    currentHelmet: {
      id: '1',
      reference: 'Monaga',
      images: { url: '' },
      isFavorite: true,
    },
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    id: '1',
  }),
}));

describe('Given DetailsPage component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(
        <Router>
          <Provider store={store}>
            <DetailsPage></DetailsPage>
          </Provider>
        </Router>
      );
    });
    test('then render App with DetailsPage', () => {
      const img = screen.getAllByRole('img');
      expect(img[0]).toBeInTheDocument();
      expect(img[1]).toBeInTheDocument();
    });
    test('', async () => {
      window.confirm = jest.fn().mockReturnValue(true);
      const img = screen.getAllByRole('button');
      await userEvent.click(img[0]);
      expect(useHelmets().deleteHelmet).toHaveBeenCalled();
    });
    test('', async () => {
      const img = screen.getAllByRole('button');
      await userEvent.click(img[1]);
      expect(useHelmets().updateFavoriteHelmet).toHaveBeenCalled();
    });
  });
  describe('When we instantiate', () => {
    beforeEach(() => {
      useUsers().loggedUser = null;
      render(
        <Router>
          <Provider store={store}>
            <DetailsPage></DetailsPage>
          </Provider>
        </Router>
      );
    });
    test('', () => {
      const par = screen.getByText('Añadir al carrito');
      expect(par).toBeInTheDocument();
    });
  });
});
