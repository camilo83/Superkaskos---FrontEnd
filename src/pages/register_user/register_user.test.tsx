import { fireEvent, render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useUsers } from '../../hooks/useUsers';
import RegisterForm from './register_user';

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    register: jest.fn(),
  }),
}));

describe('Register Component', () => {
  render(
    <Router>
      <Provider store={store}>
        <RegisterForm></RegisterForm>
      </Provider>
    </Router>
  );
  test('Then it submits form with correct values', async () => {
    const form = screen.getByRole('form');
    const input = screen.getAllByRole('textbox');
    await userEvent.type(input[0], 'test');
    await userEvent.type(input[1], 'testing');
    await userEvent.type(input[2], 'test@example.com');
    await userEvent.click(screen.getByRole('button'));
    await fireEvent.submit(form);
    expect(useUsers().register).toHaveBeenCalled();
  });
});
