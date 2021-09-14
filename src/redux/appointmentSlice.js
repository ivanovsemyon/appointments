import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createAppointment,
  deleteAppointment,
  editAppointment,
  getAllAppointments,
} from "../services/appointmentsService";

export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async () => getAllAppointments()
);
export const addAppointment = createAsyncThunk(
  "appointments/addAppointment",
  async ({ name, doctor, date, complaint }) =>
    createAppointment(name, doctor, date, complaint)
);
export const removeAppointment = createAsyncThunk(
  "appointments/removeAppointment",
  (id) => deleteAppointment(id)
);
export const changeAppointment = createAsyncThunk(
  "appointments/changeAppointment",
  ({ id, name, doctor, date, complaint }) =>
    editAppointment(id, name, doctor, date, complaint)
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointmentsState: [],
  },
  extraReducers: {
    [getAppointments.fulfilled]: (state, action) => {
      state.appointmentsState = action.payload;
    },
    [addAppointment.fulfilled]: (state, action) => {
      state.appointmentsState = action.payload;
    },
    [removeAppointment.fulfilled]: (state, action) => {
      state.appointmentsState = action.payload;
    },
    [changeAppointment.fulfilled]: (state, action) => {
      state.appointmentsState = action.payload;
    },
  },
});

export const { isAppointmentEditing, isAppointmentDeleting } =
  appointmentSlice.actions;

export const selectAppointments = (state) =>
  state.appointments.appointmentsState;

export default appointmentSlice.reducer;
