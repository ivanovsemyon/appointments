import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { filter, inRange, merge, orderBy, remove, uniqBy, find } from "lodash";

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

const filterList = (state) => {
  if (state.startDate && !state.endDate) {
    state.appointmentsState = filter(
      state.sortField
        ? orderBy(state.initialState, state.sortField, state.orderBySort)
        : state.initialState,
      (o) => o.date >= state.startDate
    );
  } else if (state.endDate && !state.startDate) {
    state.appointmentsState = filter(
      state.sortField
        ? orderBy(state.initialState, state.sortField, state.orderBySort)
        : state.initialState,
      (o) => o.date <= state.endDate
    );
  } else if (state.startDate && state.endDate) {
    state.appointmentsState = filter(
      state.sortField
        ? orderBy(state.initialState, state.sortField, state.orderBySort)
        : state.initialState,
      (o) =>
        inRange(
          +o.date.split("-").join(""),
          +state.startDate.split("-").join(""),
          +state.endDate.split("-").join("") + 1
        )
    );
  }
};
//TODO: reselect
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
    doctors: [
      "Иванов Иван Иванович",
      "Петров Петр Петрович",
      "Сидров Сидр Сидорович",
      "Семенов Семен Семенович",
    ],
    listOfFieldsSort: [
      { name: "name", value: "Имя" },
      { name: "doctor", value: "Врач" },
      { name: "date", value: "Дата" },

      { name: "", value: "Сбросить" },
    ],
    orderListSort: [
      { order: "asc", value: "По возрастанию" },
      { order: "desc", value: "По убыванию" },
    ],
  },

  reducers: {
    setSortFieldAction(state, action) {
      state.sortField = action.payload;
    },

    setOrderBySortAction(state, action) {
      state.orderBySort = action.payload;
    },

    setFilteredAction(state, action) {
      state.isFiltered = action.payload;
    },

    setStartDateAction(state, action) {
      state.startDate = action.payload;
    },

    setEndDateAction(state, action) {
      state.endDate = action.payload;
    },

    appointmentsSortAction(state) {
      if (state.sortField) {
        state.appointmentsState = orderBy(
          state.isFiltered ? state.appointmentsState : state.initialState,
          state.sortField,
          state.orderBySort
        );
      } else if (!state.sortField && !state.isFiltered) {
        state.appointmentsState = state.initialState;
        state.orderBySort = "asc";
      }
    },

    appointmentsFilterAction(state) {
      filterList(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appointmentsState = action.payload;
        state.initialState = action.payload;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.initialState = uniqBy(
          state.initialState.concat(action.payload),
          "_id"
        );
        state.appointmentsState = uniqBy(
          state.appointmentsState.concat(action.payload),
          "_id"
        );
        if (state.sortField && !state.isFiltered) {
          state.appointmentsState = orderBy(
            state.appointmentsState,
            state.sortField,
            state.orderBySort
          );
        } else if (state.isFiltered) {
          filterList(state);
        }
      })
      .addCase(removeAppointment.fulfilled, (state, action) => {
        remove(state.initialState, { _id: action.meta.arg });
        remove(state.appointmentsState, { _id: action.meta.arg });
      })
      .addCase(changeAppointment.fulfilled, (state, action) => {
        merge(
          find(state.initialState, { _id: action.meta.arg.id }),
          action.payload[0]
        );
        merge(
          find(state.appointmentsState, { _id: action.meta.arg.id }),
          action.payload[0]
        );
        if (state.startDate !== "" || state.endDate !== "") {
          if (
            !inRange(
              +action.payload[0].date.split("-").join(""),
              +state.startDate.split("-").join(""),
              (+state.endDate.split("-").join("") || Infinity) + 1
            )
          ) {
            remove(state.appointmentsState, { _id: action.meta.arg.id });
          }
        }
        if (state.sortField) {
          state.appointmentsState = orderBy(
            state.appointmentsState,
            state.sortField,
            state.orderBySort
          );
        }
      });
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
export const startDateSlice = (state) => state.appointments.startDate;
export const endDateSlice = (state) => state.appointments.endDate;

export const doctorsStateSlice = (state) => state.appointments.doctors;

export const listOfFieldsSortSlice = (state) =>
  state.appointments.listOfFieldsSort;

export const orderListSortSlice = (state) => state.appointments.orderListSort;

export const appointmentsStateSelector = createSelector(
  appointmentsStateSlice,
  (state) => state
);

export default appointmentSlice.reducer;
