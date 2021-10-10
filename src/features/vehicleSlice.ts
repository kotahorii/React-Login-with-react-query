import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app/store";

const initialState = {
  editedSegment: {
    id: 0,
    segment_name: "",
  },
  editedBrand: {
    id: 0,
    brand_name: "",
  },
  editedVehicle: {
    id: 0,
    vehicle_name: "",
    release_year: 2020,
    price: 0.0,
    segment: 0,
    brand: 0,
  },
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,

  reducers: {
    editSegment(state, action) {
      state.editedSegment = action.payload;
    },
    editBrand(state, action) {
      state.editedBrand = action.payload;
    },
    editVehicle(state, action) {
      state.editedVehicle = action.payload;
    },
    resetVehicle(state) {
      state.editedVehicle = initialState.editedVehicle;
    },
  },
});

export const { editSegment, editBrand, editVehicle, resetVehicle } =
  vehicleSlice.actions;

export const selectSegment = (state: RootState) => state.vehicle.editedSegment;
export const selectBrand = (state: RootState) => state.vehicle.editedBrand;
export const selectVehicles = (state: RootState) => state.vehicle.editedVehicle;

export default vehicleSlice.reducer;
