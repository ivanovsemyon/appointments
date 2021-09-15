import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createAppointment,
  deleteAppointment,
  editAppointment,
  getAllAppointments,
} from "../services/appointmentsService";

import { filter, inRange, orderBy } from "lodash";

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
    initialState: [],
    sortField: "",
    orderBySort: "asc",
    isFiltered: false,
    startDate: "",
    endDate: "",
  },

  reducers: {
    appointmentsSort(state) {
      if (state.sortField && !state.isFiltered) {
        state.appointmentsState = orderBy(
          state.initialState,
          state.sortField,
          state.orderBySort
        );
      } else if (state.sortField && state.isFiltered) {
        state.appointmentsState = orderBy(
          state.appointmentsState,
          state.sortField,
          state.orderBySort
        );
      } else if (!state.sortField && state.isFiltered) {
        if (state.startDate && !state.endDate) {
          state.appointmentsState = filter(
            state.initialState,
            (o) => o.date >= state.startDate
          );
        } else if (state.endDate && !state.startDate) {
          state.appointmentsState = filter(
            state.initialState,
            (o) => o.date <= state.endDate
          );
        } else if (state.startDate && state.endDate) {
          state.appointmentsState = filter(state.initialState, (o) =>
            inRange(
              +o.date.split("-").join(""),
              +state.startDate.split("-").join(""),
              +state.endDate.split("-").join("") + 1
            )
          );
        }
      } else if (!state.sortField && !state.isFiltered) {
        state.appointmentsState = state.initialState;
      }
    },

    setSortField(state, action) {
      state.sortField = action.payload;
    },

    setOrderBySort(state, action) {
      state.orderBySort = action.payload;
    },

    setFiltered(state, action) {
      state.isFiltered = action.payload;
    },

    appointmentsFilter(state) {
      if (state.startDate && !state.endDate && !state.sortField) {
        state.appointmentsState = filter(
          state.initialState,
          (o) => o.date >= state.startDate
        );
      } else if (state.startDate && !state.endDate && state.sortField) {
        state.appointmentsState = filter(
          orderBy(state.initialState, state.sortField, state.orderBySort),
          (o) => o.date >= state.startDate
        );
      } else if (state.endDate && !state.startDate && !state.sortField) {
        state.appointmentsState = filter(
          state.initialState,
          (o) => o.date <= state.endDate
        );
      } else if (state.endDate && !state.startDate && state.sortField) {
        state.appointmentsState = filter(
          orderBy(state.initialState, state.sortField, state.orderBySort),
          (o) => o.date <= state.endDate
        );
      } else if (state.startDate && state.endDate && !state.sortField) {
        state.appointmentsState = filter(state.initialState, (o) =>
          inRange(
            +o.date.split("-").join(""),
            +state.startDate.split("-").join(""),
            +state.endDate.split("-").join("") + 1
          )
        );
      } else if (state.startDate && state.endDate && state.sortField) {
        state.appointmentsState = filter(
          orderBy(state.initialState, state.sortField, state.orderBySort),
          (o) =>
            inRange(
              +o.date.split("-").join(""),
              +state.startDate.split("-").join(""),
              +state.endDate.split("-").join("") + 1
            )
        );
      }
    },

    setStartDate(state, action) {
      state.startDate = action.payload;
    },

    setEndDate(state, action) {
      state.endDate = action.payload;
    },
  },

  extraReducers: {
    [getAppointments.fulfilled]: (state, action) => {
      state.appointmentsState = action.payload;
      state.initialState = action.payload;
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

export const {
  appointmentsSort,
  appointmentsFilter,
  setFiltered,
  setSortField,
  setOrderBySort,
  setStartDate,
  setEndDate,
} = appointmentSlice.actions;

export const appointmentsState = (state) =>
  state.appointments.appointmentsState;

export const isFiltered = (state) => state.appointments.isFiltered;

export const sortField = (state) => state.appointments.sortField;

export default appointmentSlice.reducer;
