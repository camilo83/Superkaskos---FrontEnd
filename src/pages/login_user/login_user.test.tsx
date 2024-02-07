import { fireEvent, render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import LoginForm from './login_user';
import { store } from '../../store/store';
import { useUsers } from '../../hooks/useUsers';

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    login: jest.fn(),
  }),
}));

describe('Login Component', () => {
  render(
    <Router>
      <Provider store={store}>
        <LoginForm></LoginForm>
      </Provider>
    </Router>
  );
  test('Then it submits form with correct values', async () => {
    const form = screen.getByRole('form');
    const input = screen.getAllByRole('textbox');
    await userEvent.type(input[0], 'test');
    await userEvent.click(screen.getByRole('button'));
    await fireEvent.submit(form);
    expect(useUsers().login).toHaveBeenCalled();
  });
});
