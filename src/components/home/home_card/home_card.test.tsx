import { Helmet } from '../../../model/helmet';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

import userEvent from '@testing-library/user-event';
import { useHelmets } from '../../../hooks/useHelmets';
import { HomeCard } from './home_card';

jest.mock('../../../hooks/useUsers', () => ({
  useUsers: jest.fn().mockReturnValue({
    token: 'token2',
  }),
}));

jest.mock('../../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    handleCurrentHelmet: jest.fn(),
  }),
}));

describe('Given card component when it is rendered', () => {
  const mockHelmet2 = {
    reference: 'MockReference2',
    price: 60,
    images: { url: 'mockImageUrl2' },
  } as Helmet;

  test('renders the card for a User', async () => {
    render(
      <Provider store={store}>
        <Router>
          <HomeCard helmet={mockHelmet2}></HomeCard>
        </Router>
      </Provider>
    );

    const images2 = screen.getAllByRole('button');
    await userEvent.click(images2[0]);
    expect(useHelmets().handleCurrentHelmet).toHaveBeenCalled();
  });
});
