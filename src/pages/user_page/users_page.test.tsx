import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../store/store';
import UserPage from './user_page';
import '@testing-library/jest-dom';
import { User } from '../../model/user';
import userEvent from '@testing-library/user-event';
import { useHelmets } from '../../hooks/useHelmets';
import { useUsers } from '../../hooks/useUsers';

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    loggedUser: {
      name: 'Camilo',
      role: 'Admin',
      avatar: { url: 'www' },
    } as User,
    makeLogOut: jest.fn(),
  }),
}));

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    handleCurrentHelmet: jest.fn(),
  }),
}));

describe('Given UserPage component', () => {
  describe('When instantiated', () => {
    beforeEach(() => {
      render(
        <Router>
          <Provider store={store}>
            <UserPage />
          </Provider>
        </Router>
      );
    });

    test('it renders user information', () => {
      const userInformation = screen.getByText('TU INFORMACIÓN');
      expect(userInformation).toBeInTheDocument();
    });

    test('it triggers handleCurrentHelmet when the button is clicked', async () => {
      const button = screen.getAllByRole('button');
      await userEvent.click(button[0]);

      expect(useHelmets().handleCurrentHelmet).toHaveBeenCalled();
    });
    test('it triggers handleLogOut when the button is clicked', async () => {
      const button = screen.getAllByRole('button');
      await userEvent.click(button[1]);

      expect(useUsers().makeLogOut).toHaveBeenCalled();
    });
  });
});
