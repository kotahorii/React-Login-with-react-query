import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import vehicleReducer from "../features/vehicleSlice";

export const store = configureStore({
  reducer: {
    
    vehicle: vehicleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
