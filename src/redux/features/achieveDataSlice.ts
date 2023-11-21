import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../../Firebase/firebase";

interface AchieveState {
  points : Points
  loading : boolean
}

interface Points {
    [key: string]: number[]
}

const initialState = {
    points : {
        "01": [],
        "02": [],
        "03": [],
        "04": [],
        "05": [],
        "06": [],
        "07": [],
        "08": [],
        "09": [],
        "10": [],
        "11": [],
        "12": [],
        "13": [],
    },
    loading: false
} as AchieveState;

export const fetchAchieveByID = createAsyncThunk<Points, string>(
  "activity/fetchAchieveByID",
  async (email, thunkAPI) => {
    //const token = await auth.currentUser?.getIdToken()
    //const uid = auth.currentUser?.uid
    const respones: any = await axios.get(
      'https://2r5zg4uzoh.execute-api.ap-northeast-2.amazonaws.com/Dev/data/'+email)
    if (respones.status === 200) {
      let data = {
        '01' : respones.data[0]['stat_01'],
        '02' : respones.data[0]['stat_02'],
        '03' : respones.data[0]['stat_03'],
        '04' : respones.data[0]['stat_04'],
        '05' : respones.data[0]['stat_05'],
        '06' : respones.data[0]['stat_06'],
        '07' : respones.data[0]['stat_07'],
        '08' : respones.data[0]['stat_08'],
        '09' : respones.data[0]['stat_09'],
        '10' : respones.data[0]['stat_10'],
        '11' : respones.data[0]['stat_11'],
        '12' : respones.data[0]['stat_12'],
        '13' : respones.data[0]['stat_13'],
      }
      return data;
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
