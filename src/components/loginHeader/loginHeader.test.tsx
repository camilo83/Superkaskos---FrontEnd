import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { LoginHeader } from './loginHeader';
import '@testing-library/jest-dom';

describe('Login Header Component', () => {
  test('renders Login header with "Iniciar sesión" link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginHeader />
        </MemoryRouter>
      </Provider>
    );

    const loginLink = screen.getByText('Iniciar sesión');
    expect(loginLink).toBeInTheDocument();

    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(2);

    expect(linkElements[0]).toHaveAttribute('href', '/user-login');

    expect(linkElements[1]).toHaveAttribute('href', '/user-register');
  });
});
