import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { HomeImages } from './home_images';
import { act } from 'react-dom/test-utils';

describe('Given home component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <Router>
          <HomeImages></HomeImages>
        </Router>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('Then it should render the list', () => {
    const element = screen.getByAltText('superkaskos images');
    expect(element).toBeInTheDocument();
  });

  test('Then it should toggle images with the interval', () => {
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const element = screen.getByAltText('superkaskos images');
    const currentSrc = element.getAttribute('src');
    expect(currentSrc).toContain('./migente.png');
  });
});
