import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../store/store';
import { Circle } from './page_indicator';

describe('Given Page Indicator Component', () => {
  describe('When we instantiate it', () => {
    beforeEach(() => {
      render(
        <Router>
          <Provider store={store}>
            <Circle filled={true}></Circle>
          </Provider>
        </Router>
      );
    });

    test('then render App with filled Circle', async () => {
      const circleElement = screen.getByTestId('circle');
      expect(circleElement).toHaveClass('filled');
    });
  });
});
