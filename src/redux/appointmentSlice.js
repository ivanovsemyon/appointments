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
    appointmentsSortAction(state) {
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

    setSortFieldAction(state, action) {
      state.sortField = action.payload;
    },

    setOrderBySortAction(state, action) {
      state.orderBySort = action.payload;
    },

    setFilteredAction(state, action) {
      state.isFiltered = action.payload;
    },

    appointmentsFilterAction(state) {
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

    setStartDateAction(state, action) {
      state.startDate = action.payload;
    },

    setEndDateAction(state, action) {
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
  appointmentsSortAction,
  appointmentsFilterAction,
  setFilteredAction,
  setSortFieldAction,
  setOrderBySortAction,
  setStartDateAction,
  setEndDateAction,
} = appointmentSlice.actions;

export const appointmentsStateSlice = (state) =>
  state.appointments.appointmentsState;

export const isFilteredSlice = (state) => state.appointments.isFiltered;

export const sortFieldSlice = (state) => state.appointments.sortField;

export default appointmentSlice.reducer;
