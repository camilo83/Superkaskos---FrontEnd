import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HomeList } from './home_list';
import { store } from '../../../store/store';

jest.mock('../../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    favorites: [
      { id: '1', reference: 'Monaga', images: { url: '' }, isFavorite: true },
    ],
  }),
}));

describe('Given list component', () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <Router>
          <HomeList />
        </Router>
      </Provider>
    );
  });
  test('it renders a list', () => {
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
