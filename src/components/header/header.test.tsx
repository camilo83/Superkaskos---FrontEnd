import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Header } from './header';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Given Header Component', () => {
  describe('when renders header with mock children', () => {
    test('h1 should appear', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Header>
              <div>Test Children</div>
            </Header>
          </MemoryRouter>
        </Provider>
      );

      const headerElement = screen.getByRole('heading', {
        name: /SUPERKASKOS/i,
      });
      expect(headerElement).toBeInTheDocument();
    });

    test('handleHomePage should be called', async () => {
      const mockNavigate = jest.fn();
      require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

      render(
        <Provider store={store}>
          <MemoryRouter>
            <Header>
              <div>Test Children</div>
            </Header>
          </MemoryRouter>
        </Provider>
      );

      const button = screen.getByRole('button');

      await userEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith('home');
    });
  });
});
