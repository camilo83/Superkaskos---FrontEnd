import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Menu } from './menu';

describe('Menu Component', () => {
  describe('', () => {
    const mockOptions = [{ label: 'a', path: 'b' }];
    beforeEach(() => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Menu options={mockOptions}>
              <div>Test Children</div>
            </Menu>
          </MemoryRouter>
        </Provider>
      );
    });
    test('renders menu with mock children', () => {
      const linkElement = screen.getByRole('link');
      const menuIcon = screen.getByAltText('icono de menu plegable');

      expect(linkElement).toBeInTheDocument();
      expect(menuIcon).toBeInTheDocument();
    });

    test('renders burgerMenu and toggles menu on click', async () => {
      const menuIcon = screen.getByAltText('icono de menu plegable');
      await userEvent.click(menuIcon);

      const menuList = screen.getByRole('list');
      expect(menuList).toBeInTheDocument();
    });
  });
});
