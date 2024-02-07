import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';
import { useHelmets } from './useHelmets';
import { Helmet } from '../model/helmet';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import { PriceRange } from '../types/range';

/* import { RepoHelmets } from '../services/helmets/repoHelmets';
import { helmetCategory } from '../types/helmetCategory'; */

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockNewHelmet = {} as FormData;
const mockIdToDelete = '1';
const mockHelmetList = [{} as Helmet];
const mockLoadedCategories = ['1'];
/* const mockHelmetCategory = { category: 'SK2' } as helmetCategory; */
const mockId = '1';
const mockIsFavorite = true;
const mockRange = {} as PriceRange;
const mockHelmet = {} as Helmet;

describe('Given useUsers Hook', () => {
  const TestComponent = () => {
    const {
      loadHelmets,
      createHelmet,
      deleteHelmet,
      classifyHelmets,
      loadFavoriteHelmets,
      loadInitialHelmets,
      loadNewHelmet,
      updateHelmet,
      updateFavoriteHelmet,
      handleCurrentHelmet,
      rangeChange,
    } = useHelmets();

    return (
      <>
        <button onClick={() => loadHelmets()}></button>
        <button onClick={() => loadFavoriteHelmets()}></button>
        <button onClick={() => loadInitialHelmets()}></button>
        <button onClick={() => loadNewHelmet(mockLoadedCategories)}></button>
        <button onClick={() => createHelmet(mockNewHelmet)}> </button>
        <button onClick={() => updateHelmet(mockId, mockNewHelmet)}> </button>
        <button onClick={() => deleteHelmet(mockIdToDelete)}> </button>
        <button onClick={() => classifyHelmets(mockHelmetList)}> </button>
        <button
          onClick={() => updateFavoriteHelmet(mockId, mockIsFavorite)}
        ></button>
        <button onClick={() => handleCurrentHelmet(mockHelmet)}></button>
        <button onClick={() => rangeChange(mockRange)}></button>
      </>
    );
  };

  let elements: HTMLElement[];

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TestComponent></TestComponent>;
        </MemoryRouter>
      </Provider>
    );
    elements = screen.getAllByRole('button');
  });

  describe('When we click button loadHelmets', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button loadFavoriteHelmets', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button loadInitialHelmets', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  /* describe('When we click button loadNewHelmet', () => {
    test.only('Then the dispacht should have been called', async () => {
      let mockRepo = new RepoHelmets('test');
      mockRepo = {
        getMoreHelmets: jest.fn().mockResolvedValue(mockHelmet),
      } as unknown as RepoHelmets;

      await userEvent.click(elements[3]);

      expect(mockRepo.getMoreHelmets).toHaveBeenCalled();
    });
  }); */

  describe('When we click button createHelmet', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[4]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button updateHelmet', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[5]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button updateFavoriteHelmet', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[8]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button deleteHelmet', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[6]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button classifyHelmets ', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[7]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button handleCurrentHelmet ', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[9]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button rangeChange ', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[10]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
