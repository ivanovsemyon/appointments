import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createAppointment,
  deleteAppointment,
  editAppointment,
  getAllAppointments,
} from "../services/appointmentsService";
import { orderBy } from "lodash";

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
    sortField: "",
    orderBySort: "asc",
  },
  reducers: {
    appointmentsSort(state, action) {
      if (action.payload.value === "none") {
        state.sortField = "";
        state.orderBySort = "asc";
      }
      if (action.payload.value !== "none" && action.payload.value !== "") {
        state.sortField = action.payload.value;
      }
      if (action.payload.order) {
        state.orderBySort = action.payload.order;
      }
      state.appointmentsState = orderBy(
        state.appointmentsState,
        action.payload.value || state.sortField,
        state.orderBySort
      );
    },
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

export const { appointmentsSort } = appointmentSlice.actions;

export const selectAppointments = (state) =>
  state.appointments.appointmentsState;

export const selectSortField = (state) => state.appointments.sortField;

export default appointmentSlice.reducer;
