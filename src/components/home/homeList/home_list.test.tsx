import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
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

describe('Given list component with big scrren (desktop)', () => {
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

describe('Given list component with small screen (mobile)', () => {
  beforeEach(async () => {
    window.innerWidth = 400;
    window.dispatchEvent(new Event('resize'));

    render(
      <Provider store={store}>
        <Router>
          <HomeList />
        </Router>
      </Provider>
    );
  });

  test('it renders a list', () => {
    const lists = screen.queryAllByRole('list');
    expect(lists.length).toBeGreaterThan(0);
    expect(lists[1]).toBeInTheDocument();
  });

  test('it should render the arrows', () => {
    const arrows = screen.queryAllByTestId('page-changer');
    expect(arrows).toHaveLength(2);
  });

  test('it should handle left arrow click', () => {
    const leftArrow = screen.getByText('◄');
    expect(leftArrow).toBeInTheDocument();
    leftArrow.click();

    const updatedPage = screen.getByText('Monaga');
    expect(updatedPage).toBeInTheDocument();
  });

  test('it should handle right arrow click', () => {
    const rightArrow = screen.getByText('►');
    expect(rightArrow).toBeInTheDocument();
    rightArrow.click();

    const updatedPage = screen.getByText('Monaga');
    expect(updatedPage).toBeInTheDocument();
  });

  test('it should render circles indicating the page', () => {
    const circles = screen.queryAllByTestId('circle');
    expect(circles.length).toBeGreaterThan(0);
  });

  test('it should update page on container scroll', () => {
    const container = screen.getByTestId('scroll-container');
    fireEvent.scroll(container, { target: { scrollLeft: 100 } });
    const updatedPage = screen.getByText('Monaga');
    expect(updatedPage).toBeInTheDocument();
  });
});
