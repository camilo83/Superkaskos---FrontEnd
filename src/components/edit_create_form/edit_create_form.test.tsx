import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { HelmetsForm } from './edit_create_form';
import { useHelmets } from '../../hooks/useHelmets';
import { Helmet } from '../../model/helmet';

jest.mock('../../hooks/useHelmets', () => ({
  useHelmets: jest.fn().mockReturnValue({
    createHelmet: jest.fn(),
    updateHelmet: jest.fn(),
  }),
}));

describe('HelmetsForm Component', () => {
  test('Submits form with correct values', async () => {
    render(
      <Router>
        <Provider store={store}>
          <HelmetsForm
            helmet={{
              id: '',
              reference: '',
              inventory: 0,
              price: 0,
              category: '',
              images: {
                publicId: '',
                size: 0,
                width: 0,
                height: 0,
                format: '',
                url: '',
              },
              isFavorite: false,
            }}
          ></HelmetsForm>
        </Provider>
      </Router>
    );

    const form = screen.getByRole('form');
    const input = screen.getAllByRole('textbox');

    await userEvent.type(input[0], 'test');
    await userEvent.type(input[1], 'testing');

    await fireEvent.submit(form);

    expect(useHelmets().createHelmet).toHaveBeenCalledWith(
      expect.any(FormData)
    );
  });

  test('Submits form with correct values', async () => {
    render(
      <Router>
        <Provider store={store}>
          <HelmetsForm
            helmet={
              {
                id: '1',
                reference: '',
                inventory: 0,
                price: 0,
                category: '',
                images: {
                  publicId: '',
                  size: 0,
                  width: 0,
                  height: 0,
                  format: '',
                  url: '',
                },
                orders: [],
                isFavorite: false,
              } as unknown as Helmet
            }
          ></HelmetsForm>
        </Provider>
      </Router>
    );

    const form = screen.getByRole('form');
    const input = screen.getAllByRole('textbox');
    const numbers = screen.getAllByRole('spinbutton');
    const file = screen.getByTestId('file');

    await userEvent.type(input[0], 'test');
    await userEvent.type(input[1], 'testing');
    await userEvent.type(numbers[0], '1');
    await userEvent.type(numbers[1], '1');
    expect(file).toBeInTheDocument();
    await userEvent.type(file, 'false');

    await fireEvent.submit(form);

    expect(useHelmets().updateHelmet).toHaveBeenCalled();
  });
});
