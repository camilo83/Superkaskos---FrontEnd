import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { List } from './list';
import { PriceRange } from '../../types/range';
import { Helmet } from '../../model/helmet';
import userEvent from '@testing-library/user-event';
import { useUsers } from '../../hooks/useUsers';

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    makeLogOut: jest.fn(),
    token: 'token',
  }),
}));

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    loadInitialHelmets: jest.fn(),
    classifyHelmets: jest.fn().mockResolvedValue([
      {
        category: 'SomeCategory',
        helmets: [{ id: '1' } as Helmet],
      },
    ]),
    loadNewHelmet: jest.fn(),
    helmets: [
      {
        id: '1',
        reference: 'Monaga',
        images: { url: '' },
        isFavorite: true,
        price: 50,
      },
    ] as Helmet[],
    range: { minValue: 0, maxValue: 100 } as PriceRange,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({
    id: '1',
  }),
}));

describe('Given list component', () => {
  describe('When we instantiate it', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <List />
          </Router>
        </Provider>
      );
    });

    test('should trigger handleScroll and getMoreCategories', async () => {
      const listContainer = screen.getByTestId('list-container');
      expect(listContainer).toBeInTheDocument();

      const categoryList = screen.queryByTestId('category-list');
      expect(categoryList).toBe(null);
    });

    test('', async () => {
      const button = screen.getByRole('button');
      await userEvent.click(button);
      expect(useUsers().makeLogOut).toHaveBeenCalled();
    });
  });
});
