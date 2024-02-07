import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Helmet } from '../../model/helmet';
import {
  loadHelmetThunk,
  createHelmetThunk,
  updateHelmetThunk,
  deletHelmetThunk,
  updateHelmetFavoriteThunk,
  loadFavoriteHelmetThunk,
} from './helmetsThunks';
import { PriceRange } from '../../types/range';

export type HelmetsState = {
  helmets: Helmet[];
  helmetsStateOption: 'idle' | 'loading' | 'error';
  currentHelmet: Helmet | null;
  range: PriceRange;
  favorites: Helmet[];
};

const initialState: HelmetsState = {
  helmets: [],
  helmetsStateOption: 'idle',
  currentHelmet: null,
  range: {
    minValue: 50,
    maxValue: 1000000,
  },
  favorites: [],
};
const HelmetsSlice = createSlice({
  name: 'helmets',
  initialState,
  reducers: {
    setCurrentHelmet: (
      state: HelmetsState,
      { payload }: PayloadAction<Helmet | null>
    ) => {
      state.currentHelmet = payload;
      return state;
    },
    setRange: (state: HelmetsState, { payload }: PayloadAction<PriceRange>) => {
      state.range = payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadHelmetThunk.pending, (state: HelmetsState) => {
      state.helmetsStateOption = 'loading';
      return state;
    }),
      builder.addCase(loadHelmetThunk.fulfilled, (state, { payload }) => {
        state.helmets = payload;
        state.helmetsStateOption = 'idle';
        return state;
      }),
      builder.addCase(loadHelmetThunk.rejected, (state: HelmetsState) => {
        state.helmetsStateOption = 'error';
        return state;
      });

    builder.addCase(loadFavoriteHelmetThunk.pending, (state: HelmetsState) => {
      state.helmetsStateOption = 'loading';
      return state;
    }),
      builder.addCase(
        loadFavoriteHelmetThunk.fulfilled,
        (state, { payload }) => {
          state.favorites = payload;
          state.helmetsStateOption = 'idle';
          return state;
        }
      ),
      builder.addCase(
        loadFavoriteHelmetThunk.rejected,
        (state: HelmetsState) => {
          state.helmetsStateOption = 'error';
          return state;
        }
      );
    builder.addCase(
      createHelmetThunk.fulfilled,
      (state: HelmetsState, { payload }: PayloadAction<Helmet>) => {
        state.helmets.push(payload);
        return state;
      }
    ),
      builder.addCase(
        updateHelmetThunk.fulfilled,
        (state: HelmetsState, { payload }: PayloadAction<Helmet>) => {
          state.helmets[
            state.helmets.findIndex((item) => item.id === payload.id)
          ] = payload;
          return state;
        }
      ),
      builder.addCase(
        updateHelmetFavoriteThunk.fulfilled,
        (state: HelmetsState, { payload }: PayloadAction<Helmet>) => {
          state.helmets[
            state.helmets.findIndex((item) => item.id === payload.id)
          ] = payload;
          return state;
        }
      ),
      builder.addCase(
        deletHelmetThunk.fulfilled,
        (state: HelmetsState, { payload }: PayloadAction<Helmet['id']>) => {
          state.helmets.splice(
            state.helmets.findIndex((item) => item.id === payload),
            1
          );
          return state;
        }
      );
  },
});

export default HelmetsSlice.reducer;

export const { setCurrentHelmet, setRange } = HelmetsSlice.actions;
