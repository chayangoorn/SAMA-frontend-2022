import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ActData } from "../type";
import axios from "axios";

interface ActivitiesState {
  data: ActData[]
  loading: boolean
}

const initialState = {
  data: [],
  loading: false
} as ActivitiesState

export const fetchActivitiesByID = createAsyncThunk<ActData[],Array<string>>(
  'activity/fetchActivitiesByID',
  async ([ stdID, act_type] , thunkAPI) => {
      const respones: any = await axios.post('http://pcshsptsama.com/www/get-activities.php', JSON.stringify({std_ID: stdID, act_type: act_type}))
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
  }
});

export const {
  addActData
} = ActDataSlice.actions;

export default ActDataSlice.reducer;
