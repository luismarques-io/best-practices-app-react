import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserForRegistration } from '../../types_OLD/user';

export interface RegisterState {
  user: UserForRegistration;
  signingUp: boolean;
}

const initialState: RegisterState = {
  user: {
    email: 'euluismarques@gmail.com',
    password: '123',
    passwordConfirmation: '123',
    firstName: 'Luís',
    lastName: 'Marques',
    terms: true,
  },
  signingUp: false,
};

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    initializeRegister: () => initialState,
    updateField: (
      state,
      { payload: { name, value } }: PayloadAction<{ name: keyof RegisterState['user']; value: string | boolean }>
    ) => {
      if (name === 'terms') {
        state.user[name] = value as boolean;
        return;
      }
      state.user[name] = value as string;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.signingUp = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.signingUp = false;
      signIn(state.user);
    });
    builder.addCase(signUp.rejected, (state) => {
      state.signingUp = false;
    });
  },
});

export const signUp = createAsyncThunk('register/signUp', async (user: UserForRegistration, { rejectWithValue }) => {
  const response = await fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(data);
  }

  return data;
});

export const signIn = async (user: UserForRegistration) => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(user),
    body: JSON.stringify({ username: 'kminchelle', password: '0lelplR' }),
  });
  const data = await response.json();
  if (response.status < 200 || response.status >= 300) {
    // eslint-disable-next-line no-console
    console.log('Error', { user, data });
  }

  // eslint-disable-next-line no-console
  console.log(data);

  // loadUserIntoApp(data);
  return data;
};

//

export const { initializeRegister, updateField } = slice.actions;

export default slice.reducer;
