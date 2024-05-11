import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@app';

interface AuthState {
  access: string | null;
  refresh: string | null;
}

const initialState: AuthState = {
  access: null,
  refresh: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      { payload: { access, refresh } }: PayloadAction<Partial<AuthState>>,
    ) => {
      if (access) state.access = access;
      if (refresh) state.refresh = refresh;
    },

    loggedOut: (state) => {
      state.access = null;
      state.refresh = null;
    },
  },
});

export const selectAccessToken = (state: RootState) => state.auth?.access;
export const selectTokens = (state: RootState) => state.auth;
export const { setTokens, loggedOut } = authSlice.actions;
