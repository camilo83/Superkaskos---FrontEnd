import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { useHelmets } from '../../hooks/useHelmets';
import { PriceRange } from '../../types/range';
import { Filter } from './filter';

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    deleteHelmet: jest.fn(),
    updateFavoriteHelmet: jest.fn(),
    rangeChange: jest.fn(),
    range: {} as PriceRange,
  }),
}));

describe('Given DetailsPage component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(
        <Router>
          <Provider store={store}>
            <Filter></Filter>
          </Provider>
        </Router>
      );
    });
    test('then render App with Filter', async () => {
      const inputs = screen.getAllByRole('spinbutton');
      expect(inputs[0]).toBeInTheDocument();
      await userEvent.type(inputs[0], '1');
      expect(useHelmets().rangeChange).toHaveBeenCalled();
    });
    test('then render App with Filter', async () => {
      const inputs = screen.getAllByRole('spinbutton');
      expect(inputs[1]).toBeInTheDocument();
      await userEvent.type(inputs[1], '2');
      expect(useHelmets().rangeChange).toHaveBeenCalled();
    });
  });
});
