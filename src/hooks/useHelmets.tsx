import { useCallback, useMemo } from 'react';
import { RepoHelmets } from '../services/helmets/repoHelmets';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadHelmetThunk,
  updateHelmetThunk,
  createHelmetThunk,
  deletHelmetThunk,
  updateHelmetFavoriteThunk,
  loadFavoriteHelmetThunk,
} from '../slices/helmets/helmetsThunks';
import { AppDispatch, RootState } from '../store/store';
import { Helmet } from '../model/helmet';
import { Category, helmetCategory } from '../types/helmetCategory';
import { setCurrentHelmet, setRange } from '../slices/helmets/helmetsSlice';
import { PriceRange } from '../types/range';

export function useHelmets() {
  const dispatch = useDispatch<AppDispatch>();
  const { helmets, helmetsStateOption, currentHelmet, range, favorites } =
    useSelector((state: RootState) => state.helmetsState);
  const { token } = useSelector((state: RootState) => state.usersState);
  const repo = useMemo(() => new RepoHelmets(token), []);

  const loadHelmets = useCallback(async () => {
    try {
      dispatch(loadHelmetThunk(repo));
    } catch (error) {}
  }, [repo]);

  const loadFavoriteHelmets = useCallback(async () => {
    try {
      dispatch(loadFavoriteHelmetThunk(repo));
    } catch (error) {}
  }, [repo]);

  const loadInitialHelmets = useCallback(async () => {
    try {
      dispatch(loadHelmetThunk(repo));
    } catch (error) {}
  }, [repo]);

  const loadNewHelmet = useCallback(
    async (loadedCategories: string[]) => {
      try {
        const result = await repo.getMoreHelmets(loadedCategories);

        return result;
      } catch (error) {}
    },
    [repo]
  );

  const loadHelmetById = async (id: Helmet['id']) => {
    try {
      const result = await repo.getHelmetById(id);
      return result;
    } catch (error) {}
  };

  const createHelmet = async (newHelmet: FormData) => {
    try {
      dispatch(
        createHelmetThunk({
          repo,
          newHelmet,
        })
      );
    } catch (error) {}
  };

  const updateHelmet = async (id: Helmet['id'], helmet: FormData) => {
    try {
      dispatch(
        updateHelmetThunk({
          id,
          repo,
          updatedHelmet: helmet,
        })
      );
    } catch (error) {}
  };

  const updateFavoriteHelmet = async (
    id: Helmet['id'],
    isFavorite: boolean
  ) => {
    try {
      isFavorite = !isFavorite;

      dispatch(
        updateHelmetFavoriteThunk({
          id,
          repo,
          isFavorite,
        })
      );
    } catch (error) {}
  };

  const deleteHelmet = async (id: Helmet['id']) => {
    try {
      dispatch(
        deletHelmetThunk({
          id,
          repo,
        })
      );
    } catch (error) {}
  };

  const classifyHelmets = async (
    helmetsList: Helmet[]
  ): Promise<helmetCategory[]> => {
    const helmetsDictionary: { [key in Category]: Helmet[] } = {
      SK2: [],
      SK3: [],
      SK4: [],
      SK5: [],
      SK6: [],
      SK7: [],
      SK8: [],
      SK9: [],
      SK10: [],
    };

    helmetsList.forEach((helmet) => {
      const category: Category = helmet.category as Category;
      if (!helmetsDictionary[category]) {
        helmetsDictionary[category] = [];
      }

      helmetsDictionary[category].push(helmet);
    });

    const result: helmetCategory[] = Object.entries(helmetsDictionary).map(
      ([category, helmets]) => ({
        category: category as Category,
        helmets,
      })
    );

    return result;
  };

  const handleCurrentHelmet = async (helmet: Helmet) => {
    dispatch(setCurrentHelmet(helmet));
  };

  const rangeChange = (range: PriceRange) => {
    dispatch(setRange(range));
  };

  return {
    loadHelmets,
    updateHelmet,
    createHelmet,
    deleteHelmet,
    helmets,
    helmetsStateOption,
    classifyHelmets,
    loadInitialHelmets,
    loadNewHelmet,
    handleCurrentHelmet,
    rangeChange,
    currentHelmet,
    range,
    updateFavoriteHelmet,
    loadFavoriteHelmets,
    favorites,
    loadHelmetById,
  };
}
