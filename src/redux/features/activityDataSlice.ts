import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ActData } from "../type";
import axios from "axios";
import { auth } from "../../Firebase/firebase";

interface ActivitiesState {
  data: ActData[]
  loading: boolean
}

const initialState = {
  data: [],
  loading: false
} as ActivitiesState

export const fetchActivitiesByID = createAsyncThunk<ActData[],Array<string|null|undefined>>(
  'activity/fetchActivitiesByID',
  async ([school, email] , thunkAPI) => {
    //const token = await auth.currentUser?.getIdToken()
    //const uid = auth.currentUser?.uid
      const respones: any = await axios.get('https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/'+school+"/"+email+"/rec")
      if (respones.status === 200) {
          return respones.data;
      } else {
          return thunkAPI.rejectWithValue(respones.statusText);
      }
  }
);

export const fetchActivitiesByIDAT = createAsyncThunk<ActData[],Array<string>>(
  'activity/fetchActivitiesByIDAT',
  async ([ act_type, school, email] , thunkAPI) => {
    //const token = await auth.currentUser?.getIdToken()
    //const uid = auth.currentUser?.uid
      const respones: any = await axios.get('https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/'+school+"/"+email+"/rec?act_type="+act_type)
      if (respones.status === 200) {
          return respones.data;
      } else {
          return thunkAPI.rejectWithValue(respones.statusText);
      }
  }
);

export const ActDataSlice = createSlice({
  name: "actData",
  initialState,
  reducers: {
    addActData: (state, action: PayloadAction<ActData>) => {
      state.data.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivitiesByID.fulfilled, (state, { payload }) => {
      state.loading = false
      state.data = payload
    })
    builder.addCase(fetchActivitiesByID.rejected, (state) => {
      state.loading = false
      console.log('error')
      state = initialState
    })
    builder.addCase(fetchActivitiesByID.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchActivitiesByIDAT.fulfilled, (state, { payload }) => {
      state.loading = false
      state.data = payload
    })
    builder.addCase(fetchActivitiesByIDAT.rejected, (state) => {
      state.loading = false
      console.log('error')
      state = initialState
    })
    builder.addCase(fetchActivitiesByIDAT.pending, (state) => {
      state.loading = true
    })
  }
});

export const {
  addActData
} = ActDataSlice.actions;

export default ActDataSlice.reducer;
