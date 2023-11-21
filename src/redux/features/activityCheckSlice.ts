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

export const fetchCheckActivitiesByName = createAsyncThunk<ActData[],Array<string>>(
  'activity/fetchCheckActivitiesByName',
  async ([ email, school ] , thunkAPI) => {
    //const token = await auth.currentUser?.getIdToken()
    //const uid = auth.currentUser?.uid
      const respones: any = await axios.get(`https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/${school}/${email}/rec?flag=SEND`)
      if (respones.status === 200) {
          return respones.data;
      } else {
          return thunkAPI.rejectWithValue(respones.statusText);
      }
  }
);

export const CheckActSlice = createSlice({
  name: "checkAct",
  initialState,
  reducers: {
    addActData: (state, action: PayloadAction<ActData>) => {
      state.data.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCheckActivitiesByName.fulfilled, (state, { payload }) => {
      state.loading = false
      state.data = payload
    })
    builder.addCase(fetchCheckActivitiesByName.rejected, (state) => {
      state.loading = false
      console.log('error')
      state = initialState
    })
    builder.addCase(fetchCheckActivitiesByName.pending, (state) => {
      state.loading = true
    })
  }
});

export const {
  addActData
} = CheckActSlice.actions;

export default CheckActSlice.reducer;
