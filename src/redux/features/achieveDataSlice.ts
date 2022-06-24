import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AchieveState {
  points : Points
  loading : boolean
}

interface Points {
    [key: string]: number
}

const initialState = {
    points : {
        "01": 0,
        "02": 0,
        "03": 0,
        "04": 0,
        "05": 0,
        "06": 0,
        "07": 0,
        "08": 0,
        "09": 0,
        "10": 0,
        "11": 0,
        "12": 0,
        "13": 0,
    },
    loading: false
} as AchieveState;

export const fetchAchieveByID = createAsyncThunk<Points, string>(
  "activity/fetchAchieveByID",
  async (stdID, thunkAPI) => {
    const respones: any = await axios.post(
      "http://www.zp11489.tld.122.155.167.85.no-domain.name/www/achieve.php",
      JSON.stringify({ std_id: stdID })
    );
    if (respones.status === 200) {
        console.log(respones)
      return respones.data;
    } else {
      return thunkAPI.rejectWithValue(respones.statusText);
    }
  }
);

export const AchieveDataSlice = createSlice({
  name: "achieveData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAchieveByID.fulfilled, (state, { payload }) => {
        state.loading = false
        state.points = payload
    });
    builder.addCase(fetchAchieveByID.rejected, (state) => {
        state.loading = false
        console.log("error");
        state = initialState;
    });
    builder.addCase(fetchAchieveByID.pending, (state) => {
        state.loading = true
    })
  },
});

export default AchieveDataSlice.reducer;
